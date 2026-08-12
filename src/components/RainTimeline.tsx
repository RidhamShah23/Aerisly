import { Umbrella } from "@phosphor-icons/react";

import type {
  RainForecast,
  WeatherTheme,
} from "../types/weather";

import { getRainLevel } from "../utils/weatherUtils";

interface RainTimelineProps {
  forecast: RainForecast[];
  theme: WeatherTheme;
}

function RainTimeline({
  forecast,
  theme,
}: RainTimelineProps) {
  return (
    <div
      className="rounded-3xl p-6 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: theme.background,
            color: theme.primary,
          }}
        >
          <Umbrella size={22} weight="duotone" />
        </div>

        <div>
          <h3 className="text-xl font-semibold">
            Rain Timeline
          </h3>

          <p
            className="text-sm"
            style={{ color: theme.mutedText }}
          >
            Precipitation probability
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-5 gap-3">
        {forecast.map((item) => (
          <div
            key={item.time}
            className="rounded-2xl p-4 text-center"
            style={{
              backgroundColor: theme.background,
            }}
          >
            <p
              className="text-xs"
              style={{ color: theme.mutedText }}
            >
              {item.time}
            </p>

            <p
              className="mt-3 text-2xl font-semibold"
              style={{ color: theme.primary }}
            >
              {item.probability}%
            </p>

            <p
              className="mt-1 text-xs"
              style={{ color: theme.mutedText }}
            >
              {getRainLevel(item.probability)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RainTimeline;