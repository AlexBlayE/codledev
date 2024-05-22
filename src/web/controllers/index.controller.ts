import { NextFunction, type Request, type Response } from "express";
import { getIndexTranslation, getLangByQueryParam } from "../../services/language.service.js";
import { isUserLogged } from "../../services/user.services.js";
import { getProblemTranslation } from "../../services/problems.service.js";

async function indexController(req: Request, res: Response, next: NextFunction) {
	try {
		const lang = getLangByQueryParam(req.query.lang as string);
		const ejsParams = await getIndexTranslation(lang);
		const isLogged = await isUserLogged(req.cookies.auth);

		res.render("index", { ...ejsParams, abreviation: lang.getAbreviation(), isLogged });
	} catch (error) {
		next(error);
	}
}

export async function problemByDateController(req: Request, res: Response, next: NextFunction) {
	try {
		const date = req.params.date;
		const dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);

		if (!dateRegex.test(date)) {
			res.redirect(301, "/");
			return;
		}

		const lang = getLangByQueryParam(req.query.lang as string);
		const ejsParams = await getProblemTranslation(new Date(date).toISOString().split("T")[0], lang.getParams());
		const isLogged = await isUserLogged(req.cookies.auth);
		
		if (!ejsParams) {
			res.redirect(301, "/");
			return;
		}

		res.render("index", { ...ejsParams, abreviation: lang.getAbreviation(), isLogged });
	} catch (error) {
		next(error);
	}
}

export default indexController;
