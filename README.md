# 🌐 AIS Fibre Router Admin — Modded UI

> A beautiful, modern dark-theme reimagining of the AIS Fibre (ZTE F6107A) router admin interface — hosted on GitHub Pages and fully functional when connected to your home network.

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge&logo=github)](https://ltnproject.github.io/ais-fibre-modded-ui/)
[![License](https://img.shields.io/badge/License-LtnProject%20OSL-blue?style=for-the-badge)](#license)
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-orange?style=for-the-badge)]()

---

## ✨ Features

- 🎨 **Dark glassmorphism UI** — premium look replacing the stock router interface
- 🔐 **Full login support** — session token fetching, RSA password encryption, captcha
- 🌐 **GitHub Pages hosted** — open from any browser while on your AIS Fibre Wi-Fi
- 📡 **Controls the real router** — all API calls proxy to `192.168.1.1`
- 📱 **Responsive** — works on mobile and desktop
- ⚡ **Instant** — no build tools, pure HTML/CSS/JS

---

## 🚀 How to Use

1. Connect your device to your **AIS Fibre Wi-Fi**
2. Open the GitHub Pages link: [https://ltnproject.github.io/ais-fibre-modded-ui/](https://ltnproject.github.io/ais-fibre-modded-ui/)
3. Sign in with your router credentials (default: `admin` / `admin`)
4. You're in! ✅

> **Note:** This only works when you are on the **same local network** as your router (`192.168.1.1`). It will not work over mobile data or a different Wi-Fi.

---

## 📁 Folder Structure

```
ais-fibre-modded-ui/
├── index.html          ← Redesigned login page
├── css/                ← Fonts & styles (AIS/Thai fonts)
├── fonts/              ← Web fonts
├── img/                ← Router UI images & AIS branding
├── jquery/             ← Router JS libraries (common_lib, crypto-js, etc.)
├── README.md           ← This file
└── LICENSE             ← LtnProject Open Source License
```

---

## 🛠 For Developers — Forking & Modding

This project is **open source** and you're welcome to fork, modify, and build upon it.

### ⚠️ REQUIRED: Credit LtnProject

If you **fork, mod, redistribute, or build upon** this project in any way, you **MUST**:

1. **Credit `LtnProject`** visibly in your project (README, footer, or about page)
2. **Link back** to this repository: `https://github.com/ltnproject/ais-fibre-modded-ui`
3. **Keep the credit note** intact in your fork's README

Failure to credit LtnProject is a violation of the [LtnProject Open Source License](#license).

### Quick Start for Devs

```bash
git clone https://github.com/ltnproject/ais-fibre-modded-ui.git
cd ais-fibre-modded-ui
# Edit index.html to change ROUTER_BASE if your router IP is different
# Open index.html in a browser (must be on same network as router)
```

To change the router IP:
```js
// In index.html, line ~17:
var ROUTER_BASE = "http://192.168.1.1"; // ← change this
```

---

## 📜 License

**LtnProject Open Source License (LPOSL) v1.0**

See [LICENSE](./LICENSE) for full text.

**TL;DR:**
- ✅ Free to use, fork, modify, and distribute
- ✅ Commercial use allowed
- ❌ Cannot remove or hide credit to **LtnProject**
- ❌ Cannot claim this work as originally yours without attribution

---

## 👤 Author

**LtnProject**
- GitHub: [@ltnproject](https://github.com/ltnproject)

---

<sub>This project is not affiliated with AIS, ZTE, or any router manufacturer. Use at your own risk.</sub>
