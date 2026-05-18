import { useEffect, useState } from "react";
import { createClient } from "mv3-message-router";
import type { Messages } from "@/shared/messages";

const client = createClient<Messages>();

interface TabInfo {
	id?: number;
	title: string;
	url: string;
}

export function App() {
	const [tab, setTab] = useState<TabInfo | null>(null);
	const [count, setCount] = useState<number | null>(null);

	useEffect(() => {
		void refresh();

		const onTabUpdated = () => {
			void refresh();
		};
		const onTabActivated = () => {
			void refresh();
		};

		chrome.tabs.onUpdated.addListener(onTabUpdated);
		chrome.tabs.onActivated.addListener(onTabActivated);

		// Bump view count when panel opens
		void client.send("BUMP_VIEW_COUNT", undefined).then(({ count: next }) => setCount(next));

		return () => {
			chrome.tabs.onUpdated.removeListener(onTabUpdated);
			chrome.tabs.onActivated.removeListener(onTabActivated);
		};
	}, []);

	async function refresh() {
		const current = await client.send("GET_CURRENT_TAB", undefined);
		setTab(current);
	}

	return (
		<main>
			<header>
				<h1>Side Panel</h1>
				<p className="hint">Persists as you switch tabs.</p>
			</header>

			<section>
				<h2>Current tab</h2>
				{tab ? (
					<dl>
						<dt>Title</dt>
						<dd>{tab.title || "(no title)"}</dd>
						<dt>URL</dt>
						<dd className="mono">{tab.url || "(no url)"}</dd>
					</dl>
				) : (
					<p className="dim">No active tab.</p>
				)}
			</section>

			<section>
				<h2>Stats</h2>
				<p>Side panel opens: <strong>{count ?? "…"}</strong></p>
			</section>

			<footer>
				<p className="dim">
					Edit <code>src/sidepanel/App.tsx</code> — Vite hot-reloads.
				</p>
			</footer>
		</main>
	);
}
