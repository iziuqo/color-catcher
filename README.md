# 🎨 Color Catcher

> **A professional Figma plugin for designers who care about color.**  
> Built in under an hour. Vibe-coded with ❤️.

[![Figma Plugin](https://img.shields.io/badge/Figma-Plugin-blueviolet?logo=figma)](https://www.figma.com/community)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)
[![Version](https://img.shields.io/badge/Version-1.1.0-green)](https://github.com/iziuqo/color-catcher)
[![Live](https://img.shields.io/badge/Live-✅%20Deployed-brightgreen)](https://color-catcher-blush.vercel.app)

---

## ✨ What is Color Catcher?

Color Catcher is a **sleek, modern Figma plugin** that instantly extracts color values from any layer. Whether you're a designer handing off specs to developers or just need quick access to your palette, Color Catcher has you covered.

### Features

- 🎯 **Instant Color Extraction** – Select any layer, get HEX, RGB, HSL, and CSS values
- 🏷️ **Smart Color Naming** – Automatically identifies color names from a database of 1,566 named colors
- 📋 **One-Click Copy** – Click any format or color name to copy to clipboard
- 🌟 **Beautiful UI** – Shadcn-inspired design with smooth animations and micro-interactions
- 👋 **Smart Onboarding** – First-time users get a quick intro (shows once)
- 💬 **Built-in Feedback** – Send suggestions directly from the plugin
- 🚀 **Lightning Fast** – Real-time updates as you select layers
- 🎨 **Visual Feedback** – Color swatch preview with hover and click animations
- 📱 **Responsive Design** – Optimized for different Figma window sizes

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
├── ntc-data.txt         # NTC (Name That Color) database with 1,566 colors
├── api/
│   └── submit.ts        # Serverless feedback handler (Vercel)
├── dist/                # Compiled output
└── public/              # Static assets for deployment
```

### How It Works

1. **`code.ts`** – Runs in Figma's sandbox. Listens for selection changes and extracts color data.
2. **`ui.html`** – The visual interface. Displays colors, handles user interactions, and manages UI state.
3. **`ntc-data.txt`** – Contains the NTC (Name That Color) database with 1,566 pre-defined color names.
4. **`api/submit.ts`** – A serverless function on Vercel that proxies feedback to Formspree.

---

## 🎨 Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe plugin logic |
| **Figma Plugin API** | Access to Figma's design data |
| **Vanilla HTML/CSS/JS** | Lightweight, fast UI |
| **NTC Database** | 1,566 named colors for intelligent color identification |
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

## 🆕 Latest Features & Improvements

### Smart Color Naming System (v1.1+)

The biggest enhancement is the intelligent color naming system powered by the NTC (Name That Color) database:

- **🎨 1,566 Named Colors**: Comprehensive database covering everything from "Navy Blue" to "International Klein Blue"
- **🧠 Intelligent Matching**: Uses weighted Euclidean distance algorithm to find the closest color match
- **⚡ Exact vs Approximate**: Shows exact matches directly, approximate matches with "≈" prefix
- **📋 Click-to-Copy Names**: Color names are clickable and copy to clipboard just like color values

### Enhanced User Experience

- **🎯 Visual Feedback**: Added hover states and click animations to color swatch
- **📱 Responsive Design**: Better adaptation to different Figma window sizes
- **🎨 Micro-interactions**: Smooth transitions and transform effects on interactive elements
- **💫 Toast Notifications**: User-friendly feedback for copy actions

### Technical Improvements

- **🏗️ Modular Architecture**: Color naming logic separated into dedicated functions
- **📊 Performance Optimized**: Efficient color distance calculations
- **🔧 Better Error Handling**: Graceful fallbacks for edge cases
- **📚 Enhanced Documentation**: Comprehensive code examples and API explanations

### Color Matching Algorithm

The smart color naming uses a sophisticated approach:

1. **Exact Match Check**: First checks if the color exists exactly in the database
2. **Distance Calculation**: If no exact match, calculates weighted Euclidean distance in RGB+HSL space
3. **Closest Match**: Returns the color with minimum distance as "approximately" the named color

---

## 📖 Code Walkthrough

### Smart Color Naming System

The plugin now includes an intelligent color naming system using the NTC (Name That Color) database:

```typescript
// code.ts - Find closest color name from 1,566 predefined colors
function findClosestColorName(r: number, g: number, b: number): { name: string; hex: string; exact: boolean } {
  const inputHex = rgbToHex(r, g, b).substring(1);
  
  // Check for exact match first
  const exactMatch = NTC_COLORS.find(([hex]) => hex === inputHex);
  if (exactMatch) {
    return { name: exactMatch[1], hex: exactMatch[0], exact: true };
  }
  
  // Find closest match using weighted Euclidean distance
  let closestColor = NTC_COLORS[0];
  let minDistance = Infinity;
  
  for (const [hex, name] of NTC_COLORS) {
    const distance = calculateColorDistance(inputHex, hex);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = [hex, name];
    }
  }
  
  return { name: closestColor[1], hex: closestColor[0], exact: false };
}
```

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

### Enhanced UI State Management

```javascript
// ui.html - Enhanced state with color naming
window.onmessage = (event) => {
  const { type, data } = event.data.pluginMessage;
  
  if (type === 'update-color') {
    if (data) {
      renderData(data);  // Show color values + name
      
      // Update color name with ≈ prefix if not exact match
      const namePrefix = data.exact ? "" : "≈ ";
      els.colorName.textContent = namePrefix + data.name;
      els.colorName.setAttribute('data-copy-value', data.name);
    } else {
      showEmptyState();  // Show "select a layer" message
    }
  }
};

// Color name click handler for copying
els.colorName.addEventListener('click', async () => {
  const colorName = els.colorName.getAttribute('data-copy-value');
  if (colorName) {
    await copyText(colorName);
    showToast('Color name copied!');
  }
});
```

### Original UI State Management

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

## � Deployment Status

### Production Deployment
- **✅ Status**: Live and deployed
- **🌐 Production URL**: https://color-catcher-blush.vercel.app
- **🔍 Vercel Dashboard**: https://vercel.com/iziuqos-projects/color-catcher
- **📅 Last Deployed**: February 18, 2026

### Plugin Distribution
- **📦 Figma Community**: Coming soon
- **🔧 Development**: Ready for local testing via manifest.json
- **🌍 Backend**: Feedback API endpoints live and functional

---

## �📬 Contact

- **Issues**: [GitHub Issues](https://github.com/iziuqo/color-catcher/issues)
- **Feedback**: Use the in-plugin feedback button
- **Twitter**: [@heyizaias](https://twitter.com/heyizaias)
- **Website**: [izaias.vercel.app](https://izaias.vercel.app)

---

<p align="center">
  Made with ☕ and ⚡ by <a href="https://github.com/iziuqo">@iziuqo</a>
</p>
