import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import indexController, { problemByDateController } from "../controllers/index.controller.js";

const index = Router();

index
	.get("/",
		limiter(2, 30),
		indexController	
	)
	.get("/:date",
		limiter(2, 30),
		problemByDateController
	);

export default index;
