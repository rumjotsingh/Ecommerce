import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import AdminMenu from "../../components/layout/AdminMenu";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import { useAuth } from "../../context/auth";
import { getProductImageUrl } from "../../utils/productImage";
import moment from "moment";
import { Select } from "antd";
import Card from "../../components/UI/Card";
import Badge from "../../components/UI/Badge";
import EmptyState from "../../components/UI/EmptyState";
import {
  AiOutlineShoppingCart,
  AiOutlineClockCircle,
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const { Option } = Select;

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const orderTotal = (order) =>
  (order?.products || []).reduce((sum, p) => sum + (p.price || 0), 0);

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.ORDER.GET_ALL_ADMIN);
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

  const handleChange = async (orderId, value) => {
    try {
      await axios.put(API_ENDPOINTS.ORDER.UPDATE_STATUS(orderId), {
        status: value,
      });
      getOrders();
    } catch {
      /* keep existing status */
    }
  };

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "deliverd":
        return "success";
      case "processing":
        return "warning";
      case "shipped":
        return "info";
      case "cancel":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <DashboardLayout title="All Orders" sidebar={AdminMenu}>
      <DashboardPageHeader
        title="All Orders"
        subtitle={
          loading
            ? "Loading orders…"
            : `${orders.length} total order${orders.length !== 1 ? "s" : ""}`
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
              <div className="border-b border-border pb-4 mb-4 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-sm font-semibold text-primary-500">
                      Order #{index + 1}
                    </span>
                    <Badge variant={getStatusVariant(order?.status)}>
                      {order?.status || "Pending"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-primary-400">
                    <span className="flex items-center gap-1.5">
                      <AiOutlineClockCircle size={15} />
                      {moment(order?.createdAt).format("MMM DD, YYYY")}
                    </span>
                    {order?.payment?.razorpay_order_id ? (
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

                {order?.payment && (
                  <div className="p-4 rounded-xl bg-surface-muted text-xs sm:text-sm space-y-2">
                    <p className="font-semibold text-primary-500">Payment details</p>
                    {order.payment.razorpay_order_id && (
                      <p className="text-primary-400 break-all">
                        Order ID:{" "}
                        <span className="font-mono text-primary-500">
                          {order.payment.razorpay_order_id}
                        </span>
                      </p>
                    )}
                    {order.payment.razorpay_payment_id && (
                      <p className="text-primary-400 break-all">
                        Payment ID:{" "}
                        <span className="font-mono text-primary-500">
                          {order.payment.razorpay_payment_id}
                        </span>
                      </p>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-sm font-medium text-primary-500 whitespace-nowrap">
                    Update status
                  </label>
                  <Select
                    className="w-full sm:max-w-xs"
                    onChange={(value) => handleChange(order._id, value)}
                    defaultValue={order?.status}
                  >
                    {status.map((s) => (
                      <Option key={s} value={s}>
                        {s}
                      </Option>
                    ))}
                  </Select>
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
                      <h3 className="font-semibold text-primary-500 truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-primary-400 line-clamp-2 mt-0.5">
                        {product.description}
                      </p>
                      <p className="text-base font-bold text-primary-500 mt-1">
                        {formatINR(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pt-4 mt-4 border-t border-border text-sm">
                <span className="text-primary-400">
                  Buyer: {order?.buyer?.name}
                </span>
                <span className="font-semibold text-primary-500">
                  Total: {formatINR(orderTotal(order))}
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
            description="Orders will appear here once customers make purchases."
          />
        </Card>
      )}
    </DashboardLayout>
  );
};

export default AdminOrders;
