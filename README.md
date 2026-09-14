# Weatherly 🌤️

A modern and responsive weather dashboard built with **React, TypeScript, Vite, and Tailwind CSS**.

Weatherly provides current weather information, forecasts, air quality, weather insights, activity recommendations, and location management through a clean and responsive interface.

---

## ✨ Features

- 🌡️ **Current Weather**
  - Current temperature
  - Weather condition
  - Feels-like temperature
  - Humidity
  - Wind speed
  - UV index
  - Visibility
  - Sunrise and sunset

- 📅 **5-Day Weather Forecast**
  - Daily weather conditions
  - Temperature information
  - Weather icons

- 📈 **Hourly Weather**
  - Hourly temperature information
  - Rain/weather indicators

- 🌫️ **Air Quality**
  - Air quality information
  - Indian AQI-based categories
  - Pollutant-based data

- 💡 **Smart Weather Insights**
  - Weather-based insights and useful information

- 🏃 **Activity Recommendations**
  - Weather-based activity suggestions
  - Activity suitability scores

- 📍 **Location Management**
  - Search for cities
  - Current location detection
  - Save frequently used locations
  - Remove saved locations
  - Saved locations automatically expire after 15 days

- ⚙️ **Settings**
  - Temperature unit: Celsius / Fahrenheit
  - Wind speed unit: km/h / mph

- 🌓 **Responsive UI & Theme**
  - Responsive design for different screen sizes
  - Weather-based visual themes
  - Light/dark interface support

- 🔀 **Client-Side Routing**
  - Dashboard
  - Locations
  - Settings
  - Custom 404 page

---

## 🛠️ Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

### APIs & Data

- Open-Meteo Weather API
- Open-Meteo Air Quality API
- Browser Geolocation API
- LocalStorage

### Development

- npm
- ESLint
- Git
- GitHub

---

## 📁 Project Structure

```text
Weatherly/
├── public/
│
├── src/
│   ├── components/
│   │   ├── ActivityRecommendation.tsx
│   │   ├── AirQuality.tsx
│   │   ├── CurrentWeather.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ForecastCard.tsx
│   │   ├── Header.tsx
│   │   ├── LocationsPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── SettingsPage.tsx
│   │   ├── SmartWeatherInsights.tsx
│   │   ├── SunCard.tsx
│   │   ├── TemperatureChart.tsx
│   │   └── WeatherStatCard.tsx
│   │
│   ├── constants/
│   │   └── activities.ts
│   │
│   ├── hooks/
│   │   └── useWeather.ts
│   │
│   ├── services/
│   │   ├── airQualityApi.ts
│   │   └── weatherApi.ts
│   │
│   ├── types/
│   │   └── weather.ts
│   │
│   ├── utils/
│   │   └── weatherUtils.ts
│   │
│   ├── App.tsx
│   └── main.tsx
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RidhamShah23/Weather-Dashboard.git
```

### 2. Navigate to the project

```bash
cd Weatherly
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

---

## 🏗️ Production Build

Create an optimized production build with:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🌐 APIs

Weatherly uses the following services:

### Open-Meteo

Weather data is retrieved from the Open-Meteo API.

The application uses weather information such as:

- Temperature
- Humidity
- Wind speed
- UV index
- Visibility
- Sunrise/sunset
- Hourly weather
- Daily forecast

Air quality information is retrieved through the Open-Meteo Air Quality API.

---

## 📍 Location Handling

Weatherly supports location-based weather searches through:

- City search
- Browser geolocation
- Saved locations

---

## 🎨 UI & Design

Weatherly uses a responsive dashboard layout designed to provide weather information at a glance.

The interface includes:

- Responsive layouts
- Weather-based themes
- Modern card-based UI
- Lucide outline icons
- Responsive navigation
- Mobile-friendly layouts

---

## 🧠 Architecture

The project follows a component-based React architecture.

### `components/`

Contains reusable UI components and application pages.

### `hooks/`

Contains custom React hooks for managing application logic.

For example, `useWeather.ts` handles:

- Weather API requests
- Air quality requests
- Weather state
- Loading state
- Error state
- Weather data transformation flow

### `services/`

Contains API-related logic.

### `utils/`

Contains utility functions responsible for transforming API responses into application-friendly data.

### `types/`

Contains shared TypeScript types used throughout the application.

### `constants/`

Contains static application data such as activity definitions.

---

## 🎯 Learning Goals

This project was built to practice and demonstrate:

- React fundamentals
- TypeScript
- React Hooks
- Custom Hooks
- Component architecture
- API integration
- Async JavaScript
- State management
- LocalStorage
- Client-side routing
- Responsive UI development
- Tailwind CSS
- Error and loading state handling
- Git and GitHub workflow

---

## 👨‍💻 Author

**Your Name**

- GitHub: `https://github.com/RidhamShah23`
- LinkedIn: `https://www.linkedin.com/in/ridham-shah-825561285`

---

## 📄 License

This project is available for educational and personal use.