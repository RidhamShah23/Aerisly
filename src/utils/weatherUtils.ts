import type {
  CurrentWeather,
  WeatherCondition,
} from "../types/weather";

import type { WeatherApiResponse } from "../services/weatherApi";

export type RainLevel =
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export function getRainLevel(
  probability: number
): RainLevel {
  if (probability <= 20) {
    return "Low";
  }

  if (probability <= 50) {
    return "Moderate";
  }

  if (probability <= 75) {
    return "High";
  }

  return "Very High";
}


export function getWeatherCondition(
  weatherCode: number
): WeatherCondition {
  if (weatherCode === 0) {
    return "sunny";
  }

  if (
    weatherCode === 1 ||
    weatherCode === 2 ||
    weatherCode === 3
  ) {
    return "cloudy";
  }

  if (
    weatherCode === 45 ||
    weatherCode === 48
  ) {
    return "fog";
  }

  if (
    weatherCode >= 51 &&
    weatherCode <= 67
  ) {
    return "rainy";
  }

  if (
    weatherCode >= 71 &&
    weatherCode <= 77
  ) {
    return "snow";
  }

  if (
    weatherCode >= 80 &&
    weatherCode <= 82
  ) {
    return "rainy";
  }

  if (
    weatherCode >= 95
  ) {
    return "storm";
  }

  return "cloudy";
}
export function mapCurrentWeather(
  data: WeatherApiResponse,
  city: string
): CurrentWeather {
  return {
    city,
    temperature: Math.round(
      data.current.temperature_2m
    ),

    condition: getWeatherCondition(
      data.current.weather_code
    ),

    feelsLike: Math.round(
      data.current.apparent_temperature
    ),

    humidity:
      data.current.relative_humidity_2m,

    windSpeed: Math.round(
      data.current.wind_speed_10m
    ),

    uvIndex: Math.round(
      data.current.uv_index
    ),
  };
}