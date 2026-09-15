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
        "Air quality is good and suitable for most people.",
    };
  }

  if (aqi <= 100) {
    return {
      label: "Satisfactory",
      description:
        "Air quality is acceptable, but some sensitive people may experience minor discomfort.",
    };
  }

  if (aqi <= 200) {
    return {
      label: "Moderately Polluted",
      description:
        "Sensitive people may experience health effects with prolonged exposure.",
    };
  }

  if (aqi <= 300) {
    return {
      label: "Poor",
      description:
        "Prolonged exposure may cause discomfort and health effects.",
    };
  }

  if (aqi <= 400) {
    return {
      label: "Very Poor",
      description:
        "Health effects are possible with prolonged exposure.",
    };
  }

  return {
    label: "Severe",
    description:
      "Health alert: everyone may experience more serious health effects.",
  };
}

function AirQuality({
  airQuality,
  theme,
}: AirQualityProps) {
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
      <div className="flex items-center justify-between">

  <div>
    <p
      className="text-5xl font-semibold"
      style={{
        color: theme.text,
      }}
    >
      {airQuality.aqi}
    </p>

  </div>

  <div className="text-right">
    <p className="text-lg font-semibold">
      {status.label}
    </p>

    <p
      className="mt-1 max-w-xs text-sm"
      style={{
        color: theme.mutedText,
      }}
    >
      {status.description}
    </p>
    <div className="mt-5">

  <div
    className="h-2 overflow-hidden rounded-full"
    style={{
      backgroundColor:
        `${theme.primary}20`,
    }}
  >
    <div
      className="h-full rounded-full transition-all duration-700"
      style={{
       width: `${Math.min(
  (airQuality.aqi / 500) * 100,
  100
)}%`,
        backgroundColor:
          theme.primary,
      }}
    />
  </div>

</div>
  </div>

</div>
      {/* Pollutants */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
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
  {value} μg/m³
</p>
    </div>
  );
}

export default AirQuality;