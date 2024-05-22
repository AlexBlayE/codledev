import { Router } from "express";
import bodyValidator from "../../middlewares/validator.middleware.js";
import { problemListSchema, problemSubmittedSchema } from "../../schemas/JsonValidatorsSchema.js";
import { getProblemCountController, getProblemsListController, submitProblemController } from "../controllers/problem.controller.js";
import limiter from "../../middlewares/rate.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const problem = Router();

problem
	.post("/problems",// listar problemas dodos unos filtros
		limiter(1, 60),
		authMiddleware,	
		bodyValidator(problemListSchema),
		getProblemsListController
	)
	.post("/problem/test",// resolver problemas
		limiter(1, 20),
		bodyValidator(problemSubmittedSchema),
		submitProblemController
	)
	.post("/problem"//TODO: añadir o gestionar problemas

	)
	.get("/problem/count",
		limiter(1, 20),
		getProblemCountController
	);

export default problem;
