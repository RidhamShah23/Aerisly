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