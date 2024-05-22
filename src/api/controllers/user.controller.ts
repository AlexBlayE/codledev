import { NextFunction, type Request, type Response } from "express";
import { changeEmail, changePassword, changeUsername, createUser, deleteUser, getAllUsers, getInfo, getUserCount, getUserIdByAuthToken } from "../../services/user.services.js";
import { getProblemByDate } from "../../services/problems.service.js";
import { randomUUID } from "crypto";
import sanitizeHtml from "sanitize-html";
import bcrypt from "bcrypt";

export async function saveTextProblem(req: Request, res: Response, _next: NextFunction) {// TODO:
	try {
		res.sendStatus(418);
	} catch (error) {
		res.sendStatus(401);
	}
}

export async function getUserInfo(req: Request, res: Response, _next: NextFunction) {
	try {
		if (!res.locals.authToken) {
			res.sendStatus(400);
			return;
		}

		const projection = {
			_id: 0,
			name: 1,
			problems_solved: 1,
			email: 1
		};

		const info = await getInfo(res.locals.authToken, projection);

		const infoJson = info?.toJSON();

		const favLangCount = new Map<string, number>();

		infoJson?.problems_solved.forEach((problem) => {
			problem.languages.forEach((lang) => {
				favLangCount.set(lang, favLangCount.get(lang) ? favLangCount.get(lang)! + 1 : 1);
			});
			delete problem._id;
			delete problem.id;
		});

		let favouriteLanguage = "js";
		let maxCount = 0;
		favLangCount.forEach((count, lang) => {
			if (count > maxCount) {
				maxCount = count;
				favouriteLanguage = lang;
			}
		});

		const problemsCount = infoJson?.problems_solved.length;

		res.json({
			info: infoJson,
			problemsCount,
			favouriteLanguage
		});
	} catch (error) {
		res.sendStatus(400);
	}
}

export async function getRanking(req: Request, res: Response) {
	try {
		const skip = req.body.page * 10;

		const projection = {
			_id: 0,
			password: 0,
			email: 0,
			auth_token: 0,
			__v: 0,
			problems_text: 0
		};
		let filter = {};
		if (req.body.name) {
			filter = {
				name: req.body.name
			};
		}

		const allUsers = await getAllUsers(0, 0, filter, projection);// TODO: pedirle a la bbdd que me devuelva 

		allUsers.sort((a, b) =>
			b.problems_solved.length - a.problems_solved.length // TODO: arreclar aixó
		);

		const users = allUsers.slice(skip, skip + 10);

		res.json({ users });

		// const result = allUsers.map((val) => {
		// 	val.problems_solved = val.problems_solved.length;// TODO: fer bé
		// });

	} catch (error) {
		res.sendStatus(401);
	}
}

export async function getProblemInfoByUserController(req: Request, res: Response) {
	const date = req.params.date;

	if (!date) {
		res.status(400).json({
			"error": "need a date"
		});
		return;
	}

	const dateProblem = await getProblemByDate(date, { _id: 1 });

	if (!dateProblem) {
		res.status(402).json({
			"error": "unexisting date"
		});
		return;
	}

	const dateProblemId = dateProblem!.id;
	const userProblems = await getInfo(res.locals.authToken, { problems_solved: 1 });

	for (const userProblem of userProblems!.problems_solved) {
		if (userProblem.problem_id == dateProblemId) {
			res.json({
				"languages": userProblem.languages
			});
			return;
		}
	}

	res.sendStatus(400);
}

export async function getUsersController(req: Request, res: Response) {
	const page = req.body.page;

	const users = await getAllUsers(page * 10, 10, {}, {
		password: 0,
		auth_token: 0,
		problems_solved: 0,
		problems_text: 0,
		__v: 0
	});

	res.json({ users });
}

export async function getUserCountController(req: Request, res: Response, _next: NextFunction) {
	try {
		const count = await getUserCount();
		res.json({ count });
	} catch (error) {
		res.sendStatus(403);
	}
}

export async function createUsersByAdmin(req: Request, res: Response) {
	try {
		const name = req.body.name;
		const pass = req.body.password;
		const email = req.body.email;
		const isAdmin = req.body.isAdmin;

		const cleanedName = sanitizeHtml(name);
		const cleanedEmail = sanitizeHtml(email);
		const cleanedPass = sanitizeHtml(pass);
		const dbPassword = await bcrypt.hash(cleanedPass, 10);

		const authToken = randomUUID();

		await createUser(
			cleanedName,
			cleanedEmail,
			dbPassword,
			authToken,
			isAdmin
		);

		res.sendStatus(201);
	} catch (error) {
		res.sendStatus(400);
	}
}

export async function deleteUserController(req: Request, res: Response) {
	try {
		const userId = req.body.userId as string;
		await deleteUser(userId);
		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(400);
	}
}

export async function changeUserInfoController(req: Request, res: Response) {
	try {
		const authToken = res.locals.authToken as string;
		const userId = await getUserIdByAuthToken(authToken);

		const name = req.body.name;
		const email = req.body.email;
		const oldPass = req.body.oldPassword;
		const newPass = req.body.newPassword;

		if (name) {
			await changeUsername(userId, name);
			res.sendStatus(200);
			return;
		}

		if (email) {
			await changeEmail(userId, email);
			res.sendStatus(200);
			return;
		}

		if (oldPass && newPass) {
			await changePassword(userId, newPass, oldPass);
			res.sendStatus(200);
			return;
		}

		res.sendStatus(400);
	} catch (error) {
		res.sendStatus(400);
	}
}
