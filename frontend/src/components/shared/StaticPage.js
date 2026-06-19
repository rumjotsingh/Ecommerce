import React from "react";
import { Link } from "react-router-dom";

const StaticPage = ({ title, subtitle, children, updated }) => (
  <div className="bg-surface-muted min-h-[calc(100vh-12rem)]">
    <div className="bg-primary-500 text-white">
      <div className="max-w-3xl mx-auto container-padding py-12 sm:py-16 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-sm sm:text-base max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
        {updated && (
          <p className="text-white/50 text-xs mt-4">Last updated: {updated}</p>
        )}
      </div>
    </div>

    <div className="max-w-3xl mx-auto container-padding -mt-8 pb-16">
      <div className="bg-white rounded-2xl shadow-soft-lg border border-border p-6 sm:p-10">
        <div className="prose prose-sm sm:prose-base max-w-none text-primary-400 space-y-6">
          {children}
        </div>
      </div>

      <p className="text-center text-sm text-primary-400 mt-8">
        Need help?{" "}
        <Link to="/contact" className="text-accent-500 font-medium hover:underline">
          Contact our support team
        </Link>
      </p>
    </div>
  </div>
);

export const Section = ({ title, children }) => (
  <section>
    <h2 className="text-lg font-semibold text-primary-500 mb-3">{title}</h2>
    <div className="text-primary-400 leading-relaxed space-y-2">{children}</div>
  </section>
);

export default StaticPage;
