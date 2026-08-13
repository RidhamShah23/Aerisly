import {
  Sun,
} from "@phosphor-icons/react";

import type { CurrentWeather as CurrentWeatherType } from "../types/weather";
import type { WeatherTheme } from "../types/weather";
interface CurrentWeatherProps {
  weather: CurrentWeatherType;
  theme: WeatherTheme;
}

function CurrentWeather({
  weather,
  theme,
}: CurrentWeatherProps) {
  return (
   <div className="mt-6 flex items-center justify-between">
  <div>
    <p className="text-6xl font-semibold">
      {weather.temperature}°
    </p>

    <p className="mt-2 text-lg">
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

  <Sun
    size={100}
    weight="duotone"
    className="text-yellow-400"
  />
</div>
  );
}

export default CurrentWeather;