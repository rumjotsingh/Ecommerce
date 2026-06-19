import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

const MobileDrawer = ({ isOpen, onClose, auth, categories, onLogout }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Shop All" },
    { to: "/categories", label: "Categories" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const userLinks = auth?.user
    ? [
        {
          to: `/dashborad/${auth.user.role === 1 ? "admin" : "user"}`,
          label: "Dashboard",
        },
        { to: "/dashborad/user/orders", label: "My Orders" },
        { to: "/dashborad/user/wishlist", label: "Wishlist" },
        { to: "/dashborad/user/profile", label: "Profile" },
      ]
    : [
        { to: "/login", label: "Sign In" },
        { to: "/register", label: "Create Account" },
      ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[min(320px,85vw)] bg-white z-50 lg:hidden shadow-soft-xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="text-lg font-semibold text-primary-500">Menu</span>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-muted focus-ring"
                aria-label="Close menu"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="block px-4 py-3 rounded-xl text-primary-500 font-medium hover:bg-surface-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {categories?.length > 0 && (
                <div className="pt-4 mt-4 border-t border-border">
                  <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-primary-400">
                    Categories
                  </p>
                  {categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat._id}
                      to={`/category/${cat.slug}`}
                      onClick={onClose}
                      className="block px-4 py-2.5 rounded-xl text-sm text-primary-400 hover:text-primary-500 hover:bg-surface-muted transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-4 mt-4 border-t border-border">
                <p className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-primary-400">
                  Account
                </p>
                {userLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={onClose}
                    className="block px-4 py-2.5 rounded-xl text-sm text-primary-400 hover:text-primary-500 hover:bg-surface-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                {auth?.user && (
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="block w-full text-left px-4 py-2.5 rounded-xl text-sm text-danger-500 hover:bg-danger-50 transition-colors"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
