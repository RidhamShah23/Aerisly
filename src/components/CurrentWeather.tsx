import {
  Drop,
  Wind,
  Sun,
  MapPin,
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
    <div
  className="rounded-3xl p-7 shadow-sm transition-colors duration-500"
  style={{
    backgroundColor: theme.card,
    color: theme.text,
  }}
>
      {/* Location */}
      <div className="flex items-center gap-2 text-gray-500">
        <MapPin size={20} weight="fill" />

        <span className="text-sm">
          {weather.city}
        </span>
      </div>

      {/* Main Weather */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <p className="text-6xl font-semibold text-gray-800">
            {weather.temperature}°
          </p>

          <p className="mt-2 text-lg text-gray-500">
  {weather.condition === "sunny"
    ? "Clear Sky"
    : weather.condition === "rainy"
      ? "Rainy"
      : weather.condition === "cloudy"
        ? "Cloudy"
        : weather.condition}
</p>
        </div>

        <Sun
          size={100}
          weight="duotone"
          className="text-yellow-400"
        />
      </div>

      {/* Weather Details */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-sm text-gray-400">
            Feels like
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-700">
            {weather.feelsLike}°
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Drop
              size={18}
              className="text-blue-400"
            />

            <p className="text-sm text-gray-400">
              Humidity
            </p>
          </div>

          <p className="mt-1 text-lg font-semibold text-gray-700">
            {weather.humidity}%
          </p>
        </div>

        <div className="rounded-2xl bg-gray-50 p-4">
          <div className="flex items-center gap-2">
            <Wind
              size={18}
              className="text-teal-500"
            />

            <p className="text-sm text-gray-400">
              Wind
            </p>
          </div>

          <p className="mt-1 text-lg font-semibold text-gray-700">
            {weather.windSpeed} km/h
          </p>
        </div>
      </div>

      {/* UV */}
      <div className="mt-4 rounded-2xl bg-green-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            UV Index
          </span>

          <span className="font-semibold text-green-700">
            {weather.uvIndex}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;