import Language from "../../LangsInterface.js";

class EnglishIndex implements Language {
	getParams(): object {
		return {
			title_en: 1,
			description_en: 1,
			category_en: 1,
			input_en: 1,
			difficulty: 1,
			output_en: 1,
			example1: 1,
			example2: 1,
			solution_out: 1,
			langs_available: 1,
			date: 1
		};
	}

	getAbreviation(): string {
		return "en";
	}

}

export default EnglishIndex;
