import { type Request, type Response } from "express";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../../config/secrets.js";
import sanitizeHtml from "sanitize-html";
import { createUser } from "../../services/user.services.js";

// const sanitizeOptions: sanitizeHtml.IOptions = {
// 	textFilter: function(text) { return text; }
// };

async function signupUserController(req: Request, res: Response) {
	try {
		const name = req.body.name;
		const pass = req.body.password;
		const email = req.body.email;

		const cleanedName = sanitizeHtml(name);
		const cleanedEmail = sanitizeHtml(email);
		const cleanedPass = sanitizeHtml(pass);
		const dbPassword = await bcrypt.hash(cleanedPass, 10);

		const authToken = randomUUID();

		const authJWT = jwt.sign({ authToken }, getJwtSecret(), {
			expiresIn: "7d"
		});

		await createUser(
			cleanedName,
			cleanedEmail,
			dbPassword,
			authToken
		);

		res.cookie("auth", authJWT, {
			path: "/",
			maxAge: 7 * 24 * 60 * 60 * 1000,
		});

		res.sendStatus(201);
		
	} catch (error) {
		res.json({
			"error": "not is possible to register the user"
		}).status(400);
	}
}

export default signupUserController;

