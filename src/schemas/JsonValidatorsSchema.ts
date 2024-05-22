import Joi from "joi";
import { validLanguages } from "../config/languages.js";

export const userLoginSchema = Joi.object({
	name: Joi.string().required().min(3).max(20),
	password: Joi.string().required().min(3).max(20)
});

export const userSignupSchema = Joi.object({
	name: Joi.string().required().min(3).max(30).trim(),
	email: Joi.string().required().email(),
	password: Joi.string().required().min(3).max(20),
	repeatPassword: Joi.string().required().min(3).max(20),
});

export const problemSubmittedSchema = Joi.object({
	userScript: Joi.string().required(),
	lang: Joi.string().required().valid(...validLanguages),
	date: Joi.date().optional()
});

export const problemListSchema = Joi.object({
	page: Joi.number().required(),
	name: Joi.string().optional().allow(""),
	difficulty: Joi.string().optional().allow(""),
	category: Joi.string().optional().allow(""),
	availableLanguages: Joi.array().optional(),
	language: Joi.string().optional().allow(""),
});

export const userRankingSchema = Joi.object({
	name: Joi.string().optional().allow(""),
	page: Joi.number().required()
});

export const problemSavedTextSchema = Joi.object({
	text: Joi.string().required(),
	language: Joi.string().required().allow(...validLanguages)
});

export const changeUserInfoSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string().email(),
	newPassword: Joi.string(),
	oldPassword: Joi.string()
});

export const adminGetUsersSchema = Joi.object({
	page: Joi.number().required()
});

export const adminCreateUserSchema = Joi.object({
	name: Joi.string().required().min(3).max(20),
	password: Joi.string().required().min(3).max(20),
	email: Joi.string().email().required(),
	isAdmin: Joi.boolean().optional()
});

export const adminCreateProblemController = Joi.object({
	title_es: Joi.string().required(),
	title_ca: Joi.string().required(),
	title_en: Joi.string().required(),
	description_es: Joi.string().required(),
	description_ca: Joi.string().required(),
	description_en: Joi.string().required(),
	category_es: Joi.string().required(),
	category_ca: Joi.string().required(),
	category_en: Joi.string().required(),
	input_en: Joi.string().required(),
	input_es: Joi.string().required(),
	input_ca: Joi.string().required(),
	difficulty: Joi.string().required(),
	output_en: Joi.string().required(),
	output_es: Joi.string().required(),
	output_ca: Joi.string().required(),
	example1: Joi.string().required(),
	example2: Joi.string().required(),
	langs_available: Joi.array().required().valid(...validLanguages),
	solution_out: Joi.string().required(),
	solution_in: Joi.string().required(),
	date: Joi.string().required()
});

export const userDeleteSchema = Joi.object({
	userId: Joi.string().required()
});
