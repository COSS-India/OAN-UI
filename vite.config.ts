import { defineConfig, PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
const virtualRouteFileChangeReloadPlugin: PluginOption = {
	name: "watch-config-restart",
	configureServer(server) {
		server.watcher.add("./src/routes.ts");
		server.watcher.on("change", (path) => {
			if (path.endsWith("src/routes.ts")) {
				console.log("Virtual route changed");
				server.restart();
			}
		});
	}
};
// https://vite.dev/config/
export default defineConfig({
	// Serve assets under a sub-path when VITE_BASE_PATH is set (e.g. "/bv"),
	// otherwise from root. Normalised to a leading+trailing slash for Vite.
	base: process.env.VITE_BASE_PATH
		? `/${process.env.VITE_BASE_PATH.split("/").filter(Boolean).join("/")}/`
		: "/",
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"~": path.resolve(__dirname)
		}
	},
	plugins: [
		tsconfigPaths(),
		nodePolyfills({ globals: { Buffer: true } }),
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: path.resolve(__dirname, "src/pages"),
			virtualRouteConfig: "./src/routes.ts",
			generatedRouteTree: "./src/routeTree.gen.ts"
		}),
		react(),
		virtualRouteFileChangeReloadPlugin
	],
	server: {
		port: 3000
	}
});
