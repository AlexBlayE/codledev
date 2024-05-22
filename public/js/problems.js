import { getCookie } from "./utils.js";




document.addEventListener("DOMContentLoaded", getProblems);

document.getElementById("search-btn").addEventListener("click", getProblems);


async function getProblems() {
	const nameElement = document.getElementById("problem-name").value;
	const categoryElement = document.getElementById("problem-category").value;
	const difficultyElement = document.getElementById("problem-difficulty").value;
	let name = "";
	let category = "";
	let difficulty = "";

	if (nameElement !== "none" && nameElement !== "any") {
		name = nameElement;
	}
	if (difficultyElement !== "none" && difficultyElement !== "any") {
		difficulty = difficultyElement;
	}
	if (categoryElement !== "none" && categoryElement !== "any") {
		category = categoryElement;
	}
	const search = {
		name: name,
		difficulty: difficulty,
		category: category,
		page: 0
	};
	const listItems = document.getElementById("list-items");
	try {
		const res = await fetch("/api/problems", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify(search)
		});

		const data = await res.json();
		if (res.ok) {
			if (data.problems.length < 1) {
				switch (getCookie("lang")) {
				case "ca":
					listItems.innerHTML = "<tr><td colspan='4'>No s'han trobat problemes</td></tr>";
					break;
				case "en":
					listItems.innerHTML = "<tr><td colspan='4'>No problems found</td></tr>";
					break;
				default:
					listItems.innerHTML = "<tr><td colspan='4'>No se encontraron problemas</td></tr>";
					break;
				}
			} else {
				listItems.innerHTML = "";
				data.problems.forEach(problem => {
					let title;
					let category;
					if (problem.title_es) title = problem.title_es;
					if (problem.title_en) title = problem.title_ca;
					if (problem.title_ca) title = problem.title_en;
					if (problem.category_es) category = problem.category_es;
					if (problem.category_en) category = problem.category_ca;
					if (problem.category_ca) category = problem.category_en;


					const tr = document.createElement("tr");
					const td1 = document.createElement("td");
					const td2 = document.createElement("td");
					const td3 = document.createElement("td");
					const td4 = document.createElement("td");

					td1.textContent = title;
					td2.textContent = problem.difficulty;
					td3.textContent = category;
					td4.textContent = problem.langs_available.join(", ");

					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					tr.appendChild(td4);

					tr.onclick = () => {
						window.location.href = `/${problem.date}`;
					};

					listItems.appendChild(tr);
				});
			}
		} else {
			console.error(data.message);
		}
	} catch (error) {
		console.error(error);
	}
}
