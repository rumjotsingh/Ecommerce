import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOverview,
  fetchTopProducts,
} from "../../redux/slices/analyticsSlice";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import StatCard from "../../components/profile/StatCard";
import AdminMenu from "../../components/layout/AdminMenu";
import { API_ENDPOINTS } from "../../config/api";
import {
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import { BiPackage } from "react-icons/bi";
import Card from "../../components/UI/Card";
import { DashboardCardSkeleton } from "../../components/UI/SkeletonLoader";
import moment from "moment";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const orderTotal = (order) =>
  (order?.products || []).reduce((sum, p) => sum + (p.price || 0), 0);

const AdminDashboard = () => {
  const [auth] = useAuth();
  const dispatch = useDispatch();
  const { overview, topProducts, loading } = useSelector(
    (state) => state.analytics
  );
  const [recentOrders, setRecentOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (auth?.token) {
      dispatch(fetchOverview());
      dispatch(fetchTopProducts());
    }
  }, [auth?.token, dispatch]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!auth?.token) return;
      try {
        const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL_ADMIN);
        setRecentOrders((data || []).slice(0, 5));
      } catch {
        setRecentOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };
    fetchRecentOrders();
  }, [auth?.token]);

  const stats = [
    {
      label: "Total Revenue",
      value: loading ? "…" : formatINR(overview?.totalRevenue),
      icon: <span className="text-lg font-semibold">₹</span>,
    },
    {
      label: "Total Orders",
      value: loading ? "…" : overview?.totalOrders || 0,
      icon: <AiOutlineShoppingCart size={20} />,
    },
    {
      label: "Total Products",
      value: loading ? "…" : overview?.totalProducts || 0,
      icon: <BiPackage size={20} />,
    },
    {
      label: "Pending Orders",
      value: loading ? "…" : overview?.pendingOrders || 0,
      icon: <AiOutlineUser size={20} />,
    },
  ];

  const statusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === "deliverd" || s === "delivered")
      return "bg-green-50 text-green-700";
    if (s === "processing" || s === "shipped")
      return "bg-amber-50 text-amber-700";
    if (s === "cancel") return "bg-red-50 text-red-700";
    return "bg-surface-muted text-primary-400";
  };

  return (
    <DashboardLayout title="Admin Dashboard" sidebar={AdminMenu}>
      <DashboardPageHeader
        title={`Welcome back, ${auth?.user?.name?.split(" ")[0] || "Admin"}`}
        subtitle={auth?.user?.email}
        icon={<AiOutlineUser size={20} />}
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))
          : stats.map((stat) => (
              <StatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
              />
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-primary-500">
              Recent Orders
            </h2>
            <Link
              to="/dashborad/admin/orders"
              className="text-sm font-medium text-accent-500 hover:text-accent-600"
            >
              View all
            </Link>
          </div>

          {ordersLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-surface-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : recentOrders.length > 0 ? (
            <ul className="space-y-3">
              {recentOrders.map((order, index) => (
                <li
                  key={order._id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl bg-surface-muted"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-primary-500">
                        #{index + 1}
                      </span>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${statusStyle(order.status)}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-primary-400 truncate">
                      {order.buyer?.name || "Customer"}
                    </p>
                    <p className="text-xs text-primary-300 mt-0.5">
                      {moment(order.createdAt).fromNow()}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary-500 whitespace-nowrap">
                    {formatINR(orderTotal(order))}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary-400 text-center py-8">
              No orders yet
            </p>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-primary-500">
              Top Products
            </h2>
            <Link
              to="/dashborad/admin/products"
              className="text-sm font-medium text-accent-500 hover:text-accent-600"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-surface-muted rounded-xl animate-pulse" />
              ))}
            </div>
          ) : topProducts?.length > 0 ? (
            <ul className="space-y-3">
              {topProducts.map((product, index) => (
                <li
                  key={product._id || index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-surface-muted"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-500 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-primary-500 truncate">
                      {product.name}
                    </p>
                    <p className="text-xs text-primary-400">
                      {product.totalSold || 0} sold
                    </p>
                  </div>
                  <p className="text-sm font-bold text-primary-500 whitespace-nowrap">
                    {formatINR(product.revenue)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-primary-400 text-center py-8">
              No sales data yet
            </p>
          )}
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-primary-500 mb-4">
          Quick Links
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { to: "/dashborad/admin/create-product", label: "Add Product" },
            { to: "/dashborad/admin/orders", label: "Manage Orders" },
            { to: "/dashborad/admin/coupons", label: "Coupons" },
            { to: "/dashborad/admin/users", label: "Users" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-center text-sm font-medium text-primary-500 px-4 py-3 rounded-xl border border-border hover:bg-surface-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
