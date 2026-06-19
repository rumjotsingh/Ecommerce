import React, { useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ images = [], productName = "Product" }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  if (!images.length) {
    return (
      <div className="aspect-square bg-surface-muted rounded-2xl flex items-center justify-center">
        <span className="text-primary-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="relative aspect-square bg-surface-muted rounded-2xl overflow-hidden cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <motion.img
          key={selectedIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={images[selectedIndex]}
          alt={productName}
          className="w-full h-full object-contain p-4 transition-transform duration-200"
          style={
            isZoomed
              ? {
                  transform: "scale(2)",
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all focus-ring ${
                selectedIndex === index
                  ? "border-accent-500 shadow-soft"
                  : "border-border hover:border-primary-300"
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain p-1 bg-surface-muted"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
