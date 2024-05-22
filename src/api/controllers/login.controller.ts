import { type Response, type Request, type NextFunction } from "express";
import { getUserIfPasswordHash, saveUserToken } from "../../services/user.services.js";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../../config/secrets.js";
import { randomUUID } from "crypto";

export async function loginController(req: Request, res: Response, _next: NextFunction) {
	const username = req.body.name;
	const password = req.body.password;

	try {
		const user = await getUserIfPasswordHash(username, password);

		if (!user) {
			res.json({
				"message": "Username or Password are wrong"
			});
			return;
		}

		const userInfo = user.toJSON();

		const authToken = randomUUID();
		const authJWT = jwt.sign({ authToken }, getJwtSecret(), {
			expiresIn: "7d"
		});

		await saveUserToken(userInfo._id.toString(), authToken);

		res.cookie("auth", authJWT, { path: "/",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.sendStatus(200);
	} catch (error) {
		res.sendStatus(403);
	}

}
