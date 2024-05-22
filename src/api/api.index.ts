import { Router, json } from "express";
import login from "./routes/login.router.js";
import signup from "./routes/signup.router.js";
import problem from "./routes/problem.router.js";
import user from "./routes/user.router.js";

const api = Router();

api.use(json());

api.use("/api", login);
api.use("/api", signup);
api.use("/api", problem);
api.use("/api", user);

// TODO: fer aqui el middleware de error de api

export default api;
