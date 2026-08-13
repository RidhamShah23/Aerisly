import type {
  CurrentWeather,
  WeatherCondition,
  ForecastDay,
  HourlyWeather,
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

export function mapForecast(
  data: WeatherApiResponse
): ForecastDay[] {
  return data.daily.time.map((date, index) => ({
    day: formatForecastDay(date),

    condition: getWeatherCondition(
      data.daily.weather_code[index]
    ),

    high: Math.round(
      data.daily.temperature_2m_max[index]
    ),

    low: Math.round(
      data.daily.temperature_2m_min[index]
    ),
  }));
}
function formatForecastDay(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
  });
}
export function mapHourlyWeather(
  data: WeatherApiResponse
): HourlyWeather[] {
  const now = Date.now();

  const startIndex = data.hourly.time.findIndex(
    (time) => new Date(time).getTime() >= now
  );

  const index =
    startIndex === -1 ? 0 : startIndex;

  return data.hourly.time
    .slice(index, index + 8)
    .map((time, i) => ({
      time: formatHour(time),
      temperature: Math.round(
        data.hourly.temperature_2m[index + i]
      ),
      rainProbability:
        data.hourly.precipitation_probability[index + i],
    }));
}

function formatHour(time: string): string {
  return new Date(time).toLocaleTimeString(
    "en-US",
    {
      hour: "numeric",
      hour12: true,
    }
  );
}