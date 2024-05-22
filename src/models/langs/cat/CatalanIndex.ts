import Language from "../../LangsInterface.js";

class CatalanIndex implements Language {
	getParams(): object {
		return {
			title_ca: 1,
			description_ca: 1,
			category_ca: 1,
			input_ca: 1,
			difficulty: 1,
			output_ca: 1,
			example1: 1,
			example2: 1,
			solution_out: 1,
			langs_available: 1,
			date: 1
		};
	}

	getAbreviation(): string {
		return "ca";
	}
}

export default CatalanIndex;
