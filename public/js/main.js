import { getCookie, setCookie } from "./utils.js";

// ------------------------ Burger Menu ------------------------

const burgerContainer = document.getElementById("burger-button-container");
const burger = document.getElementById("burger-button");
const burgerMenu = document.getElementById("burger-menu");
let burgerState = false;

burger.addEventListener("mousedown", burgerDisplay);
burgerContainer.addEventListener("mousedown", function (e) { e.stopPropagation(); });

function burgerDisplay() {
	if (!burgerState) {
		burgerState = true;
		burger.style.animation = "";
		burger.style.animation = "rotateSVG 0.2s ease-in-out forwards";
		burgerMenu.style.display = "flex";
		burgerMenu.style.animation = "foldDown 0.2s ease-in-out forwards";
	} else if (burgerState) {
		burgerState = false;
		burger.style.animation = "";
		burger.style.animation = "rotateSVGBack 0.2s ease-in-out forwards";
		burgerMenu.style.animation = "foldUp 0.2s ease-in-out forwards";
	}
}


window.addEventListener("mousedown", function (e) {
	if (burgerState && e.target !== burgerContainer && e.target !== burger && e.target !== burgerMenu) {
		burgerState = false;
		burger.style.animation = "";
		burger.style.animation = "rotateSVGBack 0.2s ease-in-out forwards";
		burgerMenu.style.animation = "foldUp 0.2s ease-in-out forwards";
	}
}
);


// ------------------------ Sign Up, Sign In & Logout ------------------------
try {
	document.getElementById("sign-up-btn").addEventListener("mousedown", () => {
		document.getElementById("sign-up").style.display = "flex";
	});
} catch (e) {
	//
}

try {
	document.getElementById("sign-in-btn").addEventListener("mousedown", () => {
		document.getElementById("login").style.display = "flex";
	});
} catch (e) {
	//
}
try {
	document.getElementById("profile-btn").addEventListener("mousedown", () => {
		window.location.href = "/profile";
	});
} catch (e) {
	//
}
try {
	document.getElementById("log-out-btn").addEventListener("mousedown", () => {
		document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		window.location.reload();
	});
} catch (e) {
	//
}


// ------------------------ Close Buttons Or Escape Key ------------------------

for (const x of document.getElementsByClassName("close")) {
	x.addEventListener("mousedown", () => {
		document.getElementById("sign-up").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("burger-menu").style.display = "none";
		document.getElementById("language-dialog").style.display = "none";
	});
}


document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		document.getElementById("sign-up").style.display = "none";
		document.getElementById("login").style.display = "none";
		document.getElementById("burger-menu").style.display = "none";
		document.getElementById("language-dialog").style.display = "none";
		if (burgerState) {
			burgerState = false;
			burger.style.animation = "";
			burger.style.animation = "rotateSVGBack 0.2s ease-in-out forwards";
			burgerMenu.style.animation = "foldUp 0.2s ease-in-out forwards";
		}
	}
});

// ------------------------ Language Dialog ------------------------

document.getElementById("lang-menu").addEventListener("mousedown", () => {
	document.getElementById("language-dialog").style.display = "flex";
});

// ------------------------ Language Change ------------------------

const url = new URL(window.location.href);

for (const x of document.getElementsByClassName("language-btn")) {
	x.addEventListener("mousedown", () => {
		const lang = x.getAttribute("id");
		url.searchParams.set("lang", lang);
		document.cookie = `lang=${lang}; path=/`;
		window.location.href = url;
	});
}

if (getCookie("lang")) {
	if (getCookie("lang") != url.searchParams.get("lang")) {
		const lang = getCookie("lang");
		url.searchParams.set("lang", lang);
		window.location.href = url;
	}
} else {
	setCookie("lang", "es", 365);
}


// ------------------------ Dark Mode ------------------------

if (!getCookie("mode")) {
	setCookie("mode", "dark", 365);
	location.reload();
}

document.getElementById("dark-light-switch").addEventListener("mousedown", function () {
	if (document.cookie.includes("mode=light")) {
		document.cookie = "mode=dark; path=/";
		location.reload();
	} else {
		document.cookie = "mode=light; path=/";
		location.reload();
	}
}
);

if (document.cookie.includes("mode=light")) {
	document.documentElement.setAttribute("data-mode", "light");
} else {
	document.documentElement.setAttribute("data-mode", "dark");
	for (const x of document.getElementsByClassName("invert")) {
		x.style.filter = "invert(1)";
	}
	document.getElementsByTagName("img")[0].style.filter = "none";
	for (const x of document.getElementsByClassName("github-btn")) {
		x.style.backgroundImage = "url(../img/github-white.svg)";
	}
}

// ------------------------ Terms Checkbox ------------------------

document.getElementById("terms-checkbox").addEventListener("change", function () {
	if (this.checked) {
		document.getElementById("signup-btn").disabled = false;
		document.getElementById("signup-google").disabled = false;
		document.getElementById("signup-github").disabled = false;
	} else {
		document.getElementById("signup-btn").disabled = true;
		document.getElementById("signup-google").disabled = true;
		document.getElementById("signup-github").disabled = true;
	}
});
