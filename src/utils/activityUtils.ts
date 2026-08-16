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

  let score = 100;

  const {
    temperature,
    humidity,
    rainProbability,
    windSpeed,
    uvIndex,
  } = weather;


  // 🌡️ Temperature penalty

  if (temperature < 10) {
    score -= activity.type === "outdoor"
      ? 25
      : 0;
  }

  if (temperature < 5) {
    score -= activity.type === "outdoor"
      ? 15
      : 0;
  }

  if (temperature > 35) {
    score -= activity.type === "outdoor"
      ? 20
      : 0;
  }

  if (temperature > 40) {
    score -= activity.type === "outdoor"
      ? 20
      : 0;
  }


  // 💧 Humidity

  if (
    activity.name === "Running" &&
    humidity > 75
  ) {
    score -= 15;
  }

  if (
    activity.name === "Walking" &&
    humidity > 85
  ) {
    score -= 8;
  }


  // 🌧️ Rain

  if (activity.name === "Running") {
    score -= rainProbability * 0.35;
  }

  if (activity.name === "Walking") {
    score -= rainProbability * 0.20;
  }

  if (activity.name === "Cycling") {
    score -= rainProbability * 0.45;
  }

  if (activity.name === "Picnic") {
    score -= rainProbability * 0.60;
  }


  // 💨 Wind

  if (activity.name === "Cycling") {
    if (windSpeed > 20) {
      score -= 15;
    }

    if (windSpeed > 30) {
      score -= 20;
    }
  }

  if (activity.name === "Running") {
    if (windSpeed > 30) {
      score -= 12;
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


  // 🎬 Indoor Movie

  if (activity.name === "Indoor Movie") {

    // Bad outdoor conditions
    // make indoor activities better.

    if (rainProbability >= 60) {
      score += 5;
    }

    if (temperature > 35) {
      score += 5;
    }

    if (windSpeed > 30) {
      score += 5;
    }
  }


  return Math.max(
    0,
    Math.min(100, Math.round(score))
  );
}