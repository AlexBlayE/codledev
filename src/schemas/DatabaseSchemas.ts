import { Schema } from "mongoose";

export const userSchema = new Schema({
	is_admin: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	auth_token: {
		type: String,
		required: true,
	},
	problems_solved: [
		{
			problem_id: {
				type: Schema.Types.ObjectId,
				ref: "Problems"
			},
			languages: [ String ]

		}
	],
	problems_text: [
		{
			problem_id: {
				type: Schema.Types.ObjectId,
				ref: "Problems"
			},
			text: [ {
				language: String,
				text: String				
			} ]
		}
	]
});

export const problemSchema = new Schema({
	title_es: String,
	title_ca: String,
	title_en: String,
	description_es: String,
	description_ca: String,
	description_en: String,
	category_es: String,
	category_ca: String,
	category_en: String,
	input_en: String,
	input_es: String,
	input_ca: String,
	difficulty: String,
	output_en: String,
	output_es: String,
	output_ca: String,
	example1: String,
	example2: String,
	langs_available: [ String ],
	solution_out: String,
	solution_in: String,
	date: {
		type: String,
		required: true,
		unique: true
	}
});

