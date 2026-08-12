import type { Activity } from "../types/weather";

interface ActivityWeather {
  temperature: number;
  humidity: number;
  rainProbability: number;
  windSpeed: number;
  uvIndex: number;
}

export function calculateActivityScore(
  activity: Activity,
  weather: ActivityWeather
): number {
  let score = 100;

  // Rain
  if (activity.type === "outdoor") {
    score -= weather.rainProbability * 0.5;
  }

  // Temperature
  if (weather.temperature > 35) {
    score -= 20;
  } else if (weather.temperature < 15) {
    score -= 15;
  }

  // Wind
  if (weather.windSpeed > 30) {
    score -= 20;
  }

  // UV
  if (
    activity.type === "outdoor" &&
    weather.uvIndex >= 8
  ) {
    score -= 15;
  }

  // Humidity
  if (weather.humidity > 80) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}