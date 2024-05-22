import * as monaco from 'monaco-editor';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import jsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import { getCookie } from '../public/js/utils';

const initialValueJS = `function main(arg) {

}`;
const initialValueC = `int solution() {

}`;
const initialValuePY = `def solution():

`;


const app = document.getElementById("app");
self.MonacoEnvironment = {
	getWorker: function (workerId, label) {
		switch (label) {
			case 'json':
				return jsonWorker();
			case 'css':
			case 'scss':
			case 'less':
				return cssWorker();
			case 'html':
			case 'handlebars':
			case 'razor':
				return htmlWorker();
			case 'typescript':
			case 'javascript':
				return jsWorker();
			default:
				return editorWorker();
		}
	}
};

monaco.editor.defineTheme('standard', {
	base: 'vs',
	inherit: true,
	rules: [
		{ token: 'comment', foreground: '008000', fontStyle: 'bold' },
		{ token: 'keyword', foreground: '111BD9', fontStyle: 'bold' },
	],
	colors: {
		"editor.background": "#FFFFFF",
		"editor.foreground": "#000000",
		"editor.cursorForeground": "#111BD9", // Cursor
		"editor.lineHighlightBackground": "#CEDEF2", // Current line selected
		"editor.selectionBackground": "#BBBDF2", // Current line selected
		"editorLineNumber.activeForeground": "#111BD9", // Line number color
		"editorLineNumber.foreground": "#9591F2", // Line number color
	},
});

monaco.editor.defineTheme('dark', {
	base: 'vs-dark',
	inherit: true,
	rules: [
		{ token: 'comment', foreground: '00bb00', fontStyle: 'bold' },
		{ token: 'keyword', foreground: '3876F2', fontStyle: 'bold' },
	],
	colors: {
		"editor.background": "#202020",
		"editor.foreground": "#E7E7E7",
		"editor.cursorForeground": "#3876F2", // Cursor
		"editor.lineHighlightBackground": "#2F2F2F", // Current line selected
		"editor.selectionBackground": "#aaabee69", // Current line selected
		"editorLineNumber.activeForeground": "#3876F2", // Line number color
		"editorLineNumber.foreground": "#9591F2", // Line number color
	},
});

if (document.cookie.includes("mode=light")) {
	monaco.editor.setTheme('standard');
} else {
	monaco.editor.setTheme('dark');
}

const myEditor = monaco.editor.create(document.getElementById("monaco-editor"), {
	value: initialValueJS,
	language: "javascript",
	automaticLayout: true,
	fontFamily: "Inconsolata",
	fontSize: 16,
	showFunctions: true,
	mouseWheelZoom: true,
	smoothScrolling: true,
	stickyScroll: {
		enabled: true,
	},
	minimap: {
		enabled: false
	},
	wordWrap: "on",
});

document.getElementById("submit").addEventListener("click", async () => {
	let lang = null;
	switch (document.getElementById("language-selector").value) {
		case "js":
			lang = "js";
			break;
		case "py":
			lang = "py";
			break;
		case "c":
			lang = "c";
			break;
		case "c++":
			lang = "c++";
			break;
	}
	let toSendBody;
	if (new RegExp(/^\d{4}-\d{2}-\d{2}$/).test(window.location.pathname.split("/")[1])) {
		toSendBody = {
			userScript: myEditor.getValue(),
			lang,
			date: window.location.pathname.split("/")[1]
		}
	} else {
		toSendBody = {
			userScript: myEditor.getValue(),
			lang,
		}
	}
	const response = await fetch('/api/problem/test', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			"Authorization": "Bearer " + getCookie("auth")
		},
		body: JSON.stringify(toSendBody)
	});
	const data = await response.json();
	data.solved ? modalCorrect() : modalIncorrect();
}
);

function modalCorrect() {
	document.getElementById("solve-dialog").style.display = "flex";
	document.getElementById("solve-dialog-content").innerHTML = `
		<h2>Correct</h2>
		<p>Good job!</p>
	`;
}

function modalIncorrect() {
	document.getElementById("solve-dialog").style.display = "flex";
	document.getElementById("solve-dialog-content").innerHTML = `
		<h2>Incorrect</h2>
		<p>Don't give up!</p>
	`;
}

document.getElementById("language-selector").addEventListener("change", () => {
	const model = myEditor.getModel();
	switch (document.getElementById("language-selector").value) {
		case "js":
			monaco.editor.setModelLanguage(model, "javascript");
			myEditor.setValue(initialValueJS);
			break;
		case "py":
			monaco.editor.setModelLanguage(model, "python");
			myEditor.setValue(initialValuePY);
			break;
		case "c":
			monaco.editor.setModelLanguage(model, "c");
			myEditor.setValue(initialValueC);
			break;
		case "c++":
			monaco.editor.setModelLanguage(model, "cpp");
			myEditor.setValue(initialValueC);
			break;
	}
});


// Guardar el código en la base de datos al cerrar la ventana
// window.addEventListener("beforeunload", () => { // No hase await
// 	fetch('/api/problem/', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			userScript: myEditor.getValue(),
// 			lang: "js"
// 		})
// 	});
// }
// );
