# HOC Super App — Official Website

> **Building the next-generation mobile platform for everyone.**  
> AI-powered. Globally accessible. Financially empowering.

---

## Overview

This repository contains the source code for the official **HOC Super App** landing page, hosted via [GitHub Pages](https://pages.github.com/).

The site presents the HOC project — an AI-powered super application currently under development for Android and iOS — along with its inventor, roadmap, and core features.

---

## Project Structure

```
hoc-website/
├── css/
│   └── style.css          # All styles — dark futuristic theme
├── images/
│   ├── hero.jpg            # Hero section background image
│   └── logo.png            # HOC brand logo
├── js/
│   └── script.js           # Loader, particles, scroll reveal, counters, form UX
├── .gitignore
├── README.md
├── favicon.ico             # Browser tab icon
└── index.html              # Main HTML entry point
```

---

## Features

- **Dark Futuristic Design** — Deep navy/black palette with electric cyan and violet accents, grounded in color psychology for trust, innovation, and action.
- **Animated Particle Canvas** — Interactive WebGL-inspired particle network rendered on `<canvas>`.
- **Scroll Reveal Animations** — Elements animate into view using the Intersection Observer API.
- **Animated Counters** — Statistics count up when scrolled into view.
- **Responsive Layout** — Fully mobile-first, works on all screen sizes.
- **Sticky Navbar** — Shrinks and blurs on scroll; active section highlighting.
- **Contact Form UX** — Real-time validation, loading state, success feedback, and toast notifications.
- **Zero Dependencies** — Pure HTML, CSS, and vanilla JavaScript. No frameworks, no build tools.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/hosein-moghadam/hosein-moghadam.github.io.git
cd hosein-moghadam.github.io
```

### 2. Add Your Images

Place your images in the `images/` folder:

| File         | Recommended Size | Description                        |
|--------------|------------------|------------------------------------|
| `hero.jpg`   | 1920 × 1080 px   | Hero section background            |
| `logo.png`   | 200 × 200 px     | Brand logo (transparent PNG ideal) |

### 3. Deploy to GitHub Pages

1. Push all files to the `main` branch of your repository named `hosein-moghadam.github.io`.
2. Go to **Settings → Pages → Source → main branch → / (root)**.
3. Your site will be live at: `https://hosein-moghadam.github.io`

---

## Customization

| What to Change          | Where                              |
|-------------------------|------------------------------------|
| Colors / theme          | `css/style.css` → `:root` variables |
| Content / text          | `index.html`                       |
| Animations / behavior   | `js/script.js`                     |
| Particle settings       | `js/script.js` → `CONFIG` object   |
| Fonts                   | `index.html` → Google Fonts link   |

---

## Author

**Hossein Sadeghghol Moghadam**  
Inventor · Innovator · Developer  
GitHub: [@hosein-moghadam](https://github.com/hosein-moghadam)

---

## License

© 2025 HOC Super App. All rights reserved.
