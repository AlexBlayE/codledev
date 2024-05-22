import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import signupUserController from "../controllers/signup.controller.js";
import { userSignupSchema } from "../../schemas/JsonValidatorsSchema.js";
import noScript from "../../middlewares/noscript.middleware.js";

const signup = Router();

signup
	.post("/signup",
		limiter(1, 5),
		bodyValidator(userSignupSchema),
		noScript,
		signupUserController
	)
	.post("/singup/oauth",

	);

export default signup;
