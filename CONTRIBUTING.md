# Contributing to Color Catcher

First off, thank you for considering contributing to Color Catcher! 🎉

This project was built to be **accessible to everyone** – from junior developers to designers who are just starting to code. We want to keep that spirit alive.

---

## 🌟 Ways to Contribute

### 1. Report Bugs
Found something broken? Let us know!

- Check if the issue already exists in [GitHub Issues](https://github.com/iziuqo/color-catcher/issues)
- If not, create a new issue with:
  - **Steps to reproduce** the bug
  - **Expected behavior** vs. **actual behavior**
  - Screenshots if applicable
  - Your Figma version and OS

### 2. Suggest Features
Have an idea? We'd love to hear it!

- Open a GitHub issue with the `enhancement` label
- Describe the feature and why it would be useful
- (Optional) Use the in-plugin feedback button for quick suggestions

### 3. Improve Documentation
Documentation is just as important as code!

- Fix typos or unclear explanations
- Add examples or diagrams
- Translate the README (future goal!)

### 4. Submit Code
Ready to code? Here's how:

---

## 🛠️ Development Setup

```bash
# 1. Fork the repo on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/color-catcher.git
cd color-catcher

# 3. Install dependencies
npm install

# 4. Create a feature branch
git checkout -b feature/your-feature-name

# 5. Make your changes and test
npm run build

# 6. Load in Figma to test
# Figma → Plugins → Development → Import plugin from manifest
```

---

## 📝 Code Style Guide

We keep things simple and readable:

### TypeScript (`code.ts`)
```typescript
// ✅ Good: Clear function names
function extractColorFromLayer(layer: SceneNode) { ... }

// ❌ Avoid: Cryptic abbreviations
function extClrFrmLyr(l: any) { ... }
```

### HTML/CSS (`ui.html`)
```html
<!-- ✅ Good: Semantic class names -->
<div class="color-preview-large"></div>

<!-- ❌ Avoid: Utility-only classes -->
<div class="w-72 h-72 rounded-full"></div>
```

### General Rules
- **Use meaningful variable names** – `colorHex` not `ch`
- **Comment the "why"** – Not the "what"
- **Keep functions small** – One responsibility per function
- **No external dependencies** – Keep the bundle tiny

---

## 🧪 Testing Your Changes

### Manual Testing Checklist
- [ ] Plugin loads without errors
- [ ] Selecting a layer shows color values
- [ ] Clicking a color format copies to clipboard
- [ ] Empty state shows when no layer is selected
- [ ] Onboarding appears for first-time users
- [ ] Feedback form submits successfully (if backend is set up)

### Build Verification
```bash
# Make sure it compiles
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

---

## 📤 Submitting a Pull Request

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add color history feature"
   ```
   
   Use conventional commits:
   - `feat:` – New feature
   - `fix:` – Bug fix
   - `docs:` – Documentation only
   - `style:` – Code formatting
   - `refactor:` – Code restructuring

2. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request**
   - Go to the original repo on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template (if available)

4. **Wait for review**
   - We'll review your PR as soon as possible
   - We may suggest changes – don't take it personally!
   - Once approved, we'll merge it 🎉

---

## 🚫 What We Won't Accept

- Breaking changes without discussion
- Adding heavy dependencies (React, Vue, etc.)
- Code that significantly increases bundle size
- Features that compromise beginner-friendliness

---

## 💡 Need Help?

- **Stuck on something?** Open a discussion on GitHub
- **Not sure where to start?** Look for issues labeled `good first issue`
- **Want to pair program?** Reach out on Twitter

---

## 📜 Code of Conduct

Be kind. Be respectful. We're all here to learn and build cool stuff together.

---

Thank you for contributing! 🙌
