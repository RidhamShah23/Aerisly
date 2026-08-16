import type { WeatherTheme } from "../types/weather";

interface WeatherSkeletonProps {
  theme: WeatherTheme;
}

function WeatherSkeleton({
  theme,
}: WeatherSkeletonProps) {
  return (
    <div className="mt-8 space-y-8">

      {/* Current Weather */}
      <div
        className="animate-pulse rounded-3xl p-7"
        style={{
          backgroundColor: theme.card,
        }}
      >
        <div
          className="h-4 w-28 rounded"
          style={{
            backgroundColor: theme.background,
          }}
        />

        <div className="mt-6 flex items-center justify-between">

          <div className="space-y-4">
            <div
              className="h-14 w-32 rounded-xl"
              style={{
                backgroundColor: theme.background,
              }}
            />

            <div
              className="h-5 w-24 rounded"
              style={{
                backgroundColor: theme.background,
              }}
            />

            <div
              className="h-4 w-32 rounded"
              style={{
                backgroundColor: theme.background,
              }}
            />
          </div>

          <div
            className="h-24 w-24 rounded-full"
            style={{
              backgroundColor: theme.background,
            }}
          />

        </div>
      </div>


      {/* Weather Stats */}
      <div className="grid grid-cols-3 gap-5">

        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-3xl p-6"
            style={{
              backgroundColor: theme.card,
            }}
          >
            <div
              className="h-5 w-24 rounded"
              style={{
                backgroundColor: theme.background,
              }}
            />

            <div
              className="mt-4 h-8 w-20 rounded"
              style={{
                backgroundColor: theme.background,
              }}
            />

            <div
              className="mt-3 h-4 w-28 rounded"
              style={{
                backgroundColor: theme.background,
              }}
            />
          </div>
        ))}

      </div>


      {/* Forecast */}
      <div>

        <div
          className="mb-4 h-6 w-36 animate-pulse rounded"
          style={{
            backgroundColor: theme.card,
          }}
        />

        <div className="grid grid-cols-5 gap-4">

          {[1, 2, 3, 4, 5].map(
            (item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-3xl"
                style={{
                  backgroundColor:
                    theme.card,
                }}
              />
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default WeatherSkeleton;