import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineHeart,
} from "react-icons/ai";

const menuItems = [
  { path: "/dashborad/user", icon: AiOutlineDashboard, label: "Overview", end: true },
  { path: "/dashborad/user/orders", icon: AiOutlineShoppingCart, label: "Orders" },
  { path: "/dashborad/user/wishlist", icon: AiOutlineHeart, label: "Wishlist" },
  { path: "/dashborad/user/profile", icon: AiOutlineUser, label: "Profile" },
];

const UserMenu = () => {
  const [auth] = useAuth();

  return (
    <nav className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold text-sm">
            {auth?.user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-primary-500 text-sm truncate">
              {auth?.user?.name}
            </p>
            <p className="text-xs text-primary-400 truncate">{auth?.user?.email}</p>
          </div>
        </div>
      </div>

      <ul className="p-3 space-y-1">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors focus-ring ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-primary-400 hover:bg-surface-muted hover:text-primary-500"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserMenu;
