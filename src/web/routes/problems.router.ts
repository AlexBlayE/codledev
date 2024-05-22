import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import { dailyProblemsController } from "../controllers/problems.controller.js";

const problems = Router();

problems
	.get("/problems",
		limiter(2, 30),
		// authMiddleware,
		dailyProblemsController
	);


export default problems;
