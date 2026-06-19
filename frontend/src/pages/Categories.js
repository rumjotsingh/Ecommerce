import React from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/layout/layout";
import { AiOutlineArrowRight, AiOutlineAppstore } from "react-icons/ai";

const categoryColors = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-green-500 to-green-600",
  "from-yellow-500 to-yellow-600",
  "from-red-500 to-red-600",
  "from-indigo-500 to-indigo-600",
  "from-teal-500 to-teal-600",
  "from-orange-500 to-orange-600",
  "from-cyan-500 to-cyan-600",
];

const CategorySkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
    {[...Array(8)].map((_, i) => (
      <div key={i} className="skeleton h-36 sm:h-40 lg:h-48 rounded-2xl" />
    ))}
  </div>
);

const Categories = () => {
  const { categories, loading } = useCategory();
  const navigate = useNavigate();

  return (
    <Layout title="All Categories — ShopHub">
      <section className="section-padding bg-surface-muted">
        <div className="max-w-8xl mx-auto container-padding">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary-500 tracking-tight mb-2">
              All Categories
            </h1>
            <p className="text-primary-400">
              Browse by category and discover products you'll love
            </p>
          </div>

          {loading ? (
            <CategorySkeleton />
          ) : categories?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {categories.map((category, index) => (
                <button
                  key={category._id}
                  type="button"
                  onClick={() => navigate(`/category/${category.slug}`)}
                  className="group text-left focus-ring rounded-2xl"
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1">
                    <div
                      className={`bg-gradient-to-br ${
                        categoryColors[index % categoryColors.length]
                      } p-6 sm:p-8 flex flex-col items-center justify-center h-36 sm:h-40 lg:h-48`}
                    >
                      <div className="text-center text-white">
                        <div className="text-4xl sm:text-5xl font-bold mb-2">
                          {category.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-sm sm:text-base font-semibold">
                          {category.name}
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white rounded-full p-2.5 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <AiOutlineArrowRight className="text-primary-500" size={20} />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-border">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-muted rounded-full mb-4">
                <AiOutlineAppstore size={32} className="text-primary-300" />
              </div>
              <h3 className="text-xl font-semibold text-primary-500 mb-2">
                No Categories Found
              </h3>
              <p className="text-sm text-primary-400">
                Categories will appear here once they are added.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
