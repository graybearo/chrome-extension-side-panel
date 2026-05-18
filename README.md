# chrome-extension-side-panel

> A **Chrome Side Panel API** starter for **Manifest V3 (MV3)** — Vite +
> React + TypeScript. Click the action icon, the side panel opens with a
> live view of the current tab. Requires **Chrome 114+** (and Edge 114+).

<p>
  <img src="https://img.shields.io/badge/manifest-v3-blue" alt="MV3">
  <img src="https://img.shields.io/badge/Chrome-114%2B-blue" alt="Chrome 114+">
  <img src="https://img.shields.io/badge/vite-5-purple" alt="Vite 5">
  <img src="https://img.shields.io/badge/react-18-cyan" alt="React 18">
  <img src="https://img.shields.io/badge/typescript-5-3178c6" alt="TS 5">
</p>

The `chrome.sidePanel` API (introduced in Chrome 114) gives extensions a
persistent UI that lives alongside the page — unlike a popup, it stays
open as you click around. It's ideal for **AI sidebars, reference docs,
notes, chat companions, and tab-context viewers**. This starter is a
minimal, modern scaffold for that pattern.

## What's in the box

- ⚡ **Vite 5 + `@crxjs/vite-plugin`** — manifest is the source of truth; HMR
  for the side panel UI.
- 🪟 **Side Panel pre-wired** — `chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })`
  in the SW means the action icon just opens the panel.
- ⚛️ **React 18 + TypeScript (strict)** — panel is a real React app.
- 📡 **Typed messaging** via [`mv3-message-router`](https://github.com/graybearo/mv3-message-router)
  — side panel ↔ service worker calls with end-to-end typing.
- 🔄 **Tab-aware** — panel listens to `chrome.tabs.onActivated` /
  `onUpdated` and re-fetches the current tab's metadata in real time.

## Quick start

```bash
git clone https://github.com/graybearo/chrome-extension-side-panel my-sidepanel
cd my-sidepanel
pnpm install
pnpm dev
```

Then in Chrome:

1. Open `chrome://extensions/`
2. Toggle **Developer mode** on
3. Click **Load unpacked**
4. Select the `dist/` folder
5. Click the extension's action icon in the toolbar — the side panel slides in

## Layout

```
src/
├── background/index.ts     # service worker — sets sidePanel behavior, hosts message router
├── sidepanel/              # the panel UI (React)
│   ├── index.html
│   ├── main.tsx
│   ├── App.tsx
│   └── App.css
└── shared/
    └── messages.ts         # typed message contract
```

## Side Panel pattern

The two key APIs:

```ts
// In the service worker — open panel on action click
chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });

// Or open programmatically from any context with a tab id
chrome.sidePanel.open({ tabId });
```

The panel's lifetime is tied to the window; it persists while you navigate
between tabs. Inside the panel, you can listen to `chrome.tabs` events to
update what you show.

## When to use a side panel vs a popup

| | Popup | Side Panel |
| --- | --- | --- |
| Persists across clicks | ❌ closes on outside click | ✅ stays open |
| Width | ~300-400px fixed | resizable, up to ~500px+ |
| Tab-aware UX | hard | easy via `chrome.tabs.*` events |
| Best for | one-shot actions | AI sidebars, references, chat, notes |

## Building

```bash
pnpm build           # Chrome / Edge build into dist/
pnpm zip             # zip dist/ for web-store upload
```

## Browser support

- **Chrome**: 114+ (May 2023)
- **Edge**: 114+
- **Firefox**: not supported (Firefox has its own `sidebar_action` instead)

For Firefox sidebar support, you'd need a separate manifest entry using
`sidebar_action` — not covered by this starter.

## Related packages

Part of a small **MV3 toolkit** by [@graybearo](https://github.com/graybearo):

- [`mv3-message-router`](https://github.com/graybearo/mv3-message-router) — type-safe message passing
- [`mv3-keepalive`](https://github.com/graybearo/mv3-keepalive) — service-worker keepalive + durable alarms
- [`chrome-extension-vite-react`](https://github.com/graybearo/chrome-extension-vite-react) — popup-based starter (Vite + React + TS)
- [`chrome-extension-vite-svelte`](https://github.com/graybearo/chrome-extension-vite-svelte) — popup-based starter (Vite + Svelte + TS)
- [`awesome-mv3`](https://github.com/graybearo/awesome-mv3) — curated list of MV3 tools, libraries, and resources

## License

MIT — see [LICENSE](LICENSE).
