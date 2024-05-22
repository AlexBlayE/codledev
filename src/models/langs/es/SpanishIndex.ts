import Language from "../../LangsInterface.js";

class SpanishIndex implements Language {
	getParams(): object {
		return {
			title_es: 1,
			description_es: 1,
			category_es: 1,
			input_es: 1,
			difficulty: 1,
			output_es: 1,
			example1: 1,
			example2: 1,
			solution_out: 1,
			langs_available: 1
		};
	}

	getAbreviation(): string {
		return "es";
	}

}

export default SpanishIndex;
