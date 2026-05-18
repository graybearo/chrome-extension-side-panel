import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest({
	manifest_version: 3,
	name: "Chrome Side Panel Starter",
	version: "0.0.1",
	description: "MV3 starter using the chrome.sidePanel API — clicking the action icon opens a side panel with the current tab's context.",
	minimum_chrome_version: "114",
	action: {
		default_title: "Open side panel",
	},
	side_panel: {
		default_path: "src/sidepanel/index.html",
	},
	background: {
		service_worker: "src/background/index.ts",
		type: "module",
	},
	permissions: ["sidePanel", "storage", "tabs"],
});
