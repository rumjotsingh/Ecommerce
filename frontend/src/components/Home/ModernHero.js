import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

const ModernHero = () => {
  return (
    <section className="relative overflow-hidden bg-primary-500">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,113,227,0.25)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(245,99,0,0.15)_0%,_transparent_50%)]" />

      <div className="relative max-w-8xl mx-auto container-padding py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-white/60 text-sm font-medium tracking-widest uppercase mb-4">
            Premium Shopping
          </p>
          <h1 className="text-display-sm sm:text-display-md lg:text-display-lg font-bold text-white tracking-tight text-balance mb-4">
            Discover Products You&apos;ll Love
          </h1>
          <p className="text-white/75 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
            Curated collections, trusted brands, and fast delivery — everything
            you need in one place.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-primary-500 px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/90 transition-all active:scale-[0.98] focus-ring"
            >
              Shop Now
              <AiOutlineArrowRight size={18} />
            </Link>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all focus-ring"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
