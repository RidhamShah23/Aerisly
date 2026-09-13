import type {
  CurrentWeather,
  WeatherCondition,
  ForecastDay,
  HourlyWeather,
} from "../types/weather";

import type { WeatherApiResponse } from "../services/weatherApi";
import type {
  AirQualityApiResponse,
} from "../services/airQualityApi";

import {calculateIndianAQI} from "./airQualityUtils";

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
  const now = new Date();

const currentHourIndex = data.hourly.time.findIndex(
  (time) => new Date(time) >= now
);

const visibilityIndex =
  currentHourIndex === -1 ? 0 : currentHourIndex;
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
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    visibility: data.hourly.visibility[visibilityIndex],
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
      hour: "2-digit",
      minute:"2-digit",
      hour12: false,
    }
  );
}

export function mapAirQuality(
  data: AirQualityApiResponse
) {
  const aqi =
    calculateIndianAQI({
      pm10: data.hourly.pm10,
      pm25: data.hourly.pm2_5,
      nitrogenDioxide:
        data.hourly.nitrogen_dioxide,
      ozone: data.hourly.ozone,
    });

  const latestIndex =
    data.hourly.pm2_5.length - 1;

  return {
    aqi,

    pm25: Math.round(
      data.hourly.pm2_5[latestIndex] ?? 0
    ),

    pm10: Math.round(
      data.hourly.pm10[latestIndex] ?? 0
    ),

    ozone: Math.round(
      data.hourly.ozone[latestIndex] ?? 0
    ),

    nitrogenDioxide: Math.round(
      data.hourly.nitrogen_dioxide[
        latestIndex
      ] ?? 0
    ),
  };
}
import type {
  WeatherInsight,
} from "../types/weather";

interface InsightWeatherData {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  rainProbability: number;
  condition: string;
}

export function generateWeatherInsights(
  weather: InsightWeatherData
): WeatherInsight[] {
  const insights: WeatherInsight[] = [];

  //Rain
  if (weather.rainProbability >= 60) {
    insights.push({
      type: "rain",
      title: "Rain expected",
      message: `Rain probability reaches ${weather.rainProbability}% soon. Carry an umbrella.`,
    });
  }

  //Heat
  if (weather.temperature >= 35) {
    insights.push({
      type: "heat",
      title: "High temperature",
      message: `Temperature may reach ${weather.temperature}°C. Stay hydrated and avoid prolonged heat.`,
    });
  }

  //Feels-like
  if (
    weather.feelsLike - weather.temperature >= 4
  ) {
    insights.push({
      type: "heat",
      title: "Feels warmer",
      message: `It feels like ${weather.feelsLike}°C, which is ${weather.feelsLike - weather.temperature}° warmer than the actual temperature.`,
    });
  }

  //Humidity
  if (weather.humidity >= 80) {
    insights.push({
      type: "humidity",
      title: "High humidity",
      message: `Humidity is currently ${weather.humidity}%. The air may feel uncomfortable.`,
    });
  } else if (weather.humidity <= 30) {
    insights.push({
      type: "humidity",
      title: "Dry conditions",
      message: `Humidity is only ${weather.humidity}%. Stay hydrated, especially outdoors.`,
    });
  }

  //Wind
  if (weather.windSpeed >= 30) {
    insights.push({
      type: "wind",
      title: "Strong winds",
      message: `Wind speeds are around ${weather.windSpeed} km/h. Take extra care outdoors.`,
    });
  }

  //UV
  if (weather.uvIndex >= 7) {
    insights.push({
      type: "uv",
      title: "High UV exposure",
      message: `UV Index is ${weather.uvIndex}. Consider limiting direct sun exposure around midday.`,
    });
  }

  //Cloudy
  if (
    weather.condition === "cloudy" &&
    weather.rainProbability < 40
  ) {
    insights.push({
      type: "cloudy",
      title: "Mostly cloudy",
      message:
        "Cloud cover is expected without significant rain.",
    });
  }

  //Comfortable fallback
  if (insights.length === 0) {
    insights.push({
      type: "comfortable",
      title: "Great weather today",
      message:
        "Conditions look comfortable with no major weather concerns.",
    });
  }

  return insights.slice(0, 3);
}