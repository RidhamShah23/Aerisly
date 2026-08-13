export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function getCurrentLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        new Error(
          "Geolocation is not supported by this browser."
        )
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },

      (error) => {
        reject(error);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  });
}
export interface ReverseGeocodingResult {
  city: string;
  state?: string;
  country?: string;
}

interface ReverseGeocodingResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    municipality?: string;
    state?: string;
    country?: string;
  };
}

export async function getCityFromCoordinates(
  latitude: number,
  longitude: number
): Promise<ReverseGeocodingResult> {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: "json",
    zoom: "10",
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?${params}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to find city from coordinates"
    );
  }

  const data: ReverseGeocodingResponse =
    await response.json();

  const address = data.address;

  const city =
    address?.city ??
    address?.town ??
    address?.village ??
    address?.municipality;

  if (!city) {
    throw new Error(
      "Could not determine city from coordinates"
    );
  }

  return {
    city,
    state: address?.state,
    country: address?.country,
  };
}