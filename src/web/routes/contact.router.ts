import { Router } from "express";
import limiter from "../../middlewares/rate.middleware.js";
import contactController from "../controllers/contact.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const contact = Router();

contact
	.get("/contact",
		limiter(2, 30),
		// authMiddleware,
		contactController
	);

export default contact;
