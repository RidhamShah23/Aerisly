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
import type {HourlyWeather} from "./types/weather";
import {
  mapCurrentWeather,
  mapForecast,
  mapHourlyWeather,
  mapAirQuality,
} from "./utils/weatherUtils";

import { getAirQuality } from "./services/airQualityApi";

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
  const [weather,setWeather]=
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

    const airQualityData =
      await getAirQuality(
        location.latitude,
        location.longitude
      );

    const currentWeather =
      mapCurrentWeather(
        data,
        location.name
      );

    const currentForecast =
      mapForecast(data);

    const currentHourly =
      mapHourlyWeather(data);

    const currentAirQuality =
      mapAirQuality(airQualityData);

    setWeather(currentWeather);
    setForecast(currentForecast);
    setHourlyWeather(currentHourly);
    setAirQuality(currentAirQuality);

  } catch (error) {
    console.error(
      "Weather fetch failed:",
      error
    );
  }
};;

const scoredActivities = activities.map((activity) => ({
  ...activity,
  score: calculateActivityScore(
    activity,
    activityWeather
  ),
}));
const [hourlyWeather, setHourlyWeather] =
  useState<HourlyWeather[]>([]);

  const [airQuality, setAirQuality] =
  useState<AirQualityType | null>(null);
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
  hourlyWeather={hourlyWeather}
/> </div>

          {/* Activity Recommendation */}

          <div className="mt-8">
            <ActivityRecommendation
              activities={scoredActivities}
              theme={theme}
            />
          </div>


          {/* Air Quality */}

          <div className="mt-8">
           {airQuality && (
  <AirQuality
    airQuality={airQuality}
    theme={theme}
  />
)}
          </div>

        </div>

      </main>

    </div>
  );
}


export default App;