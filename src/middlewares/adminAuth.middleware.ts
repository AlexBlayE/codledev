import { type Request, type Response, type NextFunction } from "express";
import { isAdmin } from "../services/user.services.js";
import { invalidAuthToken } from "../config/errors.js";
import { propareBearerToken } from "../services/utils.service.js";

export default async function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
	let token;

	if (req.headers.authorization) {
		token = propareBearerToken(req.headers.authorization as string);
	} else if (req.cookies.auth) {
		token = req.cookies.auth;
	} else {
		res.json({
			error: "Need auth token"
		});
		return;
	}
	
	try {
		if (await isAdmin(token)) {
			next();
			return;
		}

		res.json({
			"error": invalidAuthToken
		});
	} catch (error) {
		res.json({
			"error": invalidAuthToken,
		});
	}
}
