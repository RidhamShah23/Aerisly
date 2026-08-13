import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import { useState } from "react";
import { weatherThemes } from "./themes/weatherThemes";

import type {
  CurrentWeather as CurrentWeatherType,
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
import AirQuality from "./components/AirQuality";

import type {
  AirQuality as AirQualityType,
} from "./types/weather";

import type { LocationResult } from "./services/geocodingApi";
import { getWeather } from "./services/weatherApi";
import {
  mapCurrentWeather,
  mapForecast,
} from "./utils/weatherUtils";


const airQuality: AirQualityType = {
  aqi: 42,
  pm25: 12,
  pm10: 24,
  ozone: 38,
  nitrogenDioxide: 18,
};


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
  const [weather,setweather]=
useState<CurrentWeatherType>({
  city: "Ahmedabad",
  temperature: 32,
  condition: "sunny",
  feelsLike: 35,
  humidity: 55,
  windSpeed: 12,
  uvIndex: 6,
});
const [forecast, setForecast] =
  useState<ForecastDay[]>([]);


const theme = weatherThemes[weather.condition];
  const activityWeather = {
  temperature: weather.temperature,
  humidity: weather.humidity,
  rainProbability: 10,
  windSpeed: weather.windSpeed,
  uvIndex: weather.uvIndex,
  
};
const handleCitySelect = async (
  location: LocationResult
) => {
  try {
    const data = await getWeather(
      location.latitude,
      location.longitude
    );

    const currentWeather = mapCurrentWeather(
      data,
      location.name
    );

    setweather(currentWeather);

    const currentForecast = mapForecast(data);

    setweather(currentWeather);
    setForecast(currentForecast);
    console.log("Updated weather:", currentWeather);
  } catch (error) {
    console.error(
      "Weather fetch failed:",
      error
    );
  }
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

      <Sidebar theme={theme} />


      <main className="flex-1 p-8">

        <Header
          theme={theme}
          onCitySelect={handleCitySelect}
        />


        <div className="mt-8">

          <CurrentWeather
            weather={weather}
            theme={theme}
          />


          {/* Weather Stats */}

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


          {/* 5-Day Forecast */}

          <div className="mt-8">

            <h3
              className="mb-4 text-xl font-semibold"
              style={{
                color: theme.text,
              }}
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

          </div>


          {/* Temperature Chart */}

          <div className="mt-8">
            <TemperatureChart
              theme={theme}
            />
          </div>


          {/* Rain Timeline */}

          <div className="mt-8">
            <RainTimeline
              forecast={rainForecast}
              theme={theme}
            />
          </div>


          {/* Activity Recommendation */}

          <div className="mt-8">
            <ActivityRecommendation
              activities={scoredActivities}
              theme={theme}
            />
          </div>


          {/* Air Quality */}

          <div className="mt-8">
            <AirQuality
              airQuality={airQuality}
              theme={theme}
            />
          </div>

        </div>

      </main>

    </div>
  );
}


export default App;