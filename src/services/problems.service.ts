import Solver from "../models/Solver.js";
import { Problem } from "../models/DatabaseModels.js";
import Mongo from "../models/MongoConnection.js";
import SpanishProblemList from "../models/langs/es/SpanishProblemList.js";
import CatalanProblemList from "../models/langs/cat/CatalanProblemList.js";
import EnglishProblemsList from "../models/langs/en/EnglishProblemList.js";
import { getCurrentDateFormatted } from "./utils.service.js";

const correctionProblemParams = {
	solution_out: 1,
	solution_in: 1
};

export const correctProblem = async (userScript: string, lang: string, date: string) => {
	try {
		let res;
		if (date) {
			res = await getProblemByDate(date, correctionProblemParams);
			if (!res) {
				res = await getDailyProblem(correctionProblemParams);
			}
		} else {
			res = await getDailyProblem(correctionProblemParams);
		}
		const problem = res?.toObject();
		const input = problem?.solution_in as string;
		const out = problem?.solution_out as string;

		const scriptToSend = joinProblemsAndArguments(userScript, input, lang);

		return Solver.testCode(scriptToSend, out, lang);
	} catch (error) {
		return false;
	}
};

export const getDailyProblem = async (projection: object) => {
	const date = getCurrentDateFormatted();
	const dailyProblem = await Mongo.findOne(Problem, { date }, projection);
	if (dailyProblem) {
		return dailyProblem;
	} else {
		return await Mongo.findOne(Problem, { title_en: "Asteriscos" }, projection);
	}
};

export const getProblemById = async (id: string, projection: object) => {
	return Mongo.findById(Problem, id, projection);
};


const joinProblemsAndArguments = (userScript: string, args: string, lang: string): string => {
	switch (lang) {
	case "js":
		return `${userScript}\nmain(${args})`;
	case "c":
		return `#include <stdio.h>\n${userScript}\nint main() {printf("%d",solution(${args}));}`;
	case "c++":
		return `#include <stdio.h>\n${userScript}\nint main() {printf("%d",solution(${args}));}`;
	default:
		throw new Error("Need a valid language");
	}
};
				
export const getProblemList = async (searchParams: object, skip: number, limit: number, lang: string) => {
	let problemListProjection: object = new SpanishProblemList().getParams();
					
	switch(lang) {
	case "ca":
		problemListProjection = new CatalanProblemList().getParams();
		break;
	case "en":
		problemListProjection = new EnglishProblemsList().getParams();
		break;
	}
	
	return Mongo.find(Problem, searchParams, problemListProjection, skip, limit);
};

export const getProblemTranslation = async (date: string, projection: object) => {
	const problem = await Mongo.findOne(Problem, { date }, projection);
	return problem?.toJSON();
};

export const getProblemByDate = async (date: string, projection: object) => {
	return Mongo.findOne(Problem, { date }, projection);
};

export const getProblemCount = async () => {
	return Mongo.count(Problem, {});
};

export const createNewProblem = async (problemParams: object) => {
	await Mongo.create(Problem, problemParams);	
};
