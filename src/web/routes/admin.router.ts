import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import adminIndexController from "../controllers/adminIndex.controller.js";
import adminUsersController from "../controllers/adminUsers.controller.js";
import adminProblemsController from "../controllers/adminProblems.controller.js";
import adminAuthMiddleware from "../../middlewares/adminAuth.middleware.js";

const admin = Router();

admin
	.get("/admin",
		limiter(2, 30),
		adminAuthMiddleware,
		adminIndexController
	)
	.get("/admin/users",
		limiter(2, 30),
		adminAuthMiddleware,
		adminUsersController
	)
	.get("/admin/problems",
		limiter(2, 30),
		adminAuthMiddleware,
		adminProblemsController
	);

export default admin;
