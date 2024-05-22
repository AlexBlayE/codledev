import express from "express";
import helmet from "helmet";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Mongo from "./models/MongoConnection.js";
import "dotenv/config";
import compression from "compression";
import cookieParser from "cookie-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT ?? 3000;

const app = express();

Mongo.getInstance();

app.use(compression());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../public")));

const corsOptions: cors.CorsOptions = {
	origin: "localhost"
};

app.disable("x-powered-by");
app.use(cors(corsOptions));
app.use(helmet());
app.use(cookieParser());

// router imports
import web from "./web/web.index.js";
import api from "./api/api.index.js";

// routes
app.use(api);
app.use(web);

// TODO: Poner lo del oauth
// TODO: Implementar logs de errors del servidor (Crear una classe) (Crear errors personalitzats)

app.listen(PORT, () => {
	console.log(`Server init http://localhost:${process.env.PORT}`);
});

export default app;
