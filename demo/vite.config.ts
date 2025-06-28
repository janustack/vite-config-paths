import tsconfigPaths from "@janustack/vite-config-paths";
import tailwindCSS from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ target: "solid", autoCodeSplitting: true }),
		solid(),
		tailwindCSS(),
		tsconfigPaths(),
	],
	server: {
		port: 9705,
	},
});
