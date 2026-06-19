import React from "react";
import ProductCard from "./ProductCard";
import { ProductGridSkeleton } from "../UI/SkeletonLoader";
import EmptyState from "../UI/EmptyState";

const ProductGrid = ({
  products = [],
  loading = false,
  columns = 4,
  emptyTitle = "No products found",
  emptyDescription = "Try adjusting your filters or browse all categories.",
  emptyAction,
  emptyActionText,
  className = "",
}) => {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
  };

  if (loading) {
    return <ProductGridSkeleton count={8} columns={columns} />;
  }

  if (!products?.length) {
    return (
      <div className="bg-white rounded-2xl border border-border p-10 sm:p-12">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionText={emptyActionText}
          onAction={emptyAction}
        />
      </div>
    );
  }

  return (
    <div
      className={`grid ${gridCols[columns] || gridCols[4]} gap-4 lg:gap-6 ${className}`}
    >
      {products.map((product, index) => (
        <ProductCard key={product._id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductGrid;
