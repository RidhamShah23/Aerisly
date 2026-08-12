export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "rainy"
  | "storm"
  | "snow"
  | "fog"
  | "clear-night";

  export interface WeatherTheme {
  background: string;
  card: string;
  primary: string;
  accent: string;
  text: string;
  mutedText: string;
}

export interface CurrentWeather {
  city: string;
  temperature: number;
  condition: string;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
}
export interface ForecastDay{
  day: string;
  condition: WeatherCondition;
  high: number;
  low:number;
}
export interface RainForecast {
  time: string;
  probability: number;
}

export type ActivityType = "outdoor" | "indoor";

export interface Activity {
  name: string;
  type: ActivityType;
  score: number;
}