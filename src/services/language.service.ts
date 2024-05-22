import Language from "../models/LangsInterface.js";
import CatalanIndex from "../models/langs/cat/CatalanIndex.js";
import EnglishIndex from "../models/langs/en/EnglishIndex.js";
import SpanishIndex from "../models/langs/es/SpanishIndex.js";
import { getDailyProblem, getProblemById } from "./problems.service.js";

export const getIndexTranslation = async (lang: Language) => {
	const res = await getDailyProblem(lang.getParams());
	return res?.toJSON();
};

export const getIndexTranslationById = async (id: string, lang: Language) => {
	const res = await getProblemById(id, lang.getParams());
	return res?.toJSON();
};

export const getLangByQueryParam = (queryParam: string | undefined): Language => {
	switch (queryParam) {
	case "es":
		return new SpanishIndex;
	case "en":
		return new EnglishIndex;
	case "ca":
		return new CatalanIndex;
	default:
		return new SpanishIndex;
	}
};
