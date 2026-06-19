import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import {
  AiOutlineDashboard,
  AiOutlineAppstoreAdd,
  AiOutlineShop,
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineTag,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";

const menuItems = [
  { path: "/dashborad/admin", icon: AiOutlineDashboard, label: "Overview", end: true },
  { path: "/dashborad/admin/orders", icon: AiOutlineShoppingCart, label: "Orders" },
  { path: "/dashborad/admin/products", icon: AiOutlineShop, label: "Products" },
  { path: "/dashborad/admin/create-product", icon: AiOutlineAppstoreAdd, label: "Add Product" },
  { path: "/dashborad/admin/create-category", icon: BiCategory, label: "Categories" },
  { path: "/dashborad/admin/coupons", icon: AiOutlineTag, label: "Coupons" },
  { path: "/dashborad/admin/users", icon: AiOutlineUser, label: "Users" },
];

const AdminMenu = () => {
  const [auth] = useAuth();

  return (
    <nav className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="p-5 border-b border-border bg-primary-500">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
          Admin Panel
        </p>
        <p className="font-semibold text-white text-sm truncate">
          {auth?.user?.name}
        </p>
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

export default AdminMenu;
