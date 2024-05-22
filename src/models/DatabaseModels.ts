import Mongo from "./MongoConnection.js";
import { userSchema, problemSchema } from "../schemas/DatabaseSchemas.js";

const connection = Mongo.getInstance().getConnection();

export const User = connection.model("Users", userSchema);
export const Problem = connection.model("Problems", problemSchema);
