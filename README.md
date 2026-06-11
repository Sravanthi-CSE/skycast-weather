# 🌤️ SkyCast | Professional Weather Insights

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer-motion&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenWeatherMap_API-ff9800?style=for-the-badge&logo=openweathermap&logoColor=white" />
</p>

<p align="center">
  <strong>A high-performance, aesthetically pleasing weather application featuring real-time data, 5-day forecasts, and a modern glassmorphism UI.</strong>
</p>

<p align="center">
  <a href="YOUR_DEPLOYED_LINK_HERE"><strong>View Live Demo »</strong></a>
  <br />
  <a href="https://github.com/Sravanthi-CSE/skycast-weather-app/issues">Report Bug</a>
  ·
  <a href="https://github.com/Sravanthi-CSE/skycast-weather-app/issues">Request Feature</a>
</p>

---

## 🌟 Overview

**SkyCast** is not just a weather app; it's a study in modern UI/UX. Designed for a software engineering portfolio, it focuses on clean architecture, responsive design, and seamless user experience. It provides hyper-local weather data and a detailed outlook for the week ahead, all wrapped in a professional glassmorphism aesthetic.

## ✨ Key Features

### 🎨 Design Excellence
- **Glassmorphism UI**: Utilizes frosted-glass effects, backdrop blurs, and subtle borders for a premium feel.
- **Dynamic Theming**: Full support for **Dark Mode** and **Light Mode** to ensure accessibility in all lighting.
- **Fluid Animations**: Powered by `Framer Motion` for smooth transitions and interactive hover effects.
- **Fully Responsive**: Optimized for every screen size from a 5-inch smartphone to a 32-inch monitor.

### ⚙️ Technical Functionality
- **Real-Time Data**: Fetches current weather (Temp, Humidity, Wind, Pressure) via the OpenWeatherMap API.
- **5-Day Forecast**: Predictive analytics showing a daily summary for the next 5 days.
- **Smart Location**: Integrated **Geolocation API** to detect and display the user's local weather automatically on load.
- **Custom API Integration**: A secure **Settings Modal** allows users to input their own API key, which is persisted using `localStorage`.
- **Search History**: Keeps track of recently searched cities for faster navigation.
- **Unit Switching**: Toggle instantly between Metric (°C) and Imperial (°F) systems.

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js | Component-based architecture |
| **Build Tool** | Vite | Ultra-fast HMR and optimized bundling |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Animations** | Framer Motion | High-fidelity UI transitions |
| **Icons** | Lucide React | Consistent, professional iconography |
| **Date Logic** | date-fns | Precise date formatting and manipulation |
| **Data Source** | OpenWeather API | Real-time global weather data |

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Sravanthi-CSE/skycast-weather-app.git
cd skycast-weather-app
