import { Router } from "express";
import index from "./routes/home.router.js";
import problems from "./routes/problems.router.js";
import ranking from "./routes/ranking.router.js";
import contact from "./routes/contact.router.js";
import profile from "./routes/profile.router.js";
import admin from "./routes/admin.router.js";
import errorMiddleware from "../middlewares/error.middleware.js";
import pageNotFoundMiddleware from "../middlewares/pagenotfound.middleware.js";

const web = Router();

web.use(problems);
web.use(ranking);
web.use(contact);
web.use(profile);
web.use(admin);
web.use(index);

web.use(pageNotFoundMiddleware);
web.use(errorMiddleware);

export default web;
