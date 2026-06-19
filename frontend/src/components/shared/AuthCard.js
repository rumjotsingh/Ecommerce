import React from "react";
import { Link } from "react-router-dom";

const AuthCard = ({ title, subtitle, children, footer }) => (
  <div className="min-h-[calc(100vh-8rem)] bg-surface-muted flex items-center justify-center py-10 px-4">
    <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-3xl shadow-soft-lg border border-border overflow-hidden">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-primary-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,113,227,0.3)_0%,_transparent_60%)]" />
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold tracking-tight">
            ShopHub
          </Link>
          <p className="mt-8 text-white/70 text-sm leading-relaxed max-w-xs">
            Premium shopping with secure checkout, fast delivery, and curated
            products you'll love.
          </p>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p className="text-sm text-white/80">Secure payments via Razorpay</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p className="text-sm text-white/80">Free delivery on orders over ₹499</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
              ✓
            </div>
            <p className="text-sm text-white/80">Easy 7-day returns</p>
          </div>
        </div>
      </div>

      <div className="p-8 sm:p-10">
        <div className="lg:hidden mb-8">
          <Link to="/" className="text-xl font-bold text-primary-500">
            ShopHub
          </Link>
        </div>
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-500 tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-primary-400 mt-2 text-sm sm:text-base">{subtitle}</p>
          )}
        </div>
        {children}
        {footer && <div className="mt-6 pt-6 border-t border-border">{footer}</div>}
      </div>
    </div>
  </div>
);

export default AuthCard;
