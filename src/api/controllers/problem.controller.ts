import { NextFunction, type Request, type Response } from "express";
import { correctProblem, createNewProblem, getDailyProblem, getProblemByDate, getProblemCount, getProblemList } from "../../services/problems.service.js";
import { addResovedProblemToUser, getUserIdByAuthToken, isAuthTokenValid } from "../../services/user.services.js";
import { propareBearerToken } from "../../services/utils.service.js";

const correctProblemsParamsInSubmit = {
	_id: 1
};

export async function submitProblemController(req: Request, res: Response, _next: NextFunction) {
	const userScript = req.body.userScript;
	const lang = req.body.lang;

	const date = req.body.date ? req.body.date : "";

	const toCorrectProblem = await date ?
		(await getProblemByDate(date, correctProblemsParamsInSubmit))?.id
		: (await getDailyProblem(correctProblemsParamsInSubmit))?.id;
		
	try {
		let problemResponse = null;
		const authToken = propareBearerToken(req.headers.authorization as string);
		const auth = await isAuthTokenValid(authToken);

		if (auth) {
			problemResponse = await correctProblem(userScript, lang, date);
			if (problemResponse) {
				addResovedProblemToUser(
					await getUserIdByAuthToken(auth),
					await toCorrectProblem,
					lang
				);
			}
		} else {
			problemResponse = await correctProblem(userScript, lang, date);
		}

		res.json({
			"solved": problemResponse
		});

	} catch (error) {
		res.json({
			"solved": false,
		});
	}
}

export async function getProblemsListController(req: Request, res: Response, _next: NextFunction) {
	const page = req.body.page;
	const lang = req.body.language;

	const skip = 10 * page;
	const limit = 10;

	try {
		const searchParams: {
			$and?: object[],
			difficulty?: string | object,
			langs_available?: object,
		} = {};

		if (req.body.name) {
			searchParams.$and = [];
			const title = {
				$or: [
					{ title_ca: { $regex: new RegExp(req.body.name, "i") } },
					{ title_es: { $regex: new RegExp(req.body.name, "i") } },
					{ title_en: { $regex: new RegExp(req.body.name, "i") } },
				]
			};
			searchParams.$and.push(title);
		}
		if (req.body.category) {
			if (!searchParams.$and) searchParams.$and = [];
			const category = {
				$or: [
					{ category_ca: { $regex: new RegExp(req.body.category, "i") } },
					{ category_es: { $regex: new RegExp(req.body.category, "i") } },
					{ category_en: { $regex: new RegExp(req.body.category, "i") } },
				]
			};
			searchParams.$and.push(category);
		}
		if (req.body.difficulty) searchParams.difficulty = { $regex: new RegExp(req.body.difficulty, "i") };
		if (req.body.availableLanguages) searchParams.langs_available = { "$in": req.body.availableLanguages };

		const problems = await getProblemList(searchParams, skip, limit, lang);
		res.json({ problems });
	} catch (error) {
		res.sendStatus(403);
	}
}

export async function getProblemCountController(req: Request, res: Response, _next: NextFunction) {
	try {
		const count = await getProblemCount();
		res.json({ count });
	} catch (error) {
		res.sendStatus(403);
	}
}

export async function createProblemController(req: Request, res: Response) {
	try {
		await createNewProblem(req.body);
		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(400);
	}
}
