import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import type { WeatherTheme } from "../types/weather";

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
}

function TemperatureChart({
  theme,
}: TemperatureChartProps) {

  const data = {
    labels: ["9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],

    datasets: [
      {
        label: "Temperature",
        data: [27, 30, 32, 31, 28],

        borderColor: theme.primary,

        backgroundColor: `${theme.primary}20`,

        fill: true,

        tension: 0.4,

        pointRadius: 4,

        pointBackgroundColor: theme.accent,
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        enabled: true,
      },
    },

    scales: {
      y: {
        beginAtZero: false,

        grid: {
          display: false,
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
      <div className="mb-5">
        <h3 className="text-xl font-semibold">
          Temperature
        </h3>

        <p
          className="mt-1 text-sm"
          style={{ color: theme.mutedText }}
        >
          Today's temperature trend
        </p>
      </div>

      <Line data={data} options={options} />
    </div>
  );
}

export default TemperatureChart;