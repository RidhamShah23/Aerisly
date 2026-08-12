import {
  House,
  CalendarBlank,
  MapPin,
  CloudRain,
  Gear,
} from "@phosphor-icons/react";
import type { WeatherTheme } from "../types/weather";
import type { Icon } from "@phosphor-icons/react";

interface NavItem {
  label: string;
  icon: Icon;
}
interface SidebarProps {
  theme: WeatherTheme;
}
const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: House,
  },
  {
    label: "Forecast",
    icon: CalendarBlank,
  },
  {
    label: "Locations",
    icon: MapPin,
  },
  {
    label: "Rain Tracker",
    icon: CloudRain,
  },
  {
    label: "Settings",
    icon: Gear,
  },
];

function Sidebar({ theme }: SidebarProps) {
    return (
    <aside style={{
  backgroundColor: theme.card,
  color: theme.text,
  borderColor: theme.mutedText,
}}  className="w-64 min-h-screen border-r border-gray-100 p-6">
      <h1 className="text-2xl font-bold text-green-600 mb-10">
        Weatherly
      </h1>

      <nav className="space-y-2">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;

          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                index === 0
                  ? "bg-green-100 text-green-700"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              <IconComponent
                size={22}
                weight={index === 0 ? "fill" : "regular"}
              />

              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;