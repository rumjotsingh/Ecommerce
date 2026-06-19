import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import StatCard from "../../components/profile/StatCard";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import { API_ENDPOINTS } from "../../config/api";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiOutlineRight,
} from "react-icons/ai";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const Dashboard = () => {
  const [auth] = useAuth();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth?.token) return;
      try {
        const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL);
        setOrders(data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [auth?.token]);

  const totalSpent = useMemo(
    () =>
      orders.reduce(
        (sum, order) =>
          sum +
          (order.products || []).reduce((s, p) => s + (p.price || 0), 0),
        0
      ),
    [orders]
  );

  const userInfo = [
    { icon: AiOutlineUser, label: "Full Name", value: auth?.user?.name || "—" },
    { icon: AiOutlineMail, label: "Email", value: auth?.user?.email || "—" },
    { icon: AiOutlinePhone, label: "Phone", value: auth?.user?.phone || "—" },
    { icon: AiOutlineHome, label: "Address", value: auth?.user?.address || "—" },
  ];

  const quickLinks = [
    { to: "/dashborad/user/orders", label: "View Orders", icon: AiOutlineShoppingCart },
    { to: "/dashborad/user/wishlist", label: "My Wishlist", icon: AiOutlineHeart },
    { to: "/dashborad/user/profile", label: "Edit Profile", icon: AiOutlineUser },
  ];

  return (
    <DashboardLayout title="Dashboard" sidebar={UserMenu}>
      <DashboardPageHeader
        title={`Welcome, ${auth?.user?.name?.split(" ")[0] || "there"}`}
        subtitle="Here's an overview of your account"
        icon={<AiOutlineUser size={20} />}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Orders"
          value={loading ? "…" : orders.length}
          icon={<AiOutlineShoppingCart size={20} />}
        />
        <StatCard
          label="Total Spent"
          value={loading ? "…" : formatINR(totalSpent)}
          icon={<span className="text-lg font-semibold">₹</span>}
        />
        <StatCard
          label="Wishlist Items"
          value={wishlistItems?.length || 0}
          icon={<AiOutlineHeart size={20} />}
        />
        <StatCard label="Account Status" value="Active" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h2 className="text-lg font-semibold text-primary-500 mb-4">
            Account Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userInfo.map((info) => (
              <div
                key={info.label}
                className="flex items-start gap-3 p-4 rounded-xl bg-surface-muted"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center text-primary-500 flex-shrink-0">
                  <info.icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-primary-400 mb-0.5">{info.label}</p>
                  <p className="text-sm font-medium text-primary-500 break-words">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-primary-500 mb-4">
            Quick Actions
          </h2>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-surface-muted transition-colors group"
                >
                  <span className="flex items-center gap-3 text-sm font-medium text-primary-500">
                    <link.icon size={18} className="text-primary-400" />
                    {link.label}
                  </span>
                  <AiOutlineRight
                    size={16}
                    className="text-primary-300 group-hover:text-primary-500 transition-colors"
                  />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border">
            <Link to="/" className="block">
              <Button variant="primary" size="md" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
