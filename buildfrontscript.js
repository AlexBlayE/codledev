import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

fs.cpSync(
	path.join(__dirname, "./views/monacoAssets"),
	path.join(__dirname, "./public/monacoAssets"),
	{
		recursive: true,
	});

fs.rmSync(
	path.join(__dirname, "./views/monacoAssets"),
	{
		recursive: true,
	});

fs.renameSync(
	path.join(__dirname, "./views/index.html"),
	path.join(__dirname, "./views/index.ejs")
);

const indexData = fs.readFileSync(path.join(__dirname, "./views/index.ejs"),{
	encoding: "utf-8",
});

const newData = indexData.replace(/<!--/g, "").replace(/-->/g, "");

fs.writeFileSync(path.join(__dirname, "./views/index.ejs"), newData, {
	encoding: "utf-8"
});
