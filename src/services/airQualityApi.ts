export interface AirQualityApiResponse {
  current: {
    us_aqi: number;
    pm2_5: number;
    pm10: number;
    ozone: number;
    nitrogen_dioxide: number;
  };
}

export async function getAirQuality(
  latitude: number,
  longitude: number
): Promise<AirQualityApiResponse> {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current:
      "us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide",

    timezone: "auto",
  });

  const response = await fetch(
    `https://air-quality-api.open-meteo.com/v1/air-quality?${params}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch air quality data"
    );
  }

  return response.json();
}