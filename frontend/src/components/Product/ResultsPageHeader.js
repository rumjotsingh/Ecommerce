import React from "react";

const ResultsPageHeader = ({
  title,
  subtitle,
  count,
  countLabel = "products",
  icon,
  badge,
}) => (
  <div className="mb-8">
    {badge && (
      <span className="inline-block bg-accent-50 text-accent-600 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        {badge}
      </span>
    )}
    <div className="flex items-start gap-4">
      {icon && (
        <div className="hidden sm:flex w-12 h-12 rounded-2xl bg-primary-500 items-center justify-center flex-shrink-0 text-white">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-500 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-primary-400 mt-1 text-sm sm:text-base">{subtitle}</p>
        )}
        {typeof count === "number" && (
          <p className="text-sm text-primary-400 mt-2">
            {count === 0
              ? `No ${countLabel} found`
              : `${count} ${count === 1 ? countLabel.replace(/s$/, "") : countLabel} found`}
          </p>
        )}
      </div>
    </div>
  </div>
);

export default ResultsPageHeader;
