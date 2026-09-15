export interface WeatherApiResponse {
  timezone: string;

  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    wind_speed_10m: number;
    uv_index: number;
    weather_code: number;
  };

  hourly: {
    temperature_2m: number[];
    precipitation_probability: number[];
    time: string[];
    visibility: number[];
  };

  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    time: string[];
    sunrise: string[];
    sunset: string[];
  };
}

export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<WeatherApiResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current:
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m,uv_index,weather_code",

    hourly: "temperature_2m,precipitation_probability,visibility",

    daily: "temperature_2m_max,temperature_2m_min,weather_code,sunrise,sunset",

    timezone: "auto",

    forecast_days: "5",
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}
