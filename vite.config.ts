/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
const path = require("path");

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "happy-dom",
		setupFiles: ["src/setupTest.ts"],
		reporters: 'vitest-sonar-reporter',
        outputFile: 'report/sonar-report.xml',
		coverage: {
			provider: "c8",
			reporter: ['lcov']
		}
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
});
