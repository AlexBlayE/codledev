import { User } from "../models/DatabaseModels.js";
import Mongo from "../models/MongoConnection.js";
import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/secrets.js";
import bcrypt from "bcrypt";
import sanitizeHtml from "sanitize-html";

export const isEmailExists = async (email: string) => {
	return Mongo.exists(User, { email });
};

export const isUserExists = async (username: string) => {
	return Mongo.exists(User, { name: username });
};

export const createUser = async (
	name: string,
	email: string,
	password: string,
	auth_token: string,
	isAdmin?: boolean
) => {
	await Mongo.create(User, {
		name,
		email,
		password,
		auth_token,
		is_admin: isAdmin
	});
};

export const isAuthTokenValid = async (token: string) => {
	try {
		const authToken = jwt.verify(token, getJwtSecret()) as { authToken: string };

		const verifiedToken = authToken.authToken;

		if (!await Mongo.exists(User, { auth_token: verifiedToken })) {
			throw new Error("Doesn't exist this token");
		}

		return verifiedToken;
	} catch (error) {
		return false;
	}
};

export const addResovedProblemToUser = async (userId: string, problemId: string, lang: string) => {
	const toUpdate = await Mongo.findById(User, userId);

	if (!toUpdate) {
		throw new Error("user id not found");
	}

	const actualProblem = toUpdate?.problems_solved.find(problem => problem.problem_id?.toString() == problemId);
	if (!actualProblem) {
		toUpdate?.problems_solved.push({
			problem_id: problemId,
			languages: lang,
		});
		
		await toUpdate.save();
	}

	const languegeExists = actualProblem?.languages.includes(lang);
	if (!languegeExists) {
		actualProblem?.languages.push(lang);
		await toUpdate.save();
	}	
};

export const getUserIdByAuthToken = async (authToken: string) => {
	return (await Mongo.findOne(User, { auth_token: authToken }))?.id;
};

export const isUserLogged = async (token: string): Promise<boolean> => {
	if (await isAuthTokenValid(token)) {
		return true;
	}
	return false;
};

export const saveUserToken = async (id: string, newToken: string) => {
	Mongo.update(User, id, { auth_token: newToken });
};

export const getUserIfPasswordHash = async (user: string, pass: string) => {
	const res = await Mongo.findOne(User, {
		name: user
	});

	const data = res?.toJSON();

	if (await bcrypt.compare(pass, data?.password as string)) {
		return res;
	} else {
		return false;
	}
};

export const getInfo = async (authToken: string, projection: object) => {
	return Mongo.findOne(User, { auth_token: authToken }, projection);
};

export const  getAllUsers = async (skip: number, limit: number, filter: object, projection?: object) => {
	if (projection) {
		// const res = (await Mongo.find(User, filter, projection, skip, limit)).sort();// TODO: acabar
		return Mongo.find(User, filter, projection, skip, limit);

	} else {
		return Mongo.find(User, filter, {}, skip, limit);
	}
};

export const getUserCount = async () => {
	return Mongo.count(User, {});
};

export const isAdmin = async (token: string) => {
	try {
		const authToken = jwt.verify(token, getJwtSecret()) as { authToken: string };

		const verifiedToken = authToken.authToken;

		if (!await Mongo.exists(User, { auth_token: verifiedToken, is_admin: true })) {
			throw new Error("Doesn't exist this token");
		}

		return verifiedToken;
	} catch (error) {
		return false;
	}
};

export const deleteUser = async (userId: string) => {
	await Mongo.delete(User, { _id: userId });
};

export const changeUsername = async (userId: string, newName: string) => {
	const user = await Mongo.findById(User, userId);
	user!.name = newName;
	await user!.save();
};

export const changeEmail = async (userId: string, newEmail: string) => {
	const user = await Mongo.findById(User, userId);
	user!.email = newEmail;
	await user!.save();
};

export const changePassword = async (userId: string, newPassword: string, oldPassword: string) => {
	const user = await Mongo.findById(User, userId);
	const ok = await bcrypt.compare(oldPassword, user!.password);

	if (ok) {
		const cleanedPass = sanitizeHtml(newPassword);
		const pass = await bcrypt.hash(cleanedPass, 10);
		user!.password = pass;
		user!.save();
	}
};
