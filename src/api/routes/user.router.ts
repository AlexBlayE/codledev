import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import bodyValidator from "../../middlewares/validator.middleware.js";
import { adminCreateUserSchema, adminGetUsersSchema, changeUserInfoSchema, problemSavedTextSchema, userDeleteSchema, userRankingSchema } from "../../schemas/JsonValidatorsSchema.js";
import { getRanking, getUserInfo, saveTextProblem, getUserCountController, getProblemInfoByUserController, getUsersController, createUsersByAdmin, deleteUserController, changeUserInfoController } from "../controllers/user.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import adminAuthMiddleware from "../../middlewares/adminAuth.middleware.js";

const user = Router();

user
	.get("/user/problem/:date",// obtener informacion del problema por feha y usuario
		limiter(1, 50),
		authMiddleware,
		getProblemInfoByUserController
	)
	.patch("/user/problem",// TODO: per guardar el text del usuari
		limiter(1, 30),
		authMiddleware,
		bodyValidator(problemSavedTextSchema),
		saveTextProblem
	)
	.get("/user/info",// informacion del usuario
		limiter(1, 20),
		authMiddleware,
		getUserInfo
	)
	.post("/user/ranking",// mostrar rancking
		limiter(1, 25),
		authMiddleware,
		bodyValidator(userRankingSchema),
		getRanking
	)
	.patch("/user/change",// para cambiar informacion del usuario
		limiter(1, 25),
		authMiddleware,
		bodyValidator(changeUserInfoSchema),
		// noScript,
		changeUserInfoController
	)
	.get("/user/count",
		limiter(1, 20),
		getUserCountController
	)
	.post("/user/users",// para el panel de admin obtener usuarios
		limiter(1, 50),
		adminAuthMiddleware,
		bodyValidator(adminGetUsersSchema),
		getUsersController
	)
	.post("/user/create",
		limiter(1, 50),
		adminAuthMiddleware,
		bodyValidator(adminCreateUserSchema),
		createUsersByAdmin
	)
	.post("/user/delete",
		limiter(1, 60),
		adminAuthMiddleware,
		bodyValidator(userDeleteSchema),
		deleteUserController
	);

export default user;
