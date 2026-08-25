import type {
  Activity,
} from "../types/weather";

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

  let score =
  activity.name === "Shopping"
    ? 70
    : 100;

  const {
    temperature,
    humidity,
    rainProbability,
    windSpeed,
    uvIndex,
  } = weather;


  // 🌡️ Temperature

  if (
    activity.type === "outdoor" &&
    temperature < 10
  ) {
    score -= 25;
  }

  if (
    activity.type === "outdoor" &&
    temperature < 5
  ) {
    score -= 15;
  }

  if (
    activity.type === "outdoor" &&
    temperature > 35
  ) {
    score -= 20;
  }

  if (
    activity.type === "outdoor" &&
    temperature > 40
  ) {
    score -= 20;
  }


  // 💧 Humidity

  if (
    activity.name === "Walking" &&
    humidity > 85
  ) {
    score -= 8;
  }

  if (
    activity.name === "Outdoor Work" &&
    humidity > 75
  ) {
    score -= 15;
  }

  if (
    activity.name === "Picnic" &&
    humidity > 80
  ) {
    score -= 10;
  }


  // 🌧️ Rain

  if (activity.name === "Walking") {
    score -= rainProbability * 0.20;
  }

  if (activity.name === "Outdoor Work") {
    score -= rainProbability * 0.50;
  }

  if (activity.name === "Picnic") {
    score -= rainProbability * 0.60;
  }


  // 💨 Wind

  if (activity.name === "Outdoor Work") {

    if (windSpeed > 20) {
      score -= 15;
    }

    if (windSpeed > 30) {
      score -= 20;
    }
  }

  if (activity.name === "Picnic") {

    if (windSpeed > 25) {
      score -= 15;
    }
  }


  // ☀️ UV

  if (
    activity.type === "outdoor" &&
    uvIndex >= 7
  ) {
    score -= 15;
  }

  if (
    activity.type === "outdoor" &&
    uvIndex >= 10
  ) {
    score -= 10;
  }

 // 🛍️ Shopping

if (activity.name === "Shopping") {

  if (rainProbability >= 60) {
    score += 10;
  }

  if (temperature > 35) {
    score += 10;
  }

  if (windSpeed > 30) {
    score += 5;
  }

  if (uvIndex >= 7) {
    score += 5;
  }
}


  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}