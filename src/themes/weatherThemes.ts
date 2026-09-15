import type { WeatherCondition, WeatherTheme } from "../types/weather";

export const weatherThemes: Record<
  WeatherCondition,
  WeatherTheme
> = {
  sunny: {
    background: "#F4FAF6",
    card: "#FFFFFF",
    primary: "#159957",
    accent: "#F5C84B",
    text: "#17211B",
    mutedText: "#718078",
  },

  cloudy: {
    background: "#F1F4F5",
    card: "#FFFFFF",
    primary: "#64748B",
    accent: "#94A3B8",
    text: "#1E293B",
    mutedText: "#64748B",
  },

  rainy: {
    background: "#202A35",
    card: "#293642",
    primary: "#4DB6C5",
    accent: "#5B9BD5",
    text: "#F5F7FA",
    mutedText: "#AAB7C4",
  },

  storm: {
    background: "#111827",
    card: "#1F2937",
    primary: "#60A5FA",
    accent: "#FACC15",
    text: "#F9FAFB",
    mutedText: "#9CA3AF",
  },

  snow: {
    background: "#EFF7FC",
    card: "#FFFFFF",
    primary: "#4FA3D1",
    accent: "#8ED1FC",
    text: "#183247",
    mutedText: "#6B8799",
  },

  fog: {
    background: "#E9EEEC",
    card: "#F8FAF9",
    primary: "#6F8C83",
    accent: "#A8BBB4",
    text: "#25332E",
    mutedText: "#71817B",
  },

  "clear-night": {
  background: "#050B14",
  card: "#0D1624",
  primary: "#38BDF8",
  accent: "#7DD3FC",
  text: "#F8FAFC",
  mutedText: "#94A3B8",
},
};