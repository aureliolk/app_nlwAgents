import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			external: [],
			// Ou se necessário, adicione o dayjs locale explicitamente
		}
	},
	optimizeDeps: {
		include: ["dayjs/locale/pt-br"]
	}
});