import { getCookie } from "./utils.js";

document.addEventListener("DOMContentLoaded", getProfile);

async function getProfile() {
	try {
		const res = await fetch("api/user/info", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			}
		});
		const data = await res.json();
		if (res.ok) {
			document.getElementById("profile-name").innerHTML = `<p>${data.info.name}</p>`;
			document.getElementById("position-stat").innerHTML = "<p>1</p>";
			document.getElementById("resolved-stat").innerHTML = `<p>${data.problemsCount}</p>`;
			document.getElementById("favourite-stat").innerHTML = `<p>${data.favouriteLanguage}</p>`;
			document.getElementById("username").value = data.info.name;
			document.getElementById("email").value = data.info.email;
		}
	}
	catch (error) {
		console.error("Error:", error);
	}
}

document.getElementById("username-save").addEventListener("click", async function() {
	const username = document.getElementById("username").value;
	const data = { name: username };
	try {
		const res = await fetch("api/user/change", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
			document.getElementById("profile-name").innerHTML = `<p>${username}</p>`;
		}
	}
	catch (error) {
		console.error("Error:", error);
	}
});

document.getElementById("email-save").addEventListener("click", async function() {
	const email = document.getElementById("email").value;
	const data = { email: email };
	try {
		const res = await fetch("api/user/change", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify(data)
		});
		if (res.ok) {
			document.getElementById("email").value = email;
		}
	}
	catch (error) {
		console.error("Error:", error);
	}
});

document.getElementById("password-save").addEventListener("click", async function() {
	const newPassword = document.getElementById("new-password").value;
	const oldPassword = document.getElementById("current-password").value;
	const data = { newPassword: newPassword, oldPassword: oldPassword };
	try {
		console.log(data);
		const res = await fetch("api/user/change", {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
			body: JSON.stringify(data)
		});
		console.log(res);
		if (res.ok) {
			document.getElementById("new-password").value = "";
			document.getElementById("current-password").value = "";
		}
	}
	catch (error) {
		console.error("Error:", error);
	}
});
