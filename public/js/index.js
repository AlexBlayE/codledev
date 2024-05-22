import { getCookie } from "./utils.js";

// ------------------------ Theme Dialog ------------------------

document.getElementById("editor-styles").addEventListener("mousedown", () => {
	document.getElementById("theme-dialog").style.display = "flex";
}
);

// ------------------------ Theme Change ------------------------

if (document.cookie.includes("theme=default-theme")) {
	document.getElementById("monaco-editor").style.filter = "none";
} else if (document.cookie.includes("theme=alternative-theme")) {
	document.getElementById("monaco-editor").style.filter = "hue-rotate(-60deg) brightness(1.1) saturate(0.9)";
} else if (document.cookie.includes("theme=cutesy-theme")) {
	document.getElementById("monaco-editor").style.filter = "hue-rotate(90deg)";
}

for (const x of document.getElementsByClassName("theme-btn")) {
	x.addEventListener("mousedown", () => {
		const theme = x.getAttribute("id");
		document.cookie = `theme=${theme}; path=/`;
		location.reload();
	}
	);
}


// ------------------------ Dark Mode ------------------------

if (document.cookie.includes("mode=dark")) {
	document.getElementById("language-selector").style.background = "url(../img/chevron-down-white.svg) no-repeat right var(--white)";
	document.getElementById("language-selector").style.backgroundSize = "0.75rem";
	document.getElementById("language-selector").style.backgroundPositionX = "6.5rem";
}

// ------------------------ Close Buttons Or Escape Key ------------------------

for (const x of document.getElementsByClassName("close")) {
	x.addEventListener("mousedown", () => {
		document.getElementById("theme-dialog").style.display = "none";
		document.getElementById("solve-dialog").style.display = "none";
	});
}

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape") {
		document.getElementById("theme-dialog").style.display = "none";
		document.getElementById("solve-dialog").style.display = "none";
	}
});

// ------------------------ Share Button ------------------------

let shareState = false;

for (const x of document.getElementsByClassName("share")) {
	x.addEventListener("mousedown", () => {
		if (!shareState) {
			document.getElementById("share-options").style.width = "6.5rem";
			document.getElementById("share-options").style.padding = "0rem 1rem";
			for (const y of document.getElementsByClassName("share-option")) {
				y.style.animation = "";
				y.style.display = "flex";
			}
			document.getElementById("share-chevron").style.setProperty("--initial-rotation", "90deg");
			shareState = true;
		} else {
			document.getElementById("share-options").style.width = "0.5rem";
			document.getElementById("share-options").style.padding = "0";
			for (const y of document.getElementsByClassName("share-option")) {
				y.style.animation = "displayNone 0.2s forwards";
			}
			document.getElementById("share-chevron").style.setProperty("--initial-rotation", "-90deg");
			shareState = false;
		}
	}
	);
}

function shareButtons() {
	document.getElementById("twitter-share").setAttribute("href", `https://twitter.com/intent/tweet?url=${window.location.href}&text=Try%20to%20solve%20this%20problem%20on%20Codle!`);
	document.getElementById("linkedin-share").setAttribute("href", `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`);
}

async function checkLanguages() {
	for (const x of document.getElementsByClassName("language-icon")) {
		x.style.display = "none";
	}
	let urlDate = window.location.pathname.split("/")[1];
	if (urlDate === "" || urlDate === undefined) {
		urlDate = new Date().toISOString().split("T")[0];
	}
	console.log(urlDate);
	try {
		const response = await fetch(`/api/user/problem/${urlDate}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authorization": "Bearer " + getCookie("auth")
			},
		});
		const languageArray = await response.json();
		console.log(languageArray);

		for (const x of languageArray.languages) {
			switch (x) {
			case "js":
				document.getElementById("js-icon").style.display = "flex";
				break;
			case "c":
				document.getElementById("c-icon").style.display = "flex";
				break;
			case "c++":
				document.getElementById("c++-icon").style.display = "flex";
				break;
			case "py":
				document.getElementById("py-icon").style.display = "flex";
				break;
			}
		}
	} catch (error) {
		console.log(error);
	}

}

addEventListener("DOMContentLoaded", () => {
	shareButtons();
	checkLanguages();
});
