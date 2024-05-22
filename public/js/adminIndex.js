import { getCookie } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
	getProblemCount();
	getUserCount();
});


async function getProblemCount() {
	try {
		const res = await fetch("/api/problem/count", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
		});
		const data = await res.json();
		document.getElementById("problem-count").innerText = data.count;
	} catch (error) {
		console.error("Error:", error);
	}
}

async function getUserCount() {
	try {
		const res = await fetch("/api/user/count", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
		});
		const data = await res.json();
		document.getElementById("user-count").innerText = data.count;
	} catch (error) {
		console.error("Error:", error);
	}
}
