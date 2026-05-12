# Cursor Context: Color Catcher

Use this file as the persistent project memory for Cursor. It is intentionally dense so future feature work can start from product intent, designer value, architecture, and implementation constraints without re-discovering the codebase.

## How to install/use this context in Cursor

1. Keep this file at the repository root as `CURSOR_CONTEXT.md`.
2. Keep `.cursor/rules/color-catcher-context.mdc` in the repo so Cursor has a tiny always-on pointer to this file instead of embedding this whole document into every chat.
3. At the start of any substantial feature request in Cursor, say: `Use @CURSOR_CONTEXT.md as project memory, then implement ...`.
4. If Cursor seems confused, explicitly attach or mention `@CURSOR_CONTEXT.md`, `@code.ts`, and any changed file.
5. Update this file whenever product direction, architecture, supported formats, storage keys, deployment URLs, or known constraints change.

## Project identity

- Product name: **Color Catcher**.
- Product type: Figma plugin plus a small Vercel feedback endpoint.
- Public plugin ID: `1605725747312426245`.
- Core promise: designers can select a Figma layer and instantly capture production-ready color data without leaving design flow.
- Current public positioning: “professional color utility for Figma,” “instant color extraction,” “smart color naming,” “one-click copy,” and “beautiful, lightning-fast UI.”
- Design vibe: modern, polished, shadcn-inspired, minimal, friendly, and workflow-first.
- Origin story: intentionally simple and rapidly built, but useful enough to be a real Figma Community utility.

## Value for designers

Color Catcher is valuable because it removes color translation friction:

- **Design handoff:** Designers can give developers exact HEX, RGB, HSL, CSS `rgb()`, OKLCH, and CMYK values.
- **Design systems:** Teams can document palette values and human-readable names from one selected Figma layer.
- **Visual QA:** Designers can inspect whether layers use expected colors without hunting through Figma panels.
- **Learning and exploration:** Smart names help users describe colors, not just copy numerical values.
- **Flow preservation:** The plugin updates from selection changes, so users stay in Figma instead of switching tools.
- **Preference preservation:** Format ordering is draggable and persisted, making the utility adapt to each designer’s workflow.
- **Trust:** Immediate copy feedback, exact/approximate name indicators, and a visible swatch help users know what they captured.

## Product principles

When adding features, preserve these principles:

1. **Instant over comprehensive:** The primary interaction is select layer → see values → click to copy.
2. **Designer-first language:** Prefer clear labels, friendly copy, and visual confidence over technical verbosity.
3. **Small surface area:** Avoid bloating the UI; the plugin window is only 300×500.
4. **No heavy frontend dependencies:** The project intentionally uses TypeScript plus vanilla HTML/CSS/JS.
5. **Readable code:** This repo values beginner-friendly, explicit function names and simple structure.
6. **Performance matters:** Selection changes and document changes must feel real-time.
7. **Graceful failure:** Empty states, feedback errors, storage errors, and unsupported layers should not crash the plugin.
8. **Copy behavior is sacred:** If a value is visible, clicking it should copy exactly that value.

## Repository map

- `code.ts`: canonical plugin source. It contains the NTC color database, embedded UI HTML/CSS/JS string, color conversions, Figma API listeners, persistence, and message handling.
- `dist/code.js`: generated build output expected by `manifest.json`; created by `npm run build` and not committed in this snapshot if absent.
- `code.js`: empty legacy/stub file; do not treat it as canonical.
- `ui.html`: older standalone UI file. It is useful for historical context but currently lacks newer canonical UI features that exist inside `code.ts`, such as color names, CMYK row, format reordering, and reset-order behavior.
- `manifest.json`: Figma plugin manifest. Main entry is `dist/code.js`; plugin declares `ui.html` but runtime source currently calls `figma.showUI(htmlContent, ...)` from `code.ts`.
- `ntc-data.txt`: original Name That Color dataset with 1,566 color names.
- `api/submit.ts`: Vercel serverless function that accepts plugin feedback and proxies it to Formspree using `FORMSPREE_ID`.
- `README.md`: broad product, setup, feature, and deployment documentation.
- `CONTRIBUTING.md`: code style and contribution expectations.
- `figma-community-*.md`: Figma Community listing copy variants.
- `release-notes-*.md`: release copy for v1.1 and v1.2.
- `_assets/`: plugin icons/cover art.
- `public/index.html`: minimal public deployment placeholder.
- `package.json`: npm scripts and TypeScript/Figma typings dependencies.
- `tsconfig.json`: TypeScript configuration; excludes `api` from plugin build.

## Architecture overview

Color Catcher has two cooperating contexts:

1. **Figma plugin main context (`code.ts`)**
   - Runs in Figma’s sandbox.
   - Reads `figma.currentPage.selection`.
   - Extracts the first visible solid fill from the first selected layer.
   - Converts Figma RGB values from 0–1 floats into multiple color formats.
   - Finds the nearest NTC color name.
   - Sends structured color data to the UI with `figma.ui.postMessage`.
   - Persists onboarding and format-order preferences in `figma.clientStorage`.

2. **Plugin UI context (embedded `htmlContent` in `code.ts`)**
   - Renders onboarding, color display, format rows, empty state, feedback view, toast, and drag/drop ordering.
   - Receives messages from the plugin main context with `window.onmessage`.
   - Sends messages back with `parent.postMessage({ pluginMessage: ... }, '*')`.
   - Copies visible text via Clipboard API with a hidden-textarea fallback.
   - Sends feedback to the deployed Vercel endpoint.

The standalone Vercel endpoint is separate from Figma plugin execution and only supports feedback submission.

## Figma runtime details

- `figma.showUI(htmlContent, { width: 300, height: 500 })` creates the plugin UI.
- The plugin listens to `selectionchange` and calls `updateUI()`.
- The plugin calls `figma.loadAllPagesAsync()` before adding a debounced `documentchange` listener, which lets UI update when selected layer colors change.
- `documentchange` updates are debounced by 50ms.
- Only the first selected layer is inspected.
- Only visible solid fills are supported.
- If a layer has multiple visible solid fills, the first one is used.
- Unsupported selections or no selection produce `data: null`, which shows the empty state.

## Message contracts

Messages from plugin main context to UI:

- `{ type: "show-onboarding" }`: asks UI to reveal onboarding overlay.
- `{ type: "update-color", data: ColorData | null }`: provides selected color data or empty-state signal.
- `{ type: "set-format-order", order: string[] | undefined }`: sends saved format order.

Messages from UI to plugin main context:

- `{ type: "complete-onboarding" }`: persist onboarding completion.
- `{ type: "get-format-order" }`: request persisted format order.
- `{ type: "save-format-order", order: string[] }`: persist current drag/drop order.

Do not silently rename message types or payload keys. If adding messages, keep the same explicit pattern.

## Persistent storage keys

- `hasOnboarded`: boolean-like flag in `figma.clientStorage` indicating onboarding has been completed.
- `formatOrder`: string array in `figma.clientStorage` storing the user’s preferred order for color rows.

Any future storage keys should be documented here and should degrade safely if unavailable or malformed.

## Color data contract

`processColor(r, g, b)` returns:

```ts
interface ColorData {
  hex: string;
  rgb: string;
  css: string;
  hsl: string;
  oklch: string;
  cmyk: string;
  name: string;
  exact: boolean;
}
```

Expected display/copy examples:

- `hex`: `#FF6B6B`
- `rgb`: `255, 107, 107`
- `css`: `rgb(255, 107, 107)`
- `hsl`: `hsl(0, 100%, 71%)`
- `oklch`: `oklch(0.63 0.22 29.23)`
- `cmyk`: `0%, 58%, 58%, 0%`
- `name`: `Coral Red` or similar NTC nearest match
- `exact`: `true` for exact database match; otherwise the UI prefixes the displayed name with `≈ ` while copying only the raw name

## Color conversion notes

- Figma RGB values are floats in the 0–1 range.
- `rgbToHex` multiplies by 255, rounds, pads, and returns uppercase `#RRGGBB`.
- `calculateHslComponents` returns normalized HSL components for algorithmic reuse.
- `rgbToHsl` returns a human-friendly `hsl(H, S%, L%)` string.
- `rgbToCmyk` returns percentage values and handles pure black as `0%, 0%, 0%, 100%`.
- `rgbToOklch` performs RGB gamma correction, converts through XYZ and OKLab, then formats `oklch(L C H)` with two decimals.
- Color conversion values are cached in a simple 100-entry LRU `Map`, keyed by RGB rounded to four decimals.

## Smart color naming

- The code embeds an NTC database of approximately 1,566 named colors directly in `code.ts`.
- `NTC_COLOR_MAP` enables fast exact HEX lookups.
- `NTC_PRECOMPUTED` stores HEX, name, RGB, and HSL components to avoid repeated parsing/conversion.
- `findClosestColorName` first checks exact match, then computes weighted RGB + HSL distance.
- Exact color names display without a prefix.
- Approximate color names display with `≈ `, but clicking the name copies only the name.
- Keep approximate vs exact distinction visible; it builds user trust.

## Current UI behavior

- Plugin window: 300px wide × 500px high.
- Header has a feedback button with tooltip.
- Main selected-color view includes:
  - Circular color swatch.
  - Large primary HEX value.
  - Clickable color name.
  - Copyable format rows.
  - Format rows for HEX, RGB, HSL, CSS, OKLCH, and CMYK.
  - Drag/drop row reordering.
  - Reset-order control when order differs from default.
- Empty state appears when no supported solid fill is detected.
- Onboarding appears once unless storage fails, in which case it still appears.
- Feedback view lets users submit a message plus optional email.
- Toast confirms copy, feedback success, or feedback failure.

## Default format order

The UI default is:

```js
['hex', 'rgb', 'hsl', 'css', 'oklch', 'cmyk']
```

If saved order is malformed, the UI validates known formats, drops unknown ones, and appends missing defaults.

## Backend feedback flow

- UI sends `POST https://color-catcher-blush.vercel.app/api/submit` with `{ message, email }`.
- `manifest.json` allows network access to `https://color-catcher-blush.vercel.app` for feedback.
- `api/submit.ts` handles CORS, allows `POST` and `OPTIONS`, requires `message`, requires `process.env.FORMSPREE_ID`, then forwards to Formspree.
- If backend or Formspree fails, UI shows `Failed to send` and re-enables the submit button.

## Build and test commands

Primary checks:

```bash
npm install
npm run build
npx tsc --noEmit
```

Notes:

- `npm test` is intentionally not useful right now; it exits with `Error: no test specified`.
- `api/submit.ts` is excluded from the plugin TypeScript build by `tsconfig.json`, so Vercel-specific types are not validated by `npm run build`.
- Loading the plugin in Figma requires a built `dist/code.js` because `manifest.json` points to it.

## Code style constraints

Follow the existing repo style:

- Keep meaningful variable and function names.
- Keep functions small and single-purpose.
- Comment the “why,” not obvious “what.”
- Avoid heavy external dependencies.
- Do not add a frontend framework unless explicitly requested.
- Do not wrap imports in try/catch.
- Prefer safe type guards for Figma data (`hasFills`, `isVisibleSolid`) instead of broad unsafe assertions.
- Keep UI copy concise and designer-friendly.
- Preserve the polished minimal visual language.

## Known inconsistencies and caution points

- `README.md` says MIT License, but `package.json` currently says `ISC`; check `LICENSE` before changing license claims.
- `README.md` references `DEPLOY.md`, but that file is not present in this snapshot.
- `package.json` version is `1.0.0`, while README badges/release notes discuss `1.2.0`/v1.2.
- `ui.html` is stale compared with the embedded UI in `code.ts`; avoid editing only `ui.html` for runtime features unless intentionally migrating architecture.
- `code.js` is empty and should not be used as source.
- `code.ts` is large because the NTC database and UI are embedded. Be careful with bulk edits and generated replacements.
- Figma supports only certain plugin APIs depending on API version; keep `manifest.json` compatibility in mind.
- The feedback endpoint imports `@vercel/node`, which is not listed in current `package.json` devDependencies.

## Feature ideation aligned to project value

High-fit future features:

- Multi-selection palette capture.
- Color history for recently selected colors.
- Copy all formats as a developer handoff block.
- Export palette to CSS variables, JSON tokens, Tailwind config, or Style Dictionary.
- Contrast/accessibility checks against another selected layer or chosen background.
- Opacity/alpha support for fills if Figma paint opacity is present.
- Gradient handling with clear messaging for stops.
- Favorite colors or named project palette.
- Design-token naming assistance.
- Better color-space precision options.

When implementing these, prioritize small, incremental UI additions over large redesigns.

## Anti-goals unless explicitly requested

- Full color-management suite with complex panels.
- Account systems or cloud sync.
- Heavy analytics/tracking.
- Replacing the simple vanilla UI with React/Vue/Svelte.
- Making the plugin dependent on a backend for core color extraction.
- Supporting every Figma paint type at the cost of confusing the primary solid-fill workflow.

## Recommended workflow for future Cursor sessions

For each new feature:

1. Read this file first.
2. Inspect `code.ts` around the relevant UI, conversion, and message sections.
3. Decide whether runtime changes belong in embedded `htmlContent`, plugin main logic, backend, or docs.
4. Make the smallest coherent change.
5. Run `npm run build` and, when possible, `npx tsc --noEmit`.
6. If UI changed, manually load the plugin in Figma or at least reason through Figma message contracts.
7. Update this context file if the architecture, product behavior, storage keys, or commands changed.

## One-paragraph brief for AI agents

Color Catcher is a lightweight, designer-first Figma plugin that turns the selected layer’s first visible solid fill into copyable color values, a smart NTC color name, and a polished UI for handoff/design-system workflows. The canonical runtime lives in `code.ts`, including the embedded UI string, color conversions, NTC database, Figma event listeners, and clientStorage persistence. Preserve instant selection-driven behavior, vanilla implementation, small 300×500 UI, one-click copy interactions, exact/approximate color-name trust signals, persisted draggable format order, and graceful empty/error states.
