import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";import {
  MagnifyingGlass,
  Bell,
  MapPin,
} from "@phosphor-icons/react";

import type { WeatherTheme } from "../types/weather";
import type { LocationResult } from "../services/geocodingApi";
import { searchCity } from "../services/geocodingApi";

interface HeaderProps {
  theme: WeatherTheme;
  onCitySelect: (
    location: LocationResult
  ) => void;
  onCurrentLocation: () => void;
}

function Header({
  theme,
  onCitySelect,
  onCurrentLocation,
}: HeaderProps) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

 useEffect(() => {
  if (!search.trim()) {
    return;
  }

  const timer = setTimeout(async () => {
    try {
      setIsSearching(true);

      const locations = await searchCity(search);

      setResults(locations);
    } catch (error) {
      console.error("City search failed:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  }, 400);

  return () => clearTimeout(timer);
}, [search]);

  const handleCitySelect = (location: LocationResult) => {
    setSearch("");
    setResults([]);
    onCitySelect(location);
  };
  const handleSearchChange = (
  event: ChangeEvent<HTMLInputElement>
) => {
  const value = event.target.value;

  setSearch(value);

  if (!value.trim()) {
    setResults([]);
  }
};

  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      {/* Greeting */}
      <div>
        <p
          className="text-sm"
          style={{ color: theme.mutedText }}
        >
          Good evening
        </p>

        <h2
          className="text-2xl font-semibold"
          style={{ color: theme.text }}
        >
          Weather Overview
        </h2>
      </div>

     {/* Right Section */}

<div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center md:gap-4">

  {/* Search */}

  <div className="relative w-full md:w-auto">

    <div
      className="flex w-full items-center gap-2 rounded-xl border px-4 py-3 md:w-72"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.mutedText,
      }}
    >
      <MagnifyingGlass
        size={20}
        style={{
          color: theme.mutedText,
        }}
      />

      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search city..."
        className="w-full bg-transparent text-sm outline-none"
        style={{
          color: theme.text,
        }}
      />

      {isSearching && (
        <span
          className="text-xs"
          style={{
            color: theme.mutedText,
          }}
        >
          ...
        </span>
      )}
    </div>


    {/* Search Results */}

    {results.length > 0 && (
      <div
        className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border shadow-lg"
        style={{
          backgroundColor: theme.card,
          borderColor: theme.mutedText,
        }}
      >
        {results.map((location) => (
          <button
            key={`${location.latitude}-${location.longitude}`}
            onClick={() =>
              handleCitySelect(location)
            }
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-black/5"
          >
            <MapPin
              size={18}
              style={{
                color: theme.primary,
              }}
            />

            <div>
              <p
                className="text-sm font-medium"
                style={{
                  color: theme.text,
                }}
              >
                {location.name}
              </p>

              <p
                className="text-xs"
                style={{
                  color: theme.mutedText,
                }}
              >
                {location.admin1
                  ? `${location.admin1}, `
                  : ""}
                {location.country}
              </p>
            </div>
          </button>
        ))}
      </div>
    )}

  </div>


  {/* Actions */}

  <div className="flex w-full items-center gap-3 md:w-auto">

    {/* Current Location */}

    <button
      onClick={onCurrentLocation}
      className="flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 md:flex-none"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.mutedText,
        color: theme.text,
      }}
    >
      <MapPin size={20} />

      <span className="text-sm">
        Current Location
      </span>
    </button>


    {/* Notification */}

    <button
      className="rounded-xl border p-3"
      style={{
        backgroundColor: theme.card,
        borderColor: theme.mutedText,
        color: theme.text,
      }}
    >
      <Bell size={21} />
    </button>

  </div>

</div>
    </header>
  );
}

export default Header;