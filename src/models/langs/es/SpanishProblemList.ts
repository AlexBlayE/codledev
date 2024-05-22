import Language from "../../LangsInterface.js";

class SpanishProblemList implements Language {
	getParams(): object {
		return {
			_id: 0,
			title_es: 1,
			category_es: 1,
			difficulty: 1,
			langs_available: 1,
			date: 1
		};
	}

	getAbreviation(): string {
		return "es";
	}

}

export default SpanishProblemList;
