export interface AirQualityApiResponse {
  hourly: {
  time: string[];
  pm10: number[];
  pm2_5: number[];
  nitrogen_dioxide: number[];
  ozone: number[];
  us_aqi: number[];
};
}

export async function getAirQuality(
  latitude: number,
  longitude: number,
): Promise<AirQualityApiResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

hourly: "pm10,pm2_5,nitrogen_dioxide,ozone,us_aqi",

    timezone: "auto",

    past_hours: "24",

    forecast_hours: "1",
  });

  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?${params}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  return response.json();
}
