const signupUser = document.getElementById("signup-user");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-pass");
const signupConfirm = document.getElementById("signup-confirm");
const signupButton = document.getElementById("signup-btn");

signupButton.addEventListener("click", async (event) => {
	event.preventDefault();

	if (signupUser.value === "" || signupEmail.value === "" || signupPassword.value === "" || signupConfirm.value === "") {
		alert("Please fill in all fields");
		return;
	}
	if (signupPassword.value !== signupConfirm.value) {
		alert("Passwords do not match");
		return;
	}

	await fetch("/api/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: signupUser.value,
			email: signupEmail.value,
			password: signupPassword.value,
			repeatPassword: signupPassword.value
		})
	});
	
	location.reload();
});

const signInUser = document.getElementById("signin-user");
const signInPassword = document.getElementById("signin-pass");
const signInBtn = document.getElementById("signin-btn");

signInBtn.addEventListener("click", async (event) => {
	event.preventDefault();

	await fetch("/api/login",{
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			name: signInUser.value,
			password: signInPassword.value
		})
	});

	window.location.reload();
});
