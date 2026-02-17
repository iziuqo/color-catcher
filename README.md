# 🎨 Color Catcher

> **A professional Figma plugin for designers who care about color.**  
> Built in under an hour. Vibe-coded with ❤️.

[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blueviolet?logo=figma)](https://www.figma.com/community)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

---

## ✨ What is Color Catcher?

Color Catcher is a **sleek, modern Figma plugin** that instantly extracts color values from any layer. Whether you're a designer handing off specs to developers or just need quick access to your palette, Color Catcher has you covered.

### Features

- 🎯 **Instant Color Extraction** – Select any layer, get HEX, RGB, HSL, and CSS values
- 📋 **One-Click Copy** – Click any format to copy to clipboard
- 🌟 **Beautiful UI** – Shadcn-inspired design with smooth animations
- 👋 **Smart Onboarding** – First-time users get a quick intro (shows once)
- 💬 **Built-in Feedback** – Send suggestions directly from the plugin
- 🚀 **Lightning Fast** – Real-time updates as you select layers

---

## 🚀 Quick Start

### For Designers (No Code Required)

1. **Install from Figma Community** (coming soon!)
2. Open any Figma file
3. Run the plugin: `Plugins → Color Catcher`
4. Select a layer with a solid fill
5. Click any color format to copy it!

### For Developers

```bash
# Clone the repo
git clone https://github.com/iziuqo/color-catcher.git
cd color-catcher

# Install dependencies
npm install

# Build the plugin
npm run build

# Load in Figma
# 1. Open Figma Desktop
# 2. Go to Plugins → Development → Import plugin from manifest
# 3. Select the manifest.json file from this repo
```

---

## 🏗️ Project Structure

```
color-catcher/
├── code.ts              # Main plugin logic (TypeScript)
├── ui.html              # Plugin UI (HTML + CSS + JS)
├── manifest.json        # Figma plugin configuration
├── api/
│   └── submit.ts        # Serverless feedback handler (Vercel)
├── dist/                # Compiled output
└── public/              # Static assets for deployment
```

### How It Works

1. **`code.ts`** – Runs in Figma's sandbox. Listens for selection changes and extracts color data.
2. **`ui.html`** – The visual interface. Displays colors and handles user interactions.
3. **`api/submit.ts`** – A serverless function on Vercel that proxies feedback to Formspree.

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe plugin logic |
| **Figma Plugin API** | Access to Figma's design data |
| **Vanilla HTML/CSS/JS** | Lightweight, fast UI |
| **Vercel** | Serverless backend for feedback |
| **Formspree** | Email delivery for user feedback |

---

## 🛠️ Development Guide

### Prerequisites

- Node.js 16+ and npm
- Figma Desktop App
- (Optional) Vercel account for feedback feature

### Local Development

```bash
# Watch mode (auto-rebuild on changes)
npm run build -- --watch

# In Figma, reload the plugin to see changes
```

### Environment Variables (for feedback)

If you want the feedback form to work, you'll need to:

1. Create a form at [Formspree.io](https://formspree.io)
2. Deploy to Vercel: `npx vercel`
3. Add your Formspree ID as an environment variable:
   ```bash
   npx vercel env add FORMSPREE_ID
   ```

See [`DEPLOY.md`](./DEPLOY.md) for detailed instructions.

---

## 📖 Code Walkthrough

### Color Conversion Logic

```typescript
// code.ts - Convert Figma's 0-1 RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
```

### Onboarding Persistence

```typescript
// Check if user has seen onboarding
async function checkOnboarding() {
  const hasOnboarded = await figma.clientStorage.getAsync("hasOnboarded");
  if (!hasOnboarded) {
    figma.ui.postMessage({ type: "show-onboarding" });
  }
}
```

### UI State Management

```javascript
// ui.html - Simple message-based state
window.onmessage = (event) => {
  const { type, data } = event.data.pluginMessage;
  
  if (type === 'update-color') {
    if (data) {
      renderData(data);  // Show color values
    } else {
      showEmptyState();  // Show "select a layer" message
    }
  }
};
```

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** – Open an issue with steps to reproduce
2. **Suggest Features** – Use the in-plugin feedback form or GitHub issues
3. **Submit PRs** – Fork, create a feature branch, and submit a pull request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

MIT License - feel free to use this in your own projects!

---

## 🌟 The Story

This entire plugin was **vibe-coded in under an hour** as a demonstration of rapid prototyping with modern tools. The goal was to create something genuinely useful while keeping the code clean and beginner-friendly.

**Key decisions:**
- **No frameworks** – Vanilla JS keeps it simple and fast
- **Inline styles** – Everything in one HTML file for easy understanding
- **Clear naming** – Variables like `els.onboarding` instead of cryptic abbreviations
- **Comments where it matters** – Explaining *why*, not *what*

---

## 🙏 Acknowledgments

- Figma Plugin API team for excellent documentation
- Shadcn for UI design inspiration
- The design community for feedback and support

---

## 📬 Contact

- **Issues**: [GitHub Issues](https://github.com/iziuqo/color-catcher/issues)
- **Feedback**: Use the in-plugin feedback button
- **Twitter**: [@heyizaias](https://twitter.com/heyizaias)
- **Website**: [izaias.vercel.app](https://izaias.vercel.app)

---

<p align="center">
  Made with ☕ and ⚡ by <a href="https://github.com/iziuqo">@iziuqo</a>
</p>
