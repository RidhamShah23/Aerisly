import CurrentWeather from "./CurrentWeather";
import WeatherStatCard from "./WeatherStatCard";
import ForecastCard from "./ForecastCard";
import TemperatureChart from "./TemperatureChart";
import ActivityRecommendation from "./ActivityRecommendation";
import AirQuality from "./AirQuality";
import SmartWeatherInsights from "./SmartWeatherInsights";
import WeatherSkeleton from "./WeatherSkeleton";

import { Droplets, Wind, Sun, Eye } from "lucide-react";
import type {
  CurrentWeather as CurrentWeatherType,
  ForecastDay,
  Activity,
  HourlyWeather,
  AirQuality as AirQualityType,
  WeatherTheme,
} from "../types/weather";

interface DashboardProps {
  weather: CurrentWeatherType;
  theme: WeatherTheme;
  forecast: ForecastDay[];
  hourlyWeather: HourlyWeather[];
  airQuality: AirQualityType | null;
  scoredActivities: Activity[];
  isLoading: boolean;
  error: string | null;
  windUnit: "km/h" | "mph";
  temperatureUnit: "C" | "F";
  displayTemperature: (temperature: number) => number;
  displayWindSpeed: (speed: number) => number;
  displayVisibility: string;
  getUVLevel: (uvIndex: number) => string;
}

function Dashboard({
  weather,
  theme,
  forecast,
  hourlyWeather,
  airQuality,
  scoredActivities,
  isLoading,
  error,
  windUnit,
  temperatureUnit,
  displayTemperature,
  displayWindSpeed,
  displayVisibility,
  getUVLevel,
}: DashboardProps) {
  return (
    <div>
      {isLoading ? (
        <WeatherSkeleton theme={theme} />
      ) : (
        <div className="mt-8 animate-fade-in-up">
          {error && (
            <div
              className="mt-8 rounded-2xl p-4 text-center text-sm"
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
              <div className="animate-fade-in-up">
                <WeatherStatCard
                  icon={Droplets}
                  label="Humidity"
                  value={`${weather.humidity}%`}
                  description="Normal"
                  theme={theme}
                />
              </div>

              <div className="animate-fade-in-up">
                <WeatherStatCard
                  icon={Wind}
                  label="Wind Speed"
                  value={`${displayWindSpeed(weather.windSpeed)} ${windUnit}`}
                  description="Moderate"
                  theme={theme}
                />
              </div>

              <div className="animate-fade-in-up">
                <WeatherStatCard
                  icon={Sun}
                  label="UV Index"
                  value={String(weather.uvIndex)}
                  description={getUVLevel(weather.uvIndex)}
                  theme={theme}
                />
              </div>

              <div className="animate-fade-in-up">
                <WeatherStatCard
                  icon={Eye}
                  label="Visibility"
                  value={`${displayVisibility} km`}
                  description="Fair"
                  theme={theme}
                />
              </div>
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
                {forecast.map((day, index) => (
                  <div
                    key={day.day}
                    className="animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <ForecastCard
                      key={day.day}
                      forecast={day}
                      theme={theme}
                      displayTemperature={displayTemperature}
                    />
                  </div>
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
  );
}

export default Dashboard;
