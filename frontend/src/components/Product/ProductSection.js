import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchProducts } from "../../redux/slices/productSlice";
import ProductGrid from "./ProductGrid";
import { AiOutlineArrowRight } from "react-icons/ai";

const ProductSection = ({
  title,
  subtitle,
  viewAllLink = "/products",
  sliceStart = 0,
  sliceEnd = 8,
  badge,
  badgeColor = "bg-accent-500",
  className = "",
}) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts({ page: 1, limit: 12 }));
    }
  }, [dispatch, products?.length]);

  const sectionProducts = products?.slice(sliceStart, sliceEnd) || [];
  if (!loading && !sectionProducts.length) return null;

  return (
    <section className={`section-padding ${className}`}>
      <div className="max-w-8xl mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              {badge && (
                <span
                  className={`inline-block ${badgeColor} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}
                >
                  {badge}
                </span>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-500 tracking-tight">
                {title}
              </h2>
              {subtitle && (
                <p className="text-primary-400 mt-1 text-sm sm:text-base">
                  {subtitle}
                </p>
              )}
            </div>
            <Link
              to={viewAllLink}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-accent-500 hover:text-accent-600 transition-colors flex-shrink-0"
            >
              View All
              <AiOutlineArrowRight size={16} />
            </Link>
          </div>

          <ProductGrid products={sectionProducts} loading={loading} columns={4} />

          <div className="sm:hidden mt-6 text-center">
            <Link
              to={viewAllLink}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-500"
            >
              View All
              <AiOutlineArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
