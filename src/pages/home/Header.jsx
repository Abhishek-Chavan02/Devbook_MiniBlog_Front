import React from "react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/outline";

const Header = ({ title }) => {
  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Page Title */}
      <h1 className="text-xl font-semibold">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <BellIcon className="h-6 w-6 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircleIcon className="h-8 w-8 text-gray-600" />
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
