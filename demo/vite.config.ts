import tsconfigPaths from "@plugwalk/vite-tsconfig-paths";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import tailwindCSS from "@tailwindcss/vite";
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
