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
// The app is served under a sub-path on the platform (e.g. /oan/), so assets must
// resolve under that base. Env-overridable (VITE_BASE); defaults to /oan/.
// Set VITE_BASE=/ to build/serve at root. Must stay in sync with the router
// basepath in src/main.tsx (VITE_ROUTER_BASEPATH).
const BASE = process.env.VITE_BASE ?? "/oan/";

// https://vite.dev/config/
export default defineConfig({
	base: BASE,
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
