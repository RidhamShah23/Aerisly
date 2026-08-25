import {
  CloudRain,
  Drop,
  Thermometer,
  Sun,
  Wind,
  Cloud,
} from "@phosphor-icons/react";
import type {ElementType} from "react";
import type {
  CurrentWeather,
  HourlyWeather,
  WeatherTheme,
} from "../types/weather";

interface SmartWeatherInsightsProps {
  weather: CurrentWeather;
  hourlyWeather: HourlyWeather[];
  theme: WeatherTheme;
}

interface Insight {
  title: string;
  description: string;
  icon: ElementType;
}

function SmartWeatherInsights({
  weather,
  hourlyWeather,
  theme,
}: SmartWeatherInsightsProps) {

const insights: Insight[] = [];

const maxRainProbability =
  hourlyWeather.length > 0
    ? Math.max(
        ...hourlyWeather.map(
          (hour) => hour.rainProbability
        )
      )
    : 0;


// 🌧️ Rain
if (maxRainProbability >= 60) {
  insights.push({
    title: "Rain expected later",
    description:
      `Rain probability may reach ${maxRainProbability}% today. Carry an umbrella if you're heading out.`,
    icon: CloudRain,
  });
}


// 💧 Humidity
if (weather.humidity >= 80) {
  insights.push({
    title: "High humidity",
    description:
      `Humidity is currently ${weather.humidity}%. The air may feel uncomfortable.`,
    icon: Drop,
  });
}


// 🌡️ Feels-like
if (
  weather.feelsLike -
    weather.temperature >= 4
) {
  insights.push({
    title: "Feels warmer",
    description:
      `It feels like ${weather.feelsLike}°C even though the actual temperature is ${weather.temperature}°C.`,
    icon: Thermometer,
  });
}


// ☀️ UV
if (weather.uvIndex >= 7) {
  insights.push({
    title: "Strong UV levels",
    description:
      "UV exposure may be high around midday. Consider sun protection.",
    icon: Sun,
  });
}


// 💨 Wind
if (weather.windSpeed >= 30) {
  insights.push({
    title: "Strong winds",
    description:
      `Wind speeds are around ${weather.windSpeed} km/h. Outdoor activities may be affected.`,
    icon: Wind,
  });
}


// ☀️ Sunny weather
if (
  weather.condition === "sunny" &&
  maxRainProbability < 40 &&
  weather.uvIndex < 7
) {
  insights.push({
    title: "Great outdoor conditions",
    description:
      "Clear skies and low rain probability make this a good time for outdoor plans.",
    icon: Sun,
  });
}


// ☁️ Cloudy weather
if (
  weather.condition === "cloudy" &&
  maxRainProbability < 40
) {
  insights.push({
    title: "Mostly cloudy today",
    description:
      "Cloud cover is expected to dominate while rain chances remain low.",
    icon: Cloud,
  });
}


// Default insights

if (insights.length < 4) {
  insights.push({
    title: "Weather looks stable",
    description:
      "No major weather concerns are expected right now.",
    icon: Sun,
  });
}

if (insights.length < 4) {
  insights.push({
    title: "Conditions are manageable",
    description:
      "Current weather conditions are suitable for most daily activities.",
    icon: Cloud,
  });
}

if (insights.length < 4) {
  insights.push({
    title: "Stay updated",
    description:
      "Weather conditions can change, so check the forecast before making outdoor plans.",
    icon: Thermometer,
  });
}


const visibleInsights =
  insights.slice(0, 4);
  return (
    <div
      className="rounded-3xl p-6 shadow-sm"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >

      <div className="mb-5">

        <h3 className="text-xl font-semibold">
          Smart Weather Insights
        </h3>

        <p
          className="mt-1 text-sm"
          style={{
            color: theme.mutedText,
          }}
        >
          Important things to know about
          today's weather
        </p>

      </div>


      <div className="space-y-4">

        {visibleInsights.map(
          (insight, index) => {

            const Icon =
              insight.icon;

            return (
              <div
                key={`${insight.title}-${index}`}
                className="flex items-start gap-4 rounded-2xl p-4"
                style={{
                  backgroundColor:
                    theme.background,
                }}
              >

                <div
                  className="rounded-xl p-2"
                  style={{
                    backgroundColor:
                      `${theme.primary}20`,
                  }}
                >
                  <Icon
                    size={22}
                    weight="duotone"
                    style={{
                      color:
                        theme.primary,
                    }}
                  />
                </div>


                <div>

                  <p className="font-medium">
                    {insight.title}
                  </p>

                  <p
                    className="mt-1 text-sm"
                    style={{
                      color:
                        theme.mutedText,
                    }}
                  >
                    {insight.description}
                  </p>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default SmartWeatherInsights;