import type { Icon } from "@phosphor-icons/react";
import type { WeatherTheme } from "../types/weather";

interface WeatherStatCardProps {
  icon: Icon;
  label: string;
  value: string;
  description: string;
  theme: WeatherTheme;
}

function WeatherStatCard({
  icon: IconComponent,
  label,
  value,
  description,
  theme,
}: WeatherStatCardProps) {
  return (
    <div
      className="rounded-2xl p-5 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: theme.background,
          color: theme.primary,
        }}
      >
        <IconComponent size={22} weight="duotone" />
      </div>

      <p
        className="mt-4 text-sm"
        style={{ color: theme.mutedText }}
      >
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold">
        {value}
      </p>

      <p
        className="mt-1 text-xs"
        style={{ color: theme.mutedText }}
      >
        {description}
      </p>
    </div>
  );
}

export default WeatherStatCard;