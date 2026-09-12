import { useState } from "react";
import {
  Thermometer,
  Wind,
  Bell,
} from "@phosphor-icons/react";

import type { WeatherTheme } from "../types/weather";

interface SettingsPageProps {
  theme: WeatherTheme;

  temperatureUnit: "C" | "F";
  windUnit: "km/h" | "mph";

  onTemperatureUnitChange: (
    unit: "C" | "F"
  ) => void;

  onWindUnitChange: (
    unit: "km/h" | "mph"
  ) => void;
}

function SettingsPage({
  theme,
  temperatureUnit,
  windUnit,
  onTemperatureUnitChange,
  onWindUnitChange,
}: SettingsPageProps) {

  const [weatherAlerts, setWeatherAlerts] =
    useState(true);

  return (
    <div className="mt-8 max-w-3xl">

      {/* Header */}

      <div>
        <h2 className="text-2xl font-semibold">
          Settings
        </h2>

        <p
          className="mt-1 text-sm"
          style={{
            color: theme.mutedText,
          }}
        >
          Customize your weather experience
        </p>
      </div>

      {/* Temperature */}

      <div
        className="mt-8 rounded-3xl p-6"
        style={{
          backgroundColor: theme.card,
        }}
      >
        <div className="flex items-center gap-4">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor:
                `${theme.primary}20`,
            }}
          >
            <Thermometer
              size={24}
              weight="duotone"
              style={{
                color: theme.primary,
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold">
              Temperature Unit
            </h3>

            <p
              className="text-sm"
              style={{
                color: theme.mutedText,
              }}
            >
              Choose how temperature is displayed
            </p>
          </div>

        </div>

        <div className="mt-5 flex gap-3">

          <button
           onClick={() =>
  onTemperatureUnitChange("F")
}
            className="rounded-xl px-5 py-3 text-sm font-medium"
            style={{
              backgroundColor:
                temperatureUnit === "C"
                  ? theme.primary
                  : theme.background,

              color:
                temperatureUnit === "C"
                  ? "#ffffff"
                  : theme.text,
            }}
          >
            Celsius °C
          </button>

          <button
            onClick={() =>
  onTemperatureUnitChange("F")
}
            className="rounded-xl px-5 py-3 text-sm font-medium"
            style={{
              backgroundColor:
                temperatureUnit === "F"
                  ? theme.primary
                  : theme.background,

              color:
                temperatureUnit === "F"
                  ? "#ffffff"
                  : theme.text,
            }}
          >
            Fahrenheit °F
          </button>

        </div>
      </div>

      {/* Wind */}

      <div
        className="mt-5 rounded-3xl p-6"
        style={{
          backgroundColor: theme.card,
        }}
      >
        <div className="flex items-center gap-4">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor:
                `${theme.primary}20`,
            }}
          >
            <Wind
              size={24}
              weight="duotone"
              style={{
                color: theme.primary,
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold">
              Wind Speed Unit
            </h3>

            <p
              className="text-sm"
              style={{
                color: theme.mutedText,
              }}
            >
              Choose your preferred wind speed unit
            </p>
          </div>

        </div>

        <div className="mt-5 flex gap-3">

          <button
            onClick={() =>
                 onWindUnitChange("km/h")
                }
            className="rounded-xl px-5 py-3 text-sm font-medium"
            style={{
              backgroundColor:
                windUnit === "km/h"
                  ? theme.primary
                  : theme.background,

              color:
                windUnit === "km/h"
                  ? "#ffffff"
                  : theme.text,
            }}
          >
            km/h
          </button>

          <button
           onClick={() =>
  onWindUnitChange("mph")
}
            className="rounded-xl px-5 py-3 text-sm font-medium"
            style={{
              backgroundColor:
                windUnit === "mph"
                  ? theme.primary
                  : theme.background,

              color:
                windUnit === "mph"
                  ? "#ffffff"
                  : theme.text,
            }}
          >
            mph
          </button>

        </div>
      </div>

      {/* Alerts */}

      <div
        className="mt-5 flex items-center justify-between rounded-3xl p-6"
        style={{
          backgroundColor: theme.card,
        }}
      >

        <div className="flex items-center gap-4">

          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor:
                `${theme.primary}20`,
            }}
          >
            <Bell
              size={24}
              weight="duotone"
              style={{
                color: theme.primary,
              }}
            />
          </div>

          <div>
            <h3 className="font-semibold">
              Weather Alerts
            </h3>

            <p
              className="text-sm"
              style={{
                color: theme.mutedText,
              }}
            >
              Receive important weather notifications
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            setWeatherAlerts(!weatherAlerts)
          }
          className="relative h-7 w-12 rounded-full transition"
          style={{
            backgroundColor:
              weatherAlerts
                ? theme.primary
                : theme.mutedText,
          }}
        >
          <span
            className="absolute top-1 h-5 w-5 rounded-full bg-white transition"
            style={{
              left: weatherAlerts
                ? "26px"
                : "4px",
            }}
          />
        </button>

      </div>

    </div>
  );
}

export default SettingsPage;