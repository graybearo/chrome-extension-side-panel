import { createRouter } from "mv3-message-router";
import type { Messages } from "@/shared/messages";

// Open the side panel when the action icon is clicked.
void chrome.sidePanel
	.setPanelBehavior({ openPanelOnActionClick: true })
	.catch((err) => console.warn("[sw] setPanelBehavior failed:", err));

const VIEW_COUNT_KEY = "viewCount";

const router = createRouter<Messages>();

router.on("GET_CURRENT_TAB", async () => {
	const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
	if (!tab) return null;
	return {
		id: tab.id,
		title: tab.title ?? "",
		url: tab.url ?? "",
	};
});

router.on("GET_VIEW_COUNT", async () => {
	const { [VIEW_COUNT_KEY]: count = 0 } = await chrome.storage.local.get(VIEW_COUNT_KEY);
	return { count };
});

router.on("BUMP_VIEW_COUNT", async () => {
	const { [VIEW_COUNT_KEY]: prev = 0 } = await chrome.storage.local.get(VIEW_COUNT_KEY);
	const next = prev + 1;
	await chrome.storage.local.set({ [VIEW_COUNT_KEY]: next });
	return { count: next };
});

router.listen();

chrome.runtime.onInstalled.addListener(() => {
	console.log("[sw] installed — open the side panel via the toolbar icon.");
});
