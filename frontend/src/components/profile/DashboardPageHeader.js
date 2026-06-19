import React from "react";

const DashboardPageHeader = ({ title, subtitle, icon, action }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div className="flex items-start gap-4">
      {icon && (
        <div className="w-11 h-11 rounded-2xl bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <h1 className="text-2xl font-bold text-primary-500 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-primary-400 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    {action && <div className="flex-shrink-0">{action}</div>}
  </div>
);

export default DashboardPageHeader;
