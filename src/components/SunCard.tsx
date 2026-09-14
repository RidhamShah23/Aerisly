import {
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import type { CurrentWeather } from "../types/weather";
import type { WeatherTheme } from "../types/weather";

interface SunCardProps {
  weather: CurrentWeather;
  theme: WeatherTheme;
}
function formatSunTime(time: string): string {
  return new Date(time).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
function getSunProgress(sunrise: string, sunset: string): number {
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();
  const currentTime = Date.now();

  if (currentTime <= sunriseTime) {
    return 0;
  }

  if (currentTime >= sunsetTime) {
    return 1;
  }

  return (currentTime - sunriseTime) / (sunsetTime - sunriseTime);
}

function isDaytime(sunrise: string, sunset: string): boolean {
  const currentTime = Date.now();
  const sunriseTime = new Date(sunrise).getTime();
  const sunsetTime = new Date(sunset).getTime();

  return currentTime >= sunriseTime && currentTime <= sunsetTime;
}

export default function SunCard({ weather, theme }: SunCardProps) {
  const sunProgress = getSunProgress(weather.sunrise, weather.sunset);
  const daytime = isDaytime(weather.sunrise, weather.sunset);
  return (
    <div
      className="overflow-hidden rounded-3xl p-6"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
        border: `1px solid ${theme.text}15`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold">
            {daytime ? "Day" : "Night"}
          </h3>

          <p className="mt-1 text-sm" style={{ opacity: 0.7 }}>
            {daytime ? weather.condition : "The sun has set"}
          </p>
        </div>

        <div className="flex items-center gap-2">
<Sun size={24} strokeWidth={2} />
          <span className="text-2xl font-medium">{weather.temperature}°C</span>
        </div>
      </div>

      {/* Sun Area */}
  {daytime && (
  <>
    {/* Arc */}
    <div
      className="absolute bottom-0 left-1/2 h-28 w-60 -translate-x-1/2 rounded-t-full border-2"
      style={{
        borderColor: theme.text,
        opacity: 0.15,
        borderBottom: "none",
      }}
    />

    {/* Sun */}
    <div
      className="absolute h-5 w-5 rounded-full"
      style={{
        left: `calc(50% - 160px + ${sunProgress * 320}px)`,
        top: `${100 - Math.sin(sunProgress * Math.PI) * 100}%`,
        backgroundColor: theme.text,
        transform: "translate(-50%, -50%)",
      }}
    />
  </>
)}  

      {/* Sunrise / Sunset */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
<Sunrise size={28} strokeWidth={1.8} />
          <div>
            <p className="text-xs" style={{ opacity: 0.6 }}>
              Sunrise
            </p>

            <p className="font-medium">{formatSunTime(weather.sunrise)}</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <p className="text-xs" style={{ opacity: 0.6 }}>
              Sunset
            </p>

            <p className="font-medium">{formatSunTime(weather.sunset)}</p>
          </div>

          <Sunset size={28} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}
