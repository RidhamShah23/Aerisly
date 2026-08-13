import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  Snowflake,
  MapPin,
} from "@phosphor-icons/react";

import type {
  CurrentWeather as CurrentWeatherType,
  WeatherTheme,
} from "../types/weather";
interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  theme: WeatherTheme;
}


function CurrentWeather({
  weather,
  theme,
}: CurrentWeatherProps) {

  return (
    <div
      className="rounded-3xl p-7 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >

      {/* Location */}

      <div className="flex items-center gap-2">
        <MapPin
          size={20}
          weight="fill"
        />

        <span className="text-sm">
          {weather.city}
        </span>
      </div>


      {/* Main Weather */}

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-6xl font-semibold">
            {weather.temperature}°
          </p>

          <p
            className="mt-2 text-lg"
            style={{
              color: theme.mutedText,
            }}
          >
            {weather.condition}
          </p>

          <p
            className="mt-3 text-sm"
            style={{
              color: theme.mutedText,
            }}
          >
            Feels like {weather.feelsLike}°
          </p>

        </div>


        <WeatherIcon
  condition={weather.condition}
  color={theme.primary}
/>

      </div>

    </div>
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
          weight="duotone"
          style={{ color }}
        />
      );

    case "cloudy":
      return (
        <Cloud
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );

    case "rainy":
      return (
        <CloudRain
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );

    case "storm":
      return (
        <CloudLightning
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );

    case "fog":
      return (
        <CloudFog
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );

    case "snow":
      return (
        <Snowflake
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );

    default:
      return (
        <Sun
          size={100}
          weight="duotone"
          style={{ color }}
        />
      );
  }
}

export default CurrentWeather;