import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import { getProductImageUrl } from "../../utils/productImage";
import { BiPackage } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";

const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_ENDPOINTS.PRODUCT.GET_ALL);
      setProducts(data.products);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <DashboardLayout title="All Products" sidebar={AdminMenu}>
      <DashboardPageHeader
        title="All Products"
        subtitle={`${products?.length || 0} products in your store`}
        icon={<BiPackage size={20} />}
        action={
          <Link
            to="/dashborad/admin/create-product"
            className="text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 px-4 py-2 rounded-xl transition-colors"
          >
            Add Product
          </Link>
        }
      />

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-surface-muted rounded-2xl h-72" />
            </div>
          ))}
        </div>
      ) : products?.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {products.map((p) => (
            <Link
              key={p._id}
              to={`/dashborad/admin/product/${p.slug}`}
              className="group"
            >
              <Card hover className="h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-muted">
                  <img
                    src={getProductImageUrl(p)}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-soft opacity-0 group-hover:opacity-100 transition-opacity">
                    <AiOutlineEdit size={16} className="text-primary-500" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-primary-500 line-clamp-1 text-sm sm:text-base">
                    {p.name}
                  </h3>
                  <p className="text-xs text-primary-400 line-clamp-2 mt-1">
                    {p.description}
                  </p>
                  <p className="text-sm font-bold text-primary-500 mt-2">
                    {formatINR(p.price)}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="p-10 text-center">
          <BiPackage size={40} className="text-primary-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-primary-500 mb-2">
            No products yet
          </h3>
          <p className="text-sm text-primary-400 mb-6">
            Create your first product to get started
          </p>
          <Link
            to="/dashborad/admin/create-product"
            className="inline-flex text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 px-5 py-2.5 rounded-xl transition-colors"
          >
            Add Product
          </Link>
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Products;
