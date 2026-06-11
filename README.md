# SkyCast — Real-time Weather Intelligence

A modern, professional, fully responsive Weather Application built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Designed with glassmorphism UI, smooth Framer Motion animations, and real-time weather data integration via OpenWeatherMap API.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

---

## Live Demo

**[View Live Demo](https://sravanthi-cse.github.io/skycast-weather)** *(Update this link after deploying)*

---

## Features

### Core Features
- **City Search** — Search weather by city name with autocomplete suggestions
- **Current Weather** — Display temperature, condition, humidity, wind speed, pressure, feels-like, and visibility
- **5-Day Forecast** — Beautiful forecast cards with daily summaries
- **Geolocation** — Auto-detect user's location for instant weather
- **Recent Searches** — Quick access to previously searched cities

### UI/UX Features
- **Glassmorphism Design** — Modern frosted-glass aesthetic with backdrop blur
- **Dynamic Themes** — Light/Dark mode toggle with system preference support
- **Dynamic Backgrounds** — Background gradient changes based on weather condition
- **Temperature Units** — Toggle between Celsius (°C) and Fahrenheit (°F)
- **Smooth Animations** — Framer Motion powered entrance and hover animations
- **Responsive Design** — Fully mobile-friendly, works on all screen sizes
- **Loading States** — Elegant loading animations while fetching data
- **Error Handling** — User-friendly error messages with dismiss option

### Technical Features
- **TypeScript** — Fully typed for better developer experience and fewer bugs
- **Custom Hooks** — Reusable `useWeather`, `useTheme`, `useTemperature`, and `useLocalStorage` hooks
- **Mock Data Fallback** — Realistic demo data when no API key is configured
- **Local Storage** — Persist recent searches, theme, unit preferences, and API key
- **OpenWeatherMap API** — Real-time weather data integration

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 19 | UI Library |
| TypeScript | Type Safety |
| Vite | Build Tool |
| Tailwind CSS v4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |
| OpenWeatherMap API | Weather Data |

---

## Screenshots

*(Add screenshots of your app here after deployment)*

| Light Mode | Dark Mode |
|-----------|-----------|
| *(screenshot)* | *(screenshot)* |

---

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- OpenWeatherMap API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sravanthi-CSE/skycast-weather.git
   cd skycast-weather
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### API Key Setup

The app includes a built-in settings panel for configuring your API key:

1. Click the **settings (gear) icon** in the header
2. Enter your OpenWeatherMap API key
3. Click **Save Key** — the app will refresh with live data

> **Get a free API key** at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up)
>
> **Note:** New API keys may take 10-15 minutes to activate after creation.

---

## Project Structure

```
skycast-weather/
├── public/                  # Static assets
├── src/
│   ├── components/          # React components
│   │   ├── SearchBar.tsx    # City search with recent searches
│   │   ├── CurrentWeather.tsx # Main weather display
│   │   ├── Forecast.tsx     # 5-day forecast cards
│   │   ├── Header.tsx       # App header with controls
│   │   ├── Footer.tsx       # App footer
│   │   ├── ErrorMessage.tsx # Error display
│   │   └── ApiKeyModal.tsx  # API key configuration
│   ├── hooks/               # Custom React hooks
│   │   ├── useWeather.ts    # Weather data fetching
│   │   ├── useTheme.ts      # Dark/light mode
│   │   └── useLocalStorage.ts # Local storage persistence
│   ├── types/               # TypeScript type definitions
│   │   └── weather.ts       # Weather data types
│   ├── utils/               # Utility functions
│   │   ├── weatherIcons.ts  # Icon mapping & helpers
│   │   ├── mockData.ts      # Demo data
│   │   └── cn.ts            # Tailwind class merging
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .gitignore
└── README.md
```

---

## API Integration

The app integrates with the **OpenWeatherMap API** using the following endpoints:

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Error Handling
- Network errors are caught and displayed with user-friendly messages
- Invalid city names show "City not found" error
- Geolocation failures gracefully fallback to default city
- Invalid API keys show specific guidance to fix the issue
- API rate limits are handled with retry suggestions

---

## Performance

- Lazy loading of forecast data
- Memoized temperature conversions
- Debounced search input
- Optimized re-renders with React best practices
- Small bundle size with tree-shaking

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## License

MIT License — feel free to use this project for your portfolio or personal use.

---

## Author

**Sravanthi** — B.Tech CSE Final Year Student

- GitHub: [@Sravanthi-CSE](https://github.com/Sravanthi-CSE)
- Project: [SkyCast Weather](https://github.com/Sravanthi-CSE/skycast-weather)

---

*Built with passion for clean code and beautiful design.*
