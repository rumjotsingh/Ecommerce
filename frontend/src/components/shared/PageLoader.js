import React from "react";

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-primary-400">Loading...</p>
    </div>
  </div>
);

export default PageLoader;
