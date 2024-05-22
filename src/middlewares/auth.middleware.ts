import { type Request, type Response, type NextFunction } from "express";
import { isAuthTokenValid } from "../services/user.services.js";
import { invalidAuthToken } from "../config/errors.js";
import { propareBearerToken } from "../services/utils.service.js";

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {

	if (!req.headers.authorization) {
		res.json({
			error: "Need auth token"
		});
		return;
	}

	const token = propareBearerToken(req.headers.authorization);
	
	try {
		const authToken = await isAuthTokenValid(token);
		if (authToken) {
			res.locals.authToken = authToken;
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
