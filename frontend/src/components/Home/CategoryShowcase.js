import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { AiOutlineArrowRight } from "react-icons/ai";

const CategoryShowcase = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-8xl mx-auto container-padding">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featured = categories?.slice(0, 8) || [];
  if (!featured.length) return null;

  return (
    <section className="py-10 bg-white">
      <div className="max-w-8xl mx-auto container-padding">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary-500 tracking-tight">
            Shop by Category
          </h2>
          <Link
            to="/categories"
            className="text-sm font-medium text-accent-500 hover:text-accent-600 inline-flex items-center gap-1"
          >
            View All
            <AiOutlineArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
          {featured.map((category, i) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/category/${category.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-muted flex items-center justify-center mb-2 group-hover:bg-accent-50 group-hover:scale-105 transition-all duration-300">
                  <span className="text-xl sm:text-2xl font-bold text-accent-500">
                    {category.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-primary-500 group-hover:text-accent-500 transition-colors truncate w-full">
                  {category.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
