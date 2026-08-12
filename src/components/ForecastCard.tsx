import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Moon,
} from "@phosphor-icons/react";

import type { Icon } from "@phosphor-icons/react";

import type {
  ForecastDay,
  WeatherCondition,
  WeatherTheme,
} from "../types/weather";

interface ForecastCardProps {
  forecast: ForecastDay;
  theme: WeatherTheme;
}

const weatherIcons: Record<WeatherCondition, Icon> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  storm: CloudLightning,
  snow: Snowflake,
  fog: CloudFog,
  "clear-night": Moon,
};

function ForecastCard({
  forecast,
  theme,
}: ForecastCardProps) {
  const WeatherIcon = weatherIcons[forecast.condition];

  return (
    <div
      className="flex flex-col items-center rounded-2xl p-5 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >
      <p
        className="text-sm font-medium"
        style={{ color: theme.mutedText }}
      >
        {forecast.day}
      </p>

      <WeatherIcon
        size={42}
        weight="duotone"
        className="my-4"
        style={{ color: theme.accent }}
      />

      <p className="text-xl font-semibold">
        {forecast.high}°
      </p>

      <p
        className="mt-1 text-sm"
        style={{ color: theme.mutedText }}
      >
        {forecast.low}°
      </p>
    </div>
  );
}

export default ForecastCard;