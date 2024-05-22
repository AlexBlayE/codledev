import Language from "../../LangsInterface.js";

class EnglishProblemsList implements Language {
	getParams(): object {
		return {
			_id: 0,
			title_en: 1,
			category_en: 1,
			difficulty: 1,
			langs_available: 1
		};
	}

	getAbreviation(): string {
		return "es";
	}

}

export default EnglishProblemsList;
