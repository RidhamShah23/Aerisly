import { useNavigate } from "react-router-dom";
import { MapPin, Trash } from "@phosphor-icons/react";
import type { LocationResult } from "../services/geocodingApi";
import type { WeatherTheme } from "../types/weather";

interface LocationsPageProps {
  locations: LocationResult[];
  theme: WeatherTheme;

  onSelectLocation: (location: LocationResult) => void;

  onRemoveLocation: (location: LocationResult) => void;
}

function LocationsPage({
  locations,
  theme,
  onSelectLocation,
  onRemoveLocation,
}: LocationsPageProps) {
  const navigate = useNavigate();
  return (
    <div className="mt-8">
      <button
  onClick={() => navigate("/")}
  className="mb-4 p-1.5 bg-blue-900 border-2 rounded-2xl hover:bg-yellow-400 transition-colors flex items-center gap-2 text-sm font-medium"
  style={{ color: theme.text }}
>
  ← Back to Dashboard
</button>
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Saved Locations</h2>

          <p
            className="mt-1 text-sm"
            style={{
              color: theme.mutedText,
            }}
          >
            Quickly switch between your saved cities
          </p>
        </div>

        <MapPin
          size={32}
          weight="duotone"
          style={{
            color: theme.primary,
          }}
        />
      </div>

      {/* Empty State */}

      {locations.length === 0 && (
        <div
          className="mt-8 rounded-3xl p-8 text-center"
          style={{
            backgroundColor: theme.card,
          }}
        >
          <MapPin
            size={40}
            weight="duotone"
            style={{
              color: theme.primary,
            }}
          />

          <h3 className="mt-4 text-lg font-semibold">No saved locations</h3>

          <p
            className="mt-2 text-sm"
            style={{
              color: theme.mutedText,
            }}
          >
            Search for a city and save it here.
          </p>
        </div>
      )}

      {/* Location Grid */}

      {locations.length > 0 && (
        <div
          className="
            mt-8
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {locations.map((location) => (
            <div
              key={`${location.latitude}-${location.longitude}`}
              className="
                relative
                cursor-pointer
                rounded-3xl
                p-6
                transition
                hover:-translate-y-1
              "
              style={{
                backgroundColor: theme.card,
              }}
              onClick={() => onSelectLocation(location)}
            >
              <MapPin
                size={28}
                weight="duotone"
                style={{
                  color: theme.primary,
                }}
              />

              <h3 className="mt-4 text-lg font-semibold">{location.name}</h3>

              <p
                className="mt-1 text-sm"
                style={{
                  color: theme.mutedText,
                }}
              >
                {location.admin1 ? `${location.admin1}, ` : ""}
                {location.country}
              </p>

              {/* Remove */}

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  onRemoveLocation(location);
                }}
                className="
                  absolute
                  right-5
                  top-5
                  rounded-xl
                  p-2
                  transition
                  hover:bg-black/5
                "
                title="Remove location"
              >
                <Trash
                  size={20}
                  style={{
                    color: theme.mutedText,
                  }}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationsPage;
