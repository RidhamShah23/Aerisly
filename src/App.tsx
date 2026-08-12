import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import { useState } from "react";
import { weatherThemes } from "./themes/weatherThemes";

import type {
  CurrentWeather as CurrentWeatherType,
  WeatherCondition,
  ForecastDay,
  Activity,
} from "./types/weather";
import {
  Drop,
  Wind,
  Sun,
} from "@phosphor-icons/react";
import WeatherStatCard from "./components/WeatherStatCard";
import ForecastCard from "./components/ForecastCard";
import TemperatureChart from "./components/TemperatureChart";
import type { RainForecast } from "./types/weather";
import RainTimeline from "./components/RainTimeline";
import {
  calculateActivityScore,
} from "./utils/activityUtils";

import ActivityRecommendation from "./components/ActivityRecommendation";

const weather: CurrentWeatherType = {
  city: "Ahmedabad",
  temperature: 32,
  condition: "Clear Sky",
  feelsLike: 35,
  humidity: 55,
  windSpeed: 12,
  uvIndex: 6,
};
const forecast: ForecastDay[] = [
  {
    day: "Mon",
    condition: "sunny",
    high: 32,
    low: 24,
  },
  {
    day: "Tue",
    condition: "rainy",
    high: 29,
    low: 22,
  },
  {
    day: "Wed",
    condition: "cloudy",
    high: 30,
    low: 23,
  },
  {
    day: "Thu",
    condition: "sunny",
    high: 33,
    low: 25,
  },
  {
    day: "Fri",
    condition: "cloudy",
    high: 31,
    low: 24,
  },
];

const rainForecast: RainForecast[] = [
  {
    time: "Now",
    probability: 5,
  },
  {
    time: "30 min",
    probability: 12,
  },
  {
    time: "60 min",
    probability: 58,
  },
  {
    time: "90 min",
    probability: 82,
  },
  {
    time: "120 min",
    probability: 74,
  },
];

const activities: Activity[] = [
  {
    name: "Running",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Walking",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Cycling",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Picnic",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Indoor Movie",
    type: "indoor",
    score: 0,
  },
];

function App() {
  const [condition, setCondition] = useState<WeatherCondition>("sunny");
  const theme = weatherThemes[condition];
  const activityWeather = {
  temperature: weather.temperature,
  humidity: weather.humidity,
  rainProbability: 10,
  windSpeed: weather.windSpeed,
  uvIndex: weather.uvIndex,
};

const scoredActivities = activities.map((activity) => ({
  ...activity,
  score: calculateActivityScore(
    activity,
    activityWeather
  ),
}));
  return (
   <div
  className="flex min-h-screen transition-colors duration-500"
  style={{
    backgroundColor: theme.background,
    color: theme.text,
  }}
>
      <Sidebar theme={theme}/>

<main className="flex-1 p-8">
          <Header theme={theme}/>
        <div className="mt-8">
          <CurrentWeather weather={weather} theme={theme} />
          <div className="mt-6 grid grid-cols-3 gap-5">
  <WeatherStatCard
    icon={Drop}
    label="Humidity"
    value={`${weather.humidity}%`}
    description="Normal"
    theme={theme}
  />

  <WeatherStatCard
    icon={Wind}
    label="Wind Speed"
    value={`${weather.windSpeed} km/h`}
    description="Moderate"
    theme={theme}
  />

  <WeatherStatCard
    icon={Sun}
    label="UV Index"
    value={String(weather.uvIndex)}
    description="High"
    theme={theme}
  />
</div>
<div className="mt-8">
  <h3
    className="mb-4 text-xl font-semibold"
    style={{ color: theme.text }}
  >
    5-Day Forecast
  </h3>

  <div className="grid grid-cols-5 gap-4">
    {forecast.map((day) => (
      <ForecastCard
        key={day.day}
        forecast={day}
        theme={theme}
      />
    ))}
  </div>
  <div className="mt-8">
  <TemperatureChart theme={theme} />
</div>
<div className="mt-8">
  <RainTimeline
    forecast={rainForecast}
    theme={theme}
  />
</div>
<div className="mt-8">
  <ActivityRecommendation
    activities={scoredActivities}
    theme={theme}
  />
</div>
</div>
        </div>
        <div className="mt-6">
  <button
    onClick={() => setCondition("rainy")}
    className="rounded-xl bg-blue-500 px-5 py-3 text-white"
  >
    Test Rainy Theme
  </button>
</div>
      </main>
    </div>
  );
}

export default App;