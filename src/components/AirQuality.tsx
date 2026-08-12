import { Wind } from "@phosphor-icons/react";

import type {
  AirQuality as AirQualityType,
  WeatherTheme,
} from "../types/weather";

import { getAQIStatus } from "../utils/airQualityUtils";

interface AirQualityProps {
  airQuality: AirQualityType;
  theme: WeatherTheme;
}

function AirQuality({
  airQuality,
  theme,
}: AirQualityProps) {
  const status = getAQIStatus(airQuality.aqi);

  return (
    <div
      className="rounded-3xl p-6 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.background,
            color: theme.primary,
          }}
        >
          <Wind size={22} weight="duotone" />
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Air Quality
          </h3>

          <p
            className="text-sm"
            style={{ color: theme.mutedText }}
          >
            Today's air quality
          </p>
        </div>
      </div>

      {/* AQI */}
      <div className="mt-6 flex items-center gap-5">
        <div>
          <p className="text-5xl font-bold">
            {airQuality.aqi}
          </p>

          <p
            className="mt-1 text-sm"
            style={{ color: theme.primary }}
          >
            {status}
          </p>
        </div>

        <div className="flex-1">
          <div className="h-3 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(
                  airQuality.aqi / 3,
                  100
                )}%`,
                backgroundColor: theme.primary,
              }}
            />
          </div>

          <p
            className="mt-2 text-xs"
            style={{ color: theme.mutedText }}
          >
            Lower is better
          </p>
        </div>
      </div>

      {/* Pollutants */}
      <div className="mt-6 grid grid-cols-4 gap-3">
        <Pollutant
          label="PM2.5"
          value={airQuality.pm25}
          theme={theme}
        />

        <Pollutant
          label="PM10"
          value={airQuality.pm10}
          theme={theme}
        />

        <Pollutant
          label="O₃"
          value={airQuality.ozone}
          theme={theme}
        />

        <Pollutant
          label="NO₂"
          value={airQuality.nitrogenDioxide}
          theme={theme}
        />
      </div>
    </div>
  );
}

interface PollutantProps {
  label: string;
  value: number;
  theme: WeatherTheme;
}

function Pollutant({
  label,
  value,
  theme,
}: PollutantProps) {
  return (
    <div
      className="rounded-2xl p-3 text-center"
      style={{
        backgroundColor: theme.background,
      }}
    >
      <p
        className="text-xs"
        style={{ color: theme.mutedText }}
      >
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>
    </div>
  );
}

export default AirQuality;