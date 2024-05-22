import { NextFunction, type Request, type Response } from "express";
import { isUserLogged } from "../../services/user.services.js";
import { getLangByQueryParam } from "../../services/language.service.js";

async function adminUsersController(req: Request, res: Response, next: NextFunction) {
	try {
		const isLogged = await isUserLogged(req.cookies.auth);
		const lang = getLangByQueryParam(req.query.lang as string);
		res.render("adminUsers", { isLogged, abreviation: lang.getAbreviation() });
	} catch (error) {
		next(error);
	}
}

export default adminUsersController;
