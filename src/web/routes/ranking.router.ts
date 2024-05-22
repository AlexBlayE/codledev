import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import rankingController from "../controllers/ranking.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const ranking = Router();

ranking
	.get("/ranking",
		limiter(2, 30),
		// authMiddleware,
		rankingController
	);

export default ranking;
