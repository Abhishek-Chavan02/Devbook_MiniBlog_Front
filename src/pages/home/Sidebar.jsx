import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserIcon, LogoutIcon, MenuIcon, UsersIcon, PencilAltIcon, HomeIcon } from "@heroicons/react/outline";
import { USER_LOGOUT } from "../../redux/constant";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

const handleLogout = () => {
  Swal.fire({
    icon: "success",
    title: "Logged Out",
    text: "You have been logged out successfully.",
    timer: 1500,
    showConfirmButton: false,
  }).then(() => {
    dispatch({ type: USER_LOGOUT });
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  });
};

  let menuItems = [
       {
      name: "Home",
      path: "/home",
      icon: <HomeIcon className="h-5 w-5" />,
    },
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
     {
      name: "Blog",
      path: "blog",
      icon: <PencilAltIcon className="h-5 w-5" />,
    },
    
  ];

  if (userInfo?.roleId !== "1001") {
    menuItems = menuItems.filter((item) => item.name !== "User List");
  }

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-blue-700 text-white min-h-screen flex flex-col transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-lg font-bold ${!isOpen && "hidden"}`}>Dashboard</h1>
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
              location.pathname.endsWith(item.path) ? "bg-blue-900" : ""
            }`}
          >
            {item.icon}
            {isOpen && <span>{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="p-2">
        <button
          className="flex items-center gap-3 p-2 rounded-md hover:bg-blue-800 w-full cursor-pointer"
          onClick={handleLogout}
        >
          <LogoutIcon className="h-5 w-5" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
