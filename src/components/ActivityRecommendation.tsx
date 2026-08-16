import {
  PersonSimpleRun,
  PersonSimpleWalk,
  Bicycle,
  PicnicTable,
  FilmSlate,
} from "@phosphor-icons/react";

import type { Icon } from "@phosphor-icons/react";
import type { Activity, WeatherTheme } from "../types/weather";

interface ActivityRecommendationProps {
  activities: Activity[];
  theme: WeatherTheme;
}

const activityIcons: Record<string, Icon> = {
  Running: PersonSimpleRun,
  Walking: PersonSimpleWalk,
  Cycling: Bicycle,
  Picnic: PicnicTable,
  "Indoor Movie": FilmSlate,
};

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Poor";
}

function ActivityRecommendation({
  activities,
  theme,
}: ActivityRecommendationProps) {
  return (
    <div
      className="rounded-3xl p-6 shadow-sm transition-colors duration-500"
      style={{
        backgroundColor: theme.card,
        color: theme.text,
      }}
    >
      <h3 className="text-xl font-semibold">
        What should I do today?
      </h3>

      <p
        className="mt-1 text-sm"
        style={{ color: theme.mutedText }}
      >
        Activity recommendations based on today's weather
      </p>

      <div className="mt-6 space-y-3">
        {activities.map((activity) => {
          const ActivityIcon = activityIcons[activity.name];

          return (
            <div
              key={activity.name}
              className="flex items-center gap-4 rounded-2xl p-4"
              style={{
                backgroundColor: theme.background,
              }}
            >
              <ActivityIcon
                size={28}
                weight="duotone"
                style={{ color: theme.primary }}
              />

              <div className="flex-1">
                <p className="font-medium">
                  {activity.name}
                </p>

                <p
                  className="text-xs"
                  style={{ color: theme.mutedText }}
                >
                  {getScoreLabel(activity.score)}
                </p>
              </div>

              <div className="text-right">
                <p
                  className="text-xl font-semibold"
                  style={{ color: theme.primary }}
                >
                  {activity.score}
                </p>

                <p
                  className="text-xs"
                  style={{ color: theme.mutedText }}
                >
                  
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ActivityRecommendation;