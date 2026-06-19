import React, { useState, useEffect, useCallback } from "react";
import Layout from "../components/layout/layout";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import toast from "react-hot-toast";
import ResultsPageHeader from "../components/Product/ResultsPageHeader";
import ProductGrid from "../components/Product/ProductGrid";
import Button from "../components/UI/Button";
import { BiCategory } from "react-icons/bi";
import { AiOutlineArrowLeft } from "react-icons/ai";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const getProductsByCat = useCallback(async () => {
    if (!params.slug) return;
    try {
      setLoading(true);
      const { data } = await axios.get(
        API_ENDPOINTS.PRODUCT.CATEGORY(params.slug)
      );
      setProducts(data?.products || []);
      setCategory(data?.category || null);
    } catch (error) {
      console.error(error);
      toast.error("Error loading products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  useEffect(() => {
    getProductsByCat();
  }, [getProductsByCat]);

  return (
    <Layout title={`${category?.name || "Category"} — ShopHub`}>
      <section className="section-padding bg-surface-muted min-h-[calc(100vh-12rem)]">
        <div className="max-w-8xl mx-auto container-padding">
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-sm text-primary-400 hover:text-accent-500 mb-6 transition-colors"
          >
            <AiOutlineArrowLeft size={16} />
            All Categories
          </Link>

          <ResultsPageHeader
            title={category?.name || "Category"}
            subtitle="Products in this category"
            count={loading ? undefined : products.length}
            badge={category?.name ? "Category" : undefined}
            icon={<BiCategory size={22} />}
          />

          <ProductGrid
            products={products}
            loading={loading}
            columns={4}
            emptyTitle="No products in this category"
            emptyDescription="This category doesn't have any products yet. Check back soon or explore others."
            emptyActionText="Browse Categories"
            onEmptyAction={() => navigate("/categories")}
          />

          {!loading && products.length > 0 && (
            <div className="mt-10 text-center">
              <Link to="/products">
                <Button variant="outline">View All Products</Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryProduct;
