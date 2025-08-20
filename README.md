<div align="center">

# 🎯 FocusMate

### *Your Ultimate Deep Work Companion*

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.10-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0.0-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

*A modern, dark-themed productivity web app designed to help you achieve deep work through structured focus sessions, task management, and insightful analytics.*

[🚀 Live Demo](#) • [📖 Documentation](#getting-started) • [🐛 Report Bug](#) • [💡 Request Feature](#)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful UI/UX**
- 🌙 **Dark-first design** with calming gradients
- ✨ **Smooth animations** powered by Framer Motion
- 📱 **Fully responsive** across all devices
- 🎯 **Accessibility-focused** with ARIA labels

</td>
<td width="50%">

### ⏰ **Smart Pomodoro Timer**
- 🍅 **25/5 minute cycles** (Focus/Break)
- 🔔 **Browser notifications** with audio chimes
- 💾 **Persistent state** in localStorage
- 📊 **Session tracking** and streaks

</td>
</tr>
<tr>
<td width="50%">

### ✅ **Task Management**
- 📝 **CRUD operations** for tasks
- 🏷️ **Priority levels** and status tracking
- 🔍 **Smart filtering** and organization
- 📈 **Task analytics** and insights

</td>
<td width="50%">

### 📊 **Analytics Dashboard**
- 📈 **Interactive charts** with Recharts
- ⏱️ **Focus time tracking**
- 🎯 **Progress visualization**
- 📤 **Data export** functionality

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Frontend | Styling | Animation | Charts | Tools |
|----------|---------|-----------|--------|-------|
| ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white) | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white) | ![Recharts](https://img.shields.io/badge/Recharts-FF6B6B?style=flat&logo=chart.js&logoColor=white) | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) |
| ![Router](https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white) | ![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=flat&logo=postcss&logoColor=white) | ![Lucide](https://img.shields.io/badge/Lucide-000000?style=flat&logo=lucide&logoColor=white) | | ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) | | ![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=flat&logo=react&logoColor=white) | | ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white) |

</div>

---

## 🏗️ Project Structure

```
🎯 Focus Mate/
├── 📁 frontend/
│   ├── 📄 index.html
│   ├── 📦 package.json
│   ├── ⚙️ vite.config.js
│   ├── 🎨 tailwind.config.cjs
│   ├── 📁 public/
│   │   └── 🖼️ favicon.ico
│   └── 📁 src/
│       ├── 🚀 main.jsx
│       ├── 🎯 App.jsx
│       ├── 🎨 index.css
│       ├── 📁 context/
│       │   ├── 🔐 AuthContext.jsx
│       │   └── 🎨 ThemeContext.jsx
│       ├── 📁 utils/
│       │   ├── 🌐 api.js
│       │   └── 🔔 notify.js
│       ├── 📁 components/
│       │   ├── 📊 Dashboard.jsx
│       │   ├── 🎛️ TopControls.jsx
│       │   ├── 🧭 Navbar.jsx
│       │   ├── 🦸 HeroSection.jsx
│       │   ├── 🎴 FeatureCard.jsx
│       │   ├── 🎯 FocusMateDashboard.jsx
│       │   ├── 🌈 GradientButton.jsx
│       │   └── 📝 SignupModal.jsx
│       └── 📁 pages/
│           ├── 🏠 Landing.jsx
│           ├── 📊 Dashboard.jsx
│           ├── ⏰ Timer.jsx
│           ├── ✅ Tasks.jsx
│           ├── 📈 Analytics.jsx
│           ├── 🔐 AuthJoin.jsx
│           └── 👥 TeamFocusRoom.jsx
└── 📖 README.md
```

---

## 🚀 Getting Started

### 📋 Prerequisites

- 📦 **Node.js** 18+ 
- 🔧 **npm** or **yarn**

### ⚡ Quick Start

```bash
# 📥 Clone the repository
git clone https://github.com/yourusername/focusmate.git

# 📂 Navigate to frontend directory
cd "Focus Mate/frontend"

# 📦 Install dependencies
npm install

# 🚀 Start development server
npm run dev

# 🌐 Open http://localhost:5173 in your browser
```

### 🏗️ Build for Production

```bash
# 🔨 Build the project
npm run build

# 👀 Preview production build
npm run preview
```

---

## 📜 Available Scripts

| Command | Description | Icon |
|---------|-------------|------|
| `npm run dev` | Start Vite development server | 🚀 |
| `npm run build` | Build production assets | 🔨 |
| `npm run preview` | Preview production build | 👀 |
| `npm run lint` | Lint codebase with ESLint | 🔍 |

---

## 🗺️ Application Routes

| Route | Component | Description | Icon |
|-------|-----------|-------------|------|
| `/` | Landing | Marketing hero + features | 🏠 |
| `/dashboard` | Dashboard | Main stats & quick actions | 📊 |
| `/timer` | Timer | Pomodoro interface | ⏰ |
| `/tasks` | Tasks | Task management CRUD | ✅ |
| `/analytics` | Analytics | Charts & insights | 📈 |
| `/join` | AuthJoin | Login/Signup forms | 🔐 |
| `/team-room` | TeamFocusRoom | Team collaboration | 👥 |

---

## 🎨 Design System

### 🌙 Dark Theme Colors
```css
--page-bg: #07070a      /* Deep space black */
--page-fg: #ffffff      /* Pure white text */
--panel-bg: #0b0b0d     /* Panel background */
--grad-start: #6B8CFF   /* Gradient start (blue) */
--grad-end: #B776FF     /* Gradient end (purple) */
```

### ✨ Key Features
- 🎭 **CSS Variables** for consistent theming
- 🌊 **Gradient blobs** for visual appeal
- ⭐ **Floating dots** animation
- 🎯 **Focus rings** for accessibility
- 📱 **Mobile-first** responsive design

---

## 🔔 Notifications & Audio

- 🔔 **Browser Notifications API** integration
- 🎵 **WebAudio-generated chimes** (no audio files needed)
- ⏰ **Timer alerts** on session transitions
- 🎛️ **User-controlled** notification preferences

---

## 💾 State Management

### 🔐 Authentication
- `AuthContext.jsx` provides mock authentication
- 👤 User session management (frontend-only)
- 🔄 Ready for backend integration

### ⏰ Timer State
- 💾 **localStorage** persistence (`focusmate_timer_state_v1`)
- 🔄 **Auto-transitions** between Focus (25m) and Break (5m)
- 📊 **Session tracking** and statistics

### ✅ Tasks
- 🧠 **In-memory** storage (ready for backend)
- 🏷️ **Priority levels** and status management
- 🔍 **Filtering** and organization features

---

## 📊 Analytics Features

- 📈 **Recharts integration** (Bar, Line, Pie charts)
- 🔄 **Live data simulation** with intervals
- 📤 **JSON export** functionality
- 📊 **Focus time visualization**
- 🎯 **Progress tracking**

---

## 🧪 Code Quality

### 🔍 Linting & Formatting
- ✅ **ESLint** with React plugins
- 🎨 **Prettier** for code formatting
- 🔧 **eslint-config-prettier** integration

### 📏 Standards
- 🎯 **React Hooks** best practices
- ♿ **Accessibility** guidelines
- 📱 **Responsive** design patterns

---

## 🚀 Deployment

### 📦 Build Output
```bash
npm run build  # Creates frontend/dist/
```

### 🌐 Hosting Options
- 🔥 **Netlify** - Drag & drop deployment
- ⚡ **Vercel** - Git integration
- 📄 **GitHub Pages** - Free static hosting
- 🔥 **Firebase Hosting** - Google's platform
- ☁️ **AWS S3 + CloudFront** - Scalable solution

### 🔧 Environment Variables
```bash
VITE_API_BASE_URL=https://your-api.com
```

---

## 🗺️ Roadmap

### 🔜 Coming Soon
- [ ] 🔐 **JWT Authentication** with protected routes
- [ ] 💾 **Backend Integration** for data persistence
- [ ] 👥 **Real-time Team Rooms** with WebSocket
- [ ] 📱 **PWA Support** with offline capabilities
- [ ] 🌅 **Light Theme** toggle option

### 🎯 Future Features
- [ ] 🏆 **Achievement System** and badges
- [ ] 📊 **Advanced Analytics** with CSV/PNG export
- [ ] 🔔 **Push Notifications** for mobile
- [ ] 🎵 **Custom Audio** themes
- [ ] 🌍 **Multi-language** support
- [ ] 🔗 **Third-party Integrations** (Spotify, Slack)

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🐛 Found a Bug?
[Report it here](https://github.com/yourusername/focusmate/issues)

### 💡 Have an Idea?
[Share it with us](https://github.com/yourusername/focusmate/discussions)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Star this repo if you found it helpful!

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

[⬆ Back to Top](#-focusmate)

</div>
