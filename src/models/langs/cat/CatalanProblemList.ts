import Language from "../../LangsInterface.js";

class CatalanProblemList implements Language {
	getParams(): object {
		return {
			_id: 0,
			title_ca: 1,
			category_ca: 1,
			difficulty: 1,
			langs_available: 1
		};
	}

	getAbreviation(): string {
		return "es";
	}

}

export default CatalanProblemList;
