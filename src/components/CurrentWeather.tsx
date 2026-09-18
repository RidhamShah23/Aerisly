import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  Snowflake,
  MapPin,
} from "lucide-react";

import type {
  CurrentWeather as CurrentWeatherType,
  WeatherTheme,
} from "../types/weather";
interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  theme: WeatherTheme;
  displayTemperature: (temperature: number) => number;
}


function CurrentWeather({
  weather,
  theme,
  displayTemperature,
}: CurrentWeatherProps) {
    const isNight = isNightTime(
    weather.sunrise,
    weather.sunset,
    weather.timezone,
  );

  const displayCondition = isNight
    ? "clear-night"
    : weather.condition;

  return (
    <div
      className="rounded-3xl p-7 shadow-sm transition-colors duration-500 animate-fade-in-up"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >

      {/* Location */}

      <div className="flex items-center gap-2">
       <MapPin size={20} strokeWidth={2} />

        <span className="text-sm">
          {weather.city}
        </span>
      </div>


      {/* Main Weather */}

      <div className="mt-6 flex items-center justify-between gap-4">

        <div>

       <p className="text-6xl font-semibold">
  {displayTemperature(weather.temperature)}°
</p>

          <p
            className="mt-2 text-lg"
            style={{
              color: theme.mutedText,
            }}
          >
           {displayCondition === "clear-night"
  ? "Clear Night"
  : displayCondition.charAt(0).toUpperCase() +
    displayCondition.slice(1)}
          </p>

          <p
            className="mt-3 text-sm"
            style={{
              color: theme.mutedText,
            }}
          >
            Feels like {displayTemperature(weather.feelsLike)}°
          </p>

        </div>


        <div className="shrink-0">
  <WeatherIcon
  condition={displayCondition}
  color={theme.primary}
  />
</div>

      </div>
    </div>
  );
}
function isNightTime(
  sunrise: string,
  sunset: string,
  timezone: string,
): boolean {
  const now = new Date();

  const locationTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const currentMinutes =
    Number(locationTime.slice(0, 2)) * 60 +
    Number(locationTime.slice(3, 5));

  const sunriseTime = sunrise.slice(11, 16);
  const sunsetTime = sunset.slice(11, 16);

  const sunriseMinutes =
    Number(sunriseTime.slice(0, 2)) * 60 +
    Number(sunriseTime.slice(3, 5));

  const sunsetMinutes =
    Number(sunsetTime.slice(0, 2)) * 60 +
    Number(sunsetTime.slice(3, 5));

  return (
    currentMinutes < sunriseMinutes ||
    currentMinutes > sunsetMinutes
  );
}

function WeatherIcon({
  condition,
  color,
}: {
  condition: string;
  color: string;
}) {
  switch (condition) {
    case "sunny":
      return (
       <Sun
  size={100}
  strokeWidth={1.8}
  style={{ color }}
/>
      );

    case "cloudy":
      return (
        <Cloud
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );

    case "rainy":
      return (
        <CloudRain
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );

    case "storm":
      return (
        <CloudLightning
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );

    case "fog":
      return (
        <CloudFog
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );

    case "snow":
      return (
        <Snowflake
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );

      case "clear-night":
  return (
    <Moon
      size={100}
      strokeWidth={1.8}
      style={{ color }}
    />
  );

    default:
      return (
        <Sun
          size={100}
  strokeWidth={1.8}
          style={{ color }}
        />
      );
  }
}

export default CurrentWeather;