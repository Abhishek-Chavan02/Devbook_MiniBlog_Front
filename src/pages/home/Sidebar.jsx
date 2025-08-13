import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserIcon, LogoutIcon, MenuIcon, UsersIcon } from "@heroicons/react/outline";
import { USER_LOGOUT } from "../../redux/constant";
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const handleLogout = () => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Profile",
      path: "profile",
      icon: <UserIcon className="h-5 w-5" />,
    },
      {
      name: "User List",
      path: "user_list",
      icon: <UsersIcon className="h-5 w-5" />,
    },

  ];
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-blue-700 text-white min-h-screen flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>
          Dashboard
        </h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <MenuIcon className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex-1 px-2 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-2 rounded-md hover:bg-blue-800 transition ${
              location.pathname === item.path ? "bg-blue-900" : ""
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-2">
        <button
          className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-800 w-full"
          onClick={handleLogout} // ✅ moved onClick to button
        >
          <LogoutIcon className="h-5 w-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
