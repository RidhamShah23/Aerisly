import { MagnifyingGlass, Bell, MapPin } from "@phosphor-icons/react";

function Header() {
  return (
    <header className="flex items-center justify-between gap-6">
      {/* Greeting */}
      <div>
        <p className="text-sm text-gray-500">Good evening</p>

        <h2 className="text-2xl font-semibold text-gray-800">
          Weather Overview
        </h2>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 w-72 px-4 py-3 bg-white rounded-xl border border-gray-100">
          <MagnifyingGlass
            size={20}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search city..."
            className="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* Location */}
        <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-gray-100 text-gray-600">
          <MapPin size={20} />
          <span className="text-sm">Ahmedabad</span>
        </button>

        {/* Notification */}
        <button className="p-3 bg-white rounded-xl border border-gray-100 text-gray-600">
          <Bell size={21} />
        </button>
      </div>
    </header>
  );
}

export default Header;