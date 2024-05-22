import { getCookie } from "./utils.js";




document.addEventListener("DOMContentLoaded", getRanking);

document.getElementById("search-btn").addEventListener("click", getRanking);


async function getRanking() {
	const usernameElement = document.getElementById("username").value;
	let username = "";

	if (username !== "none") {
		username = usernameElement;
	}

	const search = {
		name: username,
		page: 0
	};

	const listItems = document.getElementById("list-items");
	try {
		const res = await fetch("/api/user/ranking", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify(search)
		});

		const data = await res.json();
		console.log(data);
		if (res.ok) {
			if (data.users.length < 1) {
				switch (getCookie("lang")) {
				case "ca":
					listItems.innerHTML = "<tr><td colspan='3'>No s'han trobat usuaris</td></tr>";
					break;
				case "en":
					listItems.innerHTML = "<tr><td colspan='3'>No users found</td></tr>";
					break;
				default:
					listItems.innerHTML = "<tr><td colspan='3'>No se encontraron usuarios</td></tr>";
					break;
				}
			} else {
				listItems.innerHTML = "";
				data.users.forEach(user => {
					const tr = document.createElement("tr");
					const td1 = document.createElement("td");
					const td2 = document.createElement("td");
					const td3 = document.createElement("td");

					td1.textContent = data.users.indexOf(user) + 1;
					td2.textContent = user.name;
					td3.textContent = user.problems_solved.length;

					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);

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
