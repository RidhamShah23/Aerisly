import { useState,useEffect,useCallback } from "react";

import type {
  CurrentWeather as CurrentWeatherType,
  ForecastDay,
  HourlyWeather,
  AirQuality as AirQualityType,
} from "../types/weather";

import { getWeather } from "../services/weatherApi";
import { getAirQuality } from "../services/airQualityApi";

import {
  mapCurrentWeather,
  mapForecast,
  mapHourlyWeather,
  mapAirQuality,
} from "../utils/weatherUtils";

function useWeather() {
  const [weather, setWeather] = useState<CurrentWeatherType>({
    city: "Ahmedabad",
    temperature: 32,
    condition: "sunny",
    feelsLike: 35,
    humidity: 55,
    windSpeed: 12,
    uvIndex: 6,
    visibility: 10000,
    sunrise: "06:00",
    sunset: "18:30",
    timezone: "Asia/Kolkata",
  });

  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityType | null>(null);

const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherForLocation = useCallback(
    async (
    
  latitude: number,
  longitude: number,
  city: string,
  
) => {
    
  try {
    

    const [weatherData, airQualityData] = await Promise.all([
      getWeather(latitude, longitude),
      getAirQuality(latitude, longitude),
    ]);

    const currentWeather = mapCurrentWeather(weatherData, city);
    const currentForecast = mapForecast(weatherData);
    const currentHourly = mapHourlyWeather(weatherData);
    const currentAirQuality = mapAirQuality(airQualityData);

    setWeather(currentWeather);
    setForecast(currentForecast);
    setHourlyWeather(currentHourly);
    setAirQuality(currentAirQuality);
  } catch (error) {
    console.error("Weather loading failed:", error);
    setError("Couldn't load weather data. Please try again.");
  } finally {
    setIsLoading(false);
  }
},
[],
  );

  
 useEffect(() => {
  const saved = localStorage.getItem("currentLocation");

  if (saved) {
    const location = JSON.parse(saved);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadWeatherForLocation(
      location.latitude,
      location.longitude,
      location.name,
    );
  } else {
    loadWeatherForLocation(23.0225, 72.5714, "Ahmedabad");
  }
}, [loadWeatherForLocation]);

  return {
  weather,
  forecast,
  hourlyWeather,
  airQuality,
  isLoading,
  error,
  loadWeatherForLocation,
};
}


export default useWeather;