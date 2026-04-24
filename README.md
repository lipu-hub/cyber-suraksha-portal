# CyberSuraksha Portal 🛡️
**Cybersecurity Portal for Indian Citizens — Digital India Initiative**

---

## 📁 File Structure

```
CyberSuraksha/
├── App.js                    ← Main router + global layout
├── package.json              ← Dependencies
├── README.md                 ← This file
├── components/
│   ├── Navbar.js             ← Navigation bar
│   └── Footer.js             ← Site footer
└── pages/
    ├── Home.js               ← Hero, alert ticker, feature cards
    ├── Scanner.js            ← URL safety scanner
    ├── Complain.js           ← Multi-step complaint form
    └── Info.js               ← Cyber crime accordion/FAQ
```

---

## 🚀 Setup Instructions

### 1. Create a new React app
```bash
npx create-react-app cybersuraksha
cd cybersuraksha
```

### 2. Install dependencies
```bash
npm install framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Configure Tailwind CSS
In `tailwind.config.js`:
```js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

In `src/index.css` (top of file):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 4. Copy the files
Place the downloaded files into your `src/` folder:
```
src/
├── App.js
├── components/
│   ├── Navbar.js
│   └── Footer.js
└── pages/
    ├── Home.js
    ├── Scanner.js
    ├── Complain.js
    └── Info.js
```

### 5. Run the app
```bash
npm start
```

---

## 🎨 Tech Stack
| Tool | Purpose |
|------|---------|
| React 18 | UI Framework |
| Tailwind CSS | All styling (no extra CSS files) |
| Framer Motion | Animations (hover, fade-in, loading) |
| Lucide React | Icons throughout |

## 🌈 Theme Colors
- **Navy Blue** `#1e3a5f` — Authority elements, headers, buttons
- **Saffron Orange** `#f97316` — CTAs, Digital India accents
- **White / Light Grey** — Backgrounds (never black)

## 📞 Emergency
Cyber Crime Helpline: **1930** (24×7 Toll Free)
Official Portal: **cybercrime.gov.in**
