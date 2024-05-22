import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import { loginController } from "../controllers/login.controller.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import { userLoginSchema } from "../../schemas/JsonValidatorsSchema.js";

const login = Router();

login
	.post("/login",
		limiter(1, 3),
		bodyValidator(userLoginSchema),
		loginController
	)
	.post("/login/oauth",
		
	);

export default login;

