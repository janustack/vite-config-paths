import { defineConfig } from "tsdown";

export default defineConfig({
	dts: true,
	entry: ["src/index.ts"],
	external: ["lightningcss", "vite"],
	sourcemap: true,
});
