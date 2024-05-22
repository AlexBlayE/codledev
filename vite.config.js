import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    root: path.join(__dirname, "./monaco_editor_html"),
    base: "/",
    build: {
        outDir: path.join(__dirname, "./views"),
        assetsDir: path.join("monacoAssets"),
        minify: true,
    },
});
