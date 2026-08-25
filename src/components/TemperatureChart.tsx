import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import type {
  Chart,
  TooltipItem,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
  CloudRain,
} from "@phosphor-icons/react";

import {
  useEffect,
  useRef,
} from "react";

import type {
  HourlyWeather,
  WeatherTheme,
} from "../types/weather";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface TemperatureChartProps {
  theme: WeatherTheme;
  hourlyWeather: HourlyWeather[];
}

function TemperatureChart({
  theme,
  hourlyWeather,
}: TemperatureChartProps) {

  const chartRef =
    useRef<Chart<"line"> | null>(null);

  const containerRef =
    useRef<HTMLDivElement | null>(null);

  const rainIconRefs =
    useRef<(HTMLDivElement | null)[]>([]);

  const labels = hourlyWeather.map(
    (hour) => hour.time
  );

  const temperatures = hourlyWeather.map(
    (hour) => hour.temperature
  );

  const data = {
    labels,

    datasets: [
      {
        label: "Temperature",

        data: temperatures,

        borderColor: theme.primary,

        backgroundColor:
          `${theme.primary}20`,

        fill: true,

        tension: 0.4,

        pointRadius: 5,

        pointBackgroundColor:
          theme.accent,

        pointBorderColor:
          theme.card,

        pointBorderWidth: 2,
      },
    ],
  };

  useEffect(() => {
  const positionRainIcons = () => {
    const chart = chartRef.current;
    const container = containerRef.current;

    if (!chart || !container) {
      return;
    }

    const canvas = chart.canvas;

    if (!canvas) {
      return;
    }

    const xScale = chart.scales.x;
    const yScale = chart.scales.y;

    if (!xScale || !yScale) {
      return;
    }

    const canvasRect =
      canvas.getBoundingClientRect();

    const containerRect =
      container.getBoundingClientRect();

    hourlyWeather.forEach((hour, index) => {
      const icon =
        rainIconRefs.current[index];

      if (!icon) {
        return;
      }

      if (hour.rainProbability < 40) {
        icon.style.display = "none";
        return;
      }

      const x =
        xScale.getPixelForValue(index);

      const y =
        yScale.getPixelForValue(
          hour.temperature
        );

      const left =
        canvasRect.left -
        containerRect.left +
        x;

      const top =
        canvasRect.top -
        containerRect.top +
        y;

      icon.style.display = "block";

      icon.style.left =
        `${left}px`;

      icon.style.top =
        `${top - 30}px`;
    });
  };

  const timer = window.setTimeout(
    positionRainIcons,
    0
  );

  const container =
    containerRef.current;

  if (!container) {
    return () => {
      window.clearTimeout(timer);
    };
  }

  const resizeObserver =
    new ResizeObserver(() => {
      positionRainIcons();
    });

  resizeObserver.observe(container);

  return () => {
    window.clearTimeout(timer);
    resizeObserver.disconnect();
  };
}, [hourlyWeather]);

  const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      callbacks: {
        label: (
          context: TooltipItem<"line">
        ) => {
          const index =
            context.dataIndex;

          const rain =
            hourlyWeather[index]
              ?.rainProbability ?? 0;

          return ` ${context.parsed.y}°C • Rain ${rain}%`;
        },
      },
    },
  },

  scales: {
    y: {
      beginAtZero: false,

      grid: {
        display: false,
      },

      ticks: {
        callback: (
          value: string | number
        ) => `${value}°`,
      },
    },

    x: {
      grid: {
        display: false,
      },
    },
  },
};

  return (
    <div
      className="rounded-3xl p-6 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >

      {/* Header */}

      <div className="mb-5">

        <h3 className="text-xl font-semibold">
          Today's Weather
        </h3>

        <p
          className="mt-1 text-sm"
          style={{
            color: theme.mutedText,
          }}
        >
          Temperature & precipitation
        </p>

      </div>


      {/* Chart */}

      <div
  ref={containerRef}
  className="relative h-64 w-full sm:h-72 lg:h-80"
>

 <Line
  ref={chartRef}
  data={data}
  options={options}
/>

        {/* Rain Indicators */}

        <div className="pointer-events-none absolute inset-0">

          {hourlyWeather.map(
            (hour, index) => {

              if (
                hour.rainProbability < 40
              ) {
                return null;
              }

              return (
                <div
                  key={`${hour.time}-${index}`}
                  ref={(element) => {
                    rainIconRefs.current[
                      index
                    ] = element;
                  }}
                  className="absolute -translate-x-1/2"
                  style={{
                    display: "none",
                  }}
                >

                  <CloudRain
                    size={22}
                    weight="duotone"
                    style={{
                      color: theme.primary,
                    }}
                  />

                </div>
              );
            }
          )}

        </div>

      </div>

    </div>
  );
}

export default TemperatureChart;

