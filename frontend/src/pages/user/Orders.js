import React, { useState, useEffect, useMemo } from "react";
import UserMenu from "../../components/layout/UserMenu";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import { useAuth } from "../../context/auth";
import { getProductImageUrl } from "../../utils/productImage";
import moment from "moment";
import Card from "../../components/UI/Card";
import Badge from "../../components/UI/Badge";
import EmptyState from "../../components/UI/EmptyState";
import {
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL);
      setOrders(data || []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
      case "deliverd":
        return "success";
      case "processing":
      case "shipped":
        return "warning";
      case "cancel":
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const orderTotal = (order) =>
    (order.products || []).reduce((sum, p) => sum + (p.price || 0), 0);

  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + orderTotal(o), 0),
    [orders]
  );

  return (
    <DashboardLayout title="Your Orders" sidebar={UserMenu}>
      <DashboardPageHeader
        title="My Orders"
        subtitle={
          loading
            ? "Loading your orders…"
            : `${orders.length} order${orders.length !== 1 ? "s" : ""} · ${formatINR(totalSpent)} total spent`
        }
        icon={<AiOutlineShoppingCart size={20} />}
      />

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-surface-muted rounded w-1/4" />
                <div className="h-24 bg-surface-muted rounded-xl" />
              </div>
            </Card>
          ))}
        </div>
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <Card key={order._id} className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-border">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-primary-500">
                    Order #{index + 1}
                  </span>
                  <Badge variant={getStatusColor(order?.status)}>
                    {order?.status || "Pending"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-primary-400">
                  <span className="flex items-center gap-1.5">
                    <AiOutlineClockCircle size={15} />
                    {moment(order?.createdAt).format("MMM DD, YYYY")}
                  </span>
                  {order?.payment?.razorpay_payment_id ? (
                    <span className="flex items-center gap-1.5 text-success-600 font-medium">
                      <AiOutlineCheckCircle size={15} />
                      Paid
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-red-600 font-medium">
                      <AiOutlineCloseCircle size={15} />
                      Unpaid
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                {order?.products?.map((product) => (
                  <div
                    key={product._id}
                    className="flex gap-4 p-3 rounded-xl bg-surface-muted"
                  >
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0 bg-white"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary-500 text-sm sm:text-base truncate">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-primary-400 mt-0.5 line-clamp-2">
                          {product.description}
                        </p>
                      )}
                      <p className="text-base font-bold text-primary-500 mt-1">
                        {formatINR(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 mt-4 border-t border-border text-sm">
                <span className="text-primary-400">
                  {order?.products?.length} item
                  {order?.products?.length !== 1 ? "s" : ""}
                </span>
                <span className="font-semibold text-primary-500">
                  Order total: {formatINR(orderTotal(order))}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8">
          <EmptyState
            icon={<AiOutlineShoppingCart className="w-16 h-16 text-primary-300" />}
            title="No orders yet"
            description="You haven't placed any orders yet. Start shopping to see them here."
            actionText="Browse Products"
            onAction={() => (window.location.href = "/")}
          />
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Orders;
