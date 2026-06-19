import React from "react";

const StatCard = ({ label, value, icon, trend }) => (
  <div className="bg-white rounded-2xl border border-border p-5 hover:shadow-soft transition-shadow">
    <div className="flex items-start justify-between gap-3 mb-3">
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center text-primary-500">
          {icon}
        </div>
      )}
      {trend && (
        <span className="text-xs font-medium text-success-600 bg-success-50 px-2 py-0.5 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-primary-500">{value}</p>
    <p className="text-sm text-primary-400 mt-1">{label}</p>
  </div>
);

export default StatCard;
