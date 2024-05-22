import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import profileController from "../controllers/profile.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const profile = Router();

profile
	.get("/profile",
		limiter(2, 30),
		// authMiddleware,
		profileController
	);

export default profile;
