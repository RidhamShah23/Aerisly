import { Wind } from "lucide-react";
import type {
  AirQuality as AirQualityType,
  WeatherTheme,
} from "../types/weather";

interface AirQualityProps {
  airQuality: AirQualityType;
  theme: WeatherTheme;
}

function getAQIStatus(aqi: number) {
  if (aqi <= 50) {
    return {
      label: "Good",
      description:
        "Air quality is satisfactory, and air pollution poses little or no risk.",
      color: "#22C55E",
    };
  }

  if (aqi <= 100) {
    return {
      label: "Moderate",
      description:
        "Air quality is acceptable, but some pollutants may be a concern for sensitive individuals.",
      color: "#EAB308",
    };
  }

  if (aqi <= 150) {
    return {
      label: "Unhealthy for Sensitive Groups",
      description:
        "Sensitive individuals may experience health effects. The general public is less likely to be affected.",
      color: "#F97316",
    };
  }

  if (aqi <= 200) {
    return {
      label: "Unhealthy",
      description:
        "Everyone may begin to experience health effects, with sensitive groups at greater risk.",
      color: "#EF4444",
    };
  }

  if (aqi <= 300) {
    return {
      label: "Very Unhealthy",
      description:
        "Health alert: the risk of health effects is increased for everyone.",
      color: "#A855F7",
    };
  }

  return {
    label: "Hazardous",
    description:
      "Health warning of emergency conditions. Everyone is more likely to be affected.",
    color: "#7F1D1D",
  };
}
interface PollutantProps {
  label: string;
  value: number;
  theme: WeatherTheme;
}

function Pollutant({ label, value, theme }: PollutantProps) {
  return (
    <div
      className="rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: theme.background,
        borderColor: `${theme.primary}12`,
      }}
    >
      <p className="text-xs font-medium" style={{ color: theme.mutedText }}>
        {label}
      </p>

      <p
        className="mt-2 text-lg font-semibold tracking-tight"
        style={{ color: theme.text }}
      >
        {value}
      </p>

      <p className="mt-0.5 text-[11px]" style={{ color: theme.mutedText }}>
        μg/m³
      </p>
    </div>
  );
}

function AirQuality({ airQuality, theme }: AirQualityProps) {
  const status = getAQIStatus(airQuality.aqi);

  return (
    <div
      className="rounded-3xl p-6 shadow-sm transition-colors duration-500 animate-fade-in-up"
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
          <Wind size={22} strokeWidth={1.8} />
        </div>

        <div>
          <h3 className="text-xl font-semibold">Air Quality</h3>

          <p className="text-sm" style={{ color: theme.mutedText }}>
            Today's air quality
          </p>
        </div>
      </div>

      {/* AQI Summary */}
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* AQI Value */}
        <div>
          <p className="text-sm font-medium" style={{ color: theme.mutedText }}>
            US AQI
          </p>

          <p
            className="mt-1 text-5xl font-semibold leading-none tracking-tight"
            style={{ color: theme.text }}
          >
            {airQuality.aqi}
          </p>
        </div>

        {/* AQI Status */}
        <div className="w-full max-w-md sm:text-right">
          <p className="text-lg font-semibold">{status.label}</p>

          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: theme.mutedText }}
          >
            {status.description}
          </p>
        </div>
      </div>

      {/* AQI Progress */}
      <div className="mt-5">
        <div
          className="h-2 overflow-hidden rounded-full"
          style={{
            backgroundColor: `${status.color}20`,
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${Math.min((airQuality.aqi / 500) * 100, 100)}%`,
              backgroundColor: status.color,
            }}
          />
        </div>

        <div
          className="mt-1 flex justify-between text-[10px]"
          style={{ color: theme.mutedText }}
        >
          <span>0</span>
          <span>500</span>
        </div>
      </div>
      <div
        className="mt-5 border-t"
        style={{
          borderColor: `${theme.primary}12`,
        }}
      />

      {/* Pollutants */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Pollutant label="PM2.5" value={airQuality.pm25} theme={theme} />

        <Pollutant label="PM10" value={airQuality.pm10} theme={theme} />

        <Pollutant label="O₃" value={airQuality.ozone} theme={theme} />

        <Pollutant
          label="NO₂"
          value={airQuality.nitrogenDioxide}
          theme={theme}
        />
      </div>
    </div>
  );
}

export default AirQuality;
