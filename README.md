# Aerisly - Smart Weather Dashboard 🌤️

A modern and responsive weather dashboard built with **React, TypeScript, Vite, and Tailwind CSS**.

Aerisly provides current weather information, forecasts, air quality, weather insights, activity recommendations, and location management through a clean and responsive interface.

---

## ✨ Features

 🌡️ **Current Weather**
  - Current temperature
  - Weather condition
  - Feels-like temperature
  - Humidity
  - Wind speed
  - UV index
  - Visibility

 📅 **5-Day Weather Forecast**
  - Daily weather conditions
  - Temperature information
  - Weather icons

 📈 **Hourly Weather**
  - Hourly temperature information
  - Rain/weather indicators

 🌫️ **Air Quality**
  - Air quality information
  - Air Quality monitoring with US AQI and pollutant levels
  - Pollutant-based data

 💡 **Smart Weather Insights**
  - Weather-based insights and useful information

 🏃 **Activity Recommendations**
  - Weather-based activity suggestions
  - Activity suitability scores

 📍 **Location Management**
  - Search for cities
  - Current location detection
  - Save frequently used locations
  - Remove saved locations
  - Saved locations automatically expire after 15 days

 ⚙️ **Settings**
  - Temperature unit: Celsius / Fahrenheit
  - Wind speed unit: km/h / mph

 🌓 **Responsive UI & Theme**
  - Responsive design for different screen sizes
  - Weather-based visual themes
  - Light/dark interface support

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
- Open-Meteo Geocoding API
- OpenStreetMap Nominatim API
- Browser Geolocation API

### Development

- npm
- ESLint
- Git
- GitHub

---

## 📁 Project Structure

```text
Aerisly/
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
│   │   ├── SettingsPage.tsx
│   │   ├── SmartWeatherInsights.tsx
│   │   ├── TemperatureChart.tsx
│   │   ├── WeatherSkeleton.tsx
│   │   └── WeatherStatCard.tsx
│   │
│   ├── constants/
│   ├── hooks/
│   ├── pages/
│   │
│   ├── services/
│   │   ├── airQualityApi.ts
│   │   ├── geocodingApi.ts
│   │   ├── location.ts
│   │   └── weatherApi.ts
│   │
│   ├── themes/
│   ├── types/
│   ├── utils/
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── README.md

```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/RidhamShah23/Weather-Dashboard.git
```

### 2. Navigate to the project

```bash
cd Aerisly
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

---

## 🏗️ Production Build

```bash
npm run build
```

```bash
npm run preview
```

---

## 🌐 APIs

Aerisly uses the following services:

### Open-Meteo

Weather data is retrieved from the [Open-Meteo](https://open-meteo.com/) API.

The application uses weather information such as:

- Temperature
- Humidity
- Wind speed
- UV index
- Visibility
- Hourly weather
- Daily forecast

Air quality information is retrieved through the [Open-Meteo Air Quality API](https://open-meteo.com/en/docs/air-quality-api).

Weather data is provided by Open-Meteo.

---

## 📍 Location Handling

Aerisly supports location-based weather searches through:

- City search
- Browser geolocation
- Saved locations

---

## 🎨 UI & Design

Aerisly uses a responsive dashboard layout designed to provide weather information at a glance.

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

### `services/`

Contains API-related logic.

### `utils/`

Contains utility functions responsible for transforming API responses into application-friendly data.

### `types/`

Contains shared TypeScript types used throughout the application.

### `constants/`

Contains static application data such as activity definitions.

---

## 👨‍💻 Author

**RIDHAM SHAH**

- GitHub: `https://github.com/RidhamShah23`
- LinkedIn: `https://www.linkedin.com/in/ridham-shah-825561285`

---

## 📄 License

This project is available for educational and personal use.