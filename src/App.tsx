import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import { useEffect, useState } from "react";
import { weatherThemes } from "./themes/weatherThemes";

import type {
  CurrentWeather as CurrentWeatherType,
  ForecastDay,
  Activity,
} from "./types/weather";
import {
  Droplets,
  Wind,
  Sun,
  Eye,
} from "lucide-react";import WeatherStatCard from "./components/WeatherStatCard";
import ForecastCard from "./components/ForecastCard";
import TemperatureChart from "./components/TemperatureChart";
import { calculateActivityScore } from "./utils/activityUtils";

import ActivityRecommendation from "./components/ActivityRecommendation";
import AirQuality from "./components/AirQuality";

import type { AirQuality as AirQualityType } from "./types/weather";

import type { LocationResult } from "./services/geocodingApi";
import { getWeather } from "./services/weatherApi";
import type { HourlyWeather } from "./types/weather";
import {
  mapCurrentWeather,
  mapForecast,
  mapHourlyWeather,
  mapAirQuality,
} from "./utils/weatherUtils";

import { getAirQuality } from "./services/airQualityApi";
import {
  getCurrentLocation,
  getCityFromCoordinates,
} from "./services/location";
import SmartWeatherInsights from "./components/SmartWeatherInsights";
import WeatherSkeleton from "./components/WeatherSkeleton";
import LocationsPage from "./components/LocationsPage";
import SettingsPage from "./components/SettingsPage";
import SunCard from "./components/SunCard";
import NotFoundPage from "./pages/NotFoundPage";

const activities: Activity[] = [
  {
    name: "Shopping",
    type: "indoor",
    score: 0,
  },
  {
    name: "Walking",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Outdoor Work",
    type: "outdoor",
    score: 0,
  },
  {
    name: "Picnic",
    type: "outdoor",
    score: 0,
  },
];

function App() {
  const navigate = useNavigate();

  const [weather, setWeather] = useState<CurrentWeatherType>({
    city: "Ahmedabad",
    temperature: 32,
    condition: "sunny",
    feelsLike: 35,
    humidity: 55,
    windSpeed: 12,
    uvIndex: 6,
    visibility: 10000,
    sunrise: "06:00",
    sunset: "18:30",
  });
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const theme = weatherThemes[weather.condition];
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[]>([]);

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

  const [airQuality, setAirQuality] = useState<AirQualityType | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleCurrentLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

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

      saveLocation(locationResult);
      await loadWeatherForLocation(
        coordinates.latitude,
        coordinates.longitude,
        location.city,
      );
    } catch (error) {
      console.error("Location weather failed:", error);

      setError("Couldn't determine your current location.");

      setIsLoading(false);
    }
  };
  const loadWeatherForLocation = async (
    latitude: number,
    longitude: number,
    city: string,
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const [weatherData, airQualityData] = await Promise.all([
        getWeather(latitude, longitude),
        getAirQuality(latitude, longitude),
      ]);

      const currentWeather = mapCurrentWeather(weatherData, city);

      const currentForecast = mapForecast(weatherData);

      const currentHourly = mapHourlyWeather(weatherData);

      const currentAirQuality = mapAirQuality(airQualityData);

      setWeather(currentWeather);
      setForecast(currentForecast);
      setHourlyWeather(currentHourly);
      setAirQuality(currentAirQuality);
    } catch (error) {
      console.error("Weather loading failed:", error);

      setError("Couldn't load weather data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadWeatherForLocation(23.0225, 72.5714, "Ahmedabad");
  }, []);

  const [savedLocations, setSavedLocations] = useState<LocationResult[]>(() => {
    const saved = localStorage.getItem("savedLocations");

    return saved ? JSON.parse(saved) : [];
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

      return [...previousLocations, location];
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
    try {
      saveLocation(location);

      await loadWeatherForLocation(
        location.latitude,
        location.longitude,
        location.name,
      );
    } catch (error) {
      console.error("City selection failed:", error);
    }
  };
  function getUVLevel(uvIndex: number) {
    if (uvIndex <= 2) return "Low";
    if (uvIndex <= 5) return "Moderate";
    if (uvIndex <= 7) return "High";
    if (uvIndex <= 10) return "Very High";

    return "Extreme";
  }
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
          onCitySelect={handleCitySelect}
          onCurrentLocation={handleCurrentLocation}
          onOpenLocations={() => navigate("/locations")}
          onOpenSettings={() => navigate("/settings")}
        />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {isLoading ? (
                  <WeatherSkeleton theme={theme} />
                ) : (
                  <div className="mt-8">
                    {error && (
                      <div
                        className="mt-6 rounded-2xl p-4 text-center text-sm"
                        style={{
                          backgroundColor: theme.card,
                          color: theme.text,
                        }}
                      >
                        ⚠️ {error}
                      </div>
                    )}
                    <div className="mt-8">
                      <CurrentWeather
                        weather={weather}
                        theme={theme}
                        displayTemperature={displayTemperature}
                      />

                      {/* Weather Stats */}

                      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <WeatherStatCard
                          icon={Droplets}
                          label="Humidity"
                          value={`${weather.humidity}%`}
                          description="Normal"
                          theme={theme}
                        />

                        <WeatherStatCard
                          icon={Wind}
                          label="Wind Speed"
                          value={`${displayWindSpeed(weather.windSpeed)} ${windUnit}`}
                          description="Moderate"
                          theme={theme}
                        />

                        <WeatherStatCard
                          icon={Sun}
                          label="UV Index"
                          value={String(weather.uvIndex)}
                          description={getUVLevel(weather.uvIndex)}
                          theme={theme}
                        />
                        <WeatherStatCard
                          icon={Eye}
                          label="Visibility"
                          value={`${displayVisibility} km`}
                          description=""
                          theme={theme}
                        />
                      </div>

                      {/* 5-Day Forecast */}

                      <div className="mt-8">
                        <h3
                          className="mb-4 text-xl font-semibold"
                          style={{
                            color: theme.text,
                          }}
                        >
                          5-Day Forecast
                        </h3>

                        <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:overflow-visible">
                          {forecast.map((day) => (
                            <ForecastCard
                              key={day.day}
                              forecast={day}
                              theme={theme}
                              displayTemperature={displayTemperature}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Temperature Chart */}

                      <div className="mt-8">
                        <TemperatureChart
                          theme={theme}
                          hourlyWeather={hourlyWeather}
                          displayTemperature={displayTemperature}
                          temperatureUnit={temperatureUnit}
                        />
                      </div>
                      {/* Sun & Daylight */}

                      <div className="mt-8">
                        <SunCard weather={weather} theme={theme} />
                      </div>

                      {/* Activity Recommendation */}

                      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.25fr]">
                        <ActivityRecommendation
                          activities={scoredActivities}
                          theme={theme}
                        />

                        <SmartWeatherInsights
                          weather={weather}
                          hourlyWeather={hourlyWeather}
                          theme={theme}
                        />
                      </div>

                      {/* Air Quality */}

                      <div className="mt-8">
                        {airQuality && (
                          <AirQuality airQuality={airQuality} theme={theme} />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            }
          />

          <Route
            path="/locations"
            element={
              <div className="mt-8">
                <LocationsPage
                  locations={savedLocations}
                  theme={theme}
                  onSelectLocation={async (location) => {
                    await handleCitySelect(location);
                    navigate("/");
                  }}
                  onRemoveLocation={removeLocation}
                />
              </div>
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
