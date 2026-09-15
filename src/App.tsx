import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import { weatherThemes, nightWeatherColors } from "./themes/weatherThemes";
import { calculateActivityScore } from "./utils/activityUtils";

import type { LocationResult } from "./services/geocodingApi";

import {
  getCurrentLocation,
  getCityFromCoordinates,
} from "./services/location";
import LocationsPage from "./components/LocationsPage";
import SettingsPage from "./components/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { activities } from "./constants/activities";
import useWeather from "./hooks/useWeather";

function getUVLevel(uvIndex: number) {
  if (uvIndex <= 2) return "Low";
  if (uvIndex <= 5) return "Moderate";
  if (uvIndex <= 7) return "High";
  if (uvIndex <= 10) return "Very High";
  return "Extreme";
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
    Number(locationTime.slice(0, 2)) * 60 + Number(locationTime.slice(3, 5));

  const sunriseTime = sunrise.slice(11, 16);
  const sunsetTime = sunset.slice(11, 16);

  const sunriseMinutes =
    Number(sunriseTime.slice(0, 2)) * 60 + Number(sunriseTime.slice(3, 5));

  const sunsetMinutes =
    Number(sunsetTime.slice(0, 2)) * 60 + Number(sunsetTime.slice(3, 5));

  return currentMinutes < sunriseMinutes || currentMinutes > sunsetMinutes;
}

type SavedLocation = LocationResult & {
  savedAt: number;
};

function App() {
  const navigate = useNavigate();
  const {
    weather,
    forecast,
    hourlyWeather,
    airQuality,
    isLoading,
    error,
    loadWeatherForLocation,
  } = useWeather();

  const activityWeather = {
    temperature: weather.temperature,
    humidity: weather.humidity,
    rainProbability:
      hourlyWeather.length > 0
        ? Math.max(...hourlyWeather.map((hour) => hour.rainProbability))
        : 0,
    windSpeed: weather.windSpeed,
    uvIndex: weather.uvIndex,
  };

  const scoredActivities = activities.map((activity) => ({
    ...activity,
    score: calculateActivityScore(activity, activityWeather),
  }));

  const isNight = isNightTime(
    weather.sunrise,
    weather.sunset,
    weather.timezone,
  );

  const baseTheme = isNight
    ? weatherThemes["clear-night"]
    : weatherThemes[weather.condition];

  const theme = isNight
    ? {
        ...baseTheme,
        primary: nightWeatherColors[weather.condition].primary,
        accent: nightWeatherColors[weather.condition].accent,
      }
    : baseTheme;
  const handleCurrentLocation = async () => {
    try {
      const coordinates = await getCurrentLocation();

      const location = await getCityFromCoordinates(
        coordinates.latitude,
        coordinates.longitude,
      );
      const locationResult: LocationResult = {
        name: location.city,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        country: "",
        admin1: "",
      };
      localStorage.setItem("currentLocation", JSON.stringify(locationResult));

      saveLocation(locationResult);
      await loadWeatherForLocation(
        coordinates.latitude,
        coordinates.longitude,
        location.city,
      );
    } catch (error) {
      console.error("Location weather failed:", error);
    }
  };

  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>(() => {
    const saved = localStorage.getItem("savedLocations");

    if (!saved) {
      return [];
    }

    const locations: SavedLocation[] = JSON.parse(saved);
    const fifteenDays = 15 * 24 * 60 * 60 * 1000;

    return locations.filter(
      (location) =>
        location.savedAt && Date.now() - location.savedAt < fifteenDays,
    );
  });
  useEffect(() => {
    localStorage.setItem("savedLocations", JSON.stringify(savedLocations));
  }, [savedLocations]);

  const saveLocation = (location: LocationResult) => {
    setSavedLocations((previousLocations) => {
      const alreadyExists = previousLocations.some(
        (savedLocation) =>
          savedLocation.latitude === location.latitude &&
          savedLocation.longitude === location.longitude,
      );

      if (alreadyExists) {
        return previousLocations;
      }

      return [
        ...previousLocations,
        {
          ...location,
          savedAt: Date.now(),
        },
      ];
    });
  };
  const removeLocation = (location: LocationResult) => {
    setSavedLocations((previousLocations) =>
      previousLocations.filter(
        (savedLocation) =>
          savedLocation.latitude !== location.latitude ||
          savedLocation.longitude !== location.longitude,
      ),
    );
  };
  const handleCitySelect = async (location: LocationResult) => {
    localStorage.setItem("currentLocation", JSON.stringify(location));
    saveLocation(location);

    await loadWeatherForLocation(
      location.latitude,
      location.longitude,
      location.name,
    );
  };

  const [temperatureUnit, setTemperatureUnit] = useState<"C" | "F">(() => {
    return (localStorage.getItem("temperatureUnit") as "C" | "F") || "C";
  });

  const [windUnit, setWindUnit] = useState<"km/h" | "mph">(() => {
    return (localStorage.getItem("windUnit") as "km/h" | "mph") || "km/h";
  });
  useEffect(() => {
    localStorage.setItem("temperatureUnit", temperatureUnit);
  }, [temperatureUnit]);

  useEffect(() => {
    localStorage.setItem("windUnit", windUnit);
  }, [windUnit]);
  const displayTemperature = (temperature: number) => {
    if (temperatureUnit === "F") {
      return Math.round((temperature * 9) / 5 + 32);
    }

    return temperature;
  };
  const displayVisibility = (weather.visibility / 1000).toFixed(1);
  const displayWindSpeed = (speed: number) => {
    if (windUnit === "mph") {
      return Math.round(speed * 0.621371);
    }

    return speed;
  };
  return (
    <div
      className="flex min-h-screen transition-colors duration-500 w-full overflow-x-hidden"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <Header
          theme={theme}
          timezone={weather.timezone}
          onCitySelect={handleCitySelect}
          onCurrentLocation={handleCurrentLocation}
          onOpenLocations={() => navigate("/locations")}
          onOpenSettings={() => navigate("/settings")}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                key={weather.city}
                weather={weather}
                theme={theme}
                forecast={forecast}
                hourlyWeather={hourlyWeather}
                airQuality={airQuality}
                scoredActivities={scoredActivities}
                isLoading={isLoading}
                error={error}
                windUnit={windUnit}
                temperatureUnit={temperatureUnit}
                displayTemperature={displayTemperature}
                displayWindSpeed={displayWindSpeed}
                displayVisibility={displayVisibility}
                getUVLevel={getUVLevel}
              />
            }
          />

          <Route
            path="/locations"
            element={
              <LocationsPage
                locations={savedLocations}
                theme={theme}
                onSelectLocation={async (location) => {
                  await handleCitySelect(location);
                  navigate("/");
                }}
                onRemoveLocation={removeLocation}
              />
            }
          />

          <Route
            path="/settings"
            element={
              <SettingsPage
                theme={theme}
                temperatureUnit={temperatureUnit}
                windUnit={windUnit}
                onTemperatureUnitChange={setTemperatureUnit}
                onWindUnitChange={setWindUnit}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

function AppWithRouter() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWithRouter;
