class Solver {
	private static solverUrl = process.env.SOLVER_URL as string;

	public static async testCode(userScript: string, expectedOut: string, lang: string): Promise<boolean> {
		const res = await fetch(`${this.solverUrl}problem`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user_code: userScript,
				expected_out: expectedOut,
				lang: lang
			})
		});
		const json = await res.json();

		return json.res;
	}

}

export default Solver;

/*
				function main(arg) {
					return [...arg].reduce((acc, current) => {
						if (current === "*") return acc + 1;
						else return acc;
					}, 0);
				}


				int exercice() {
					return 10;
				}
	*/
