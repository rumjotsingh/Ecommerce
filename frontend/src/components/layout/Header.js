import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import useDebounce from "../../hooks/useDebounce";
import { fetchWishlistCount } from "../../redux/slices/wishlistSlice";
import { useSearch } from "../../context/search";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";
import MobileDrawer from "./MobileDrawer";
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineUser,
} from "react-icons/ai";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { items: cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { count: wishlistCount } = useSelector((state) => state.wishlist);
  const { categories } = useCategory();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [values, setValues] = useSearch();
  const debouncedKeyword = useDebounce(values.keyword, 400);
  const userMenuRef = useRef(null);

  useEffect(() => {
    if (auth?.token) dispatch(fetchWishlistCount());
  }, [auth?.token, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const searchProducts = async () => {
      if (!debouncedKeyword.trim()) return;
      try {
        const { data } = await axios.get(
          API_ENDPOINTS.PRODUCT.SEARCH(debouncedKeyword)
        );
        setValues((prev) => ({ ...prev, results: data }));
      } catch (error) {
        console.error(error);
      }
    };
    if (searchFocused && debouncedKeyword.trim()) searchProducts();
  }, [debouncedKeyword, searchFocused, setValues]);

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Signed out successfully");
    navigate("/login");
    setUserMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!values.keyword.trim()) return;
    navigate(`/search?q=${encodeURIComponent(values.keyword.trim())}`);
    setSearchFocused(false);
  };

  const cartItemsCount =
    cart?.reduce((total, item) => total + (item.orderQuantity || 1), 0) || 0;

  return (
    <>
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <nav className="max-w-8xl mx-auto container-padding" aria-label="Main navigation">
          <div className="flex items-center justify-between h-16 gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 focus-ring rounded-lg"
            >
              <span className="text-xl font-bold tracking-tight text-primary-500">
                ShopHub
              </span>
            </Link>

            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-4 relative"
              role="search"
            >
              <div className="relative w-full">
                <AiOutlineSearch
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"
                  size={18}
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search products, brands..."
                  className="w-full py-2.5 pl-11 pr-4 rounded-full bg-surface-muted border border-transparent text-sm text-primary-500 placeholder:text-primary-400 focus:bg-white focus:border-border-strong focus:outline-none focus:ring-2 focus:ring-accent-500/20 transition-all"
                  value={values.keyword}
                  onChange={(e) =>
                    setValues({ ...values, keyword: e.target.value })
                  }
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  aria-label="Search products"
                />
                {searchFocused && values.results?.length > 0 && values.keyword && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-soft-lg border border-border overflow-hidden z-50">
                    {values.results.slice(0, 5).map((product) => (
                      <Link
                        key={product._id}
                        to={`/product/${product.slug}`}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-muted transition-colors"
                        onClick={() => setSearchFocused(false)}
                      >
                        <span className="text-sm text-primary-500 line-clamp-1">
                          {product.name}
                        </span>
                        <span className="text-sm font-medium text-accent-500 ml-auto">
                          ₹{product.price?.toLocaleString()}
                        </span>
                      </Link>
                    ))}
                    <button
                      type="submit"
                      onClick={() => navigate(`/search?q=${encodeURIComponent(values.keyword.trim())}`)}
                      className="w-full px-4 py-3 text-sm text-accent-500 font-medium border-t border-border hover:bg-surface-muted"
                    >
                      View all results for &ldquo;{values.keyword}&rdquo;
                    </button>
                  </div>
                )}
              </div>
            </form>

            <div className="flex items-center gap-1 sm:gap-2">
              {auth?.user ? (
                <div className="relative hidden sm:block" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-primary-500 hover:bg-surface-muted focus-ring transition-colors"
                    aria-expanded={userMenuOpen}
                    aria-haspopup="true"
                  >
                    <AiOutlineUser size={20} />
                    <span className="max-w-[100px] truncate hidden lg:inline">
                      {auth.user.name}
                    </span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-soft-lg border border-border py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-medium text-primary-500 truncate">
                          {auth.user.name}
                        </p>
                        <p className="text-xs text-primary-400 truncate">
                          {auth.user.email}
                        </p>
                      </div>
                      <Link
                        to={`/dashborad/${auth?.user?.role === 1 ? "admin" : "user"}`}
                        className="block px-4 py-2.5 text-sm text-primary-500 hover:bg-surface-muted"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {auth?.user?.role !== 1 && (
                        <>
                          <Link
                            to="/dashborad/user/orders"
                            className="block px-4 py-2.5 text-sm text-primary-500 hover:bg-surface-muted"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            My Orders
                          </Link>
                          <Link
                            to="/dashborad/user/profile"
                            className="block px-4 py-2.5 text-sm text-primary-500 hover:bg-surface-muted"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            Profile
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2.5 text-sm text-danger-500 hover:bg-danger-50"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-primary-500 hover:bg-surface-muted rounded-xl transition-colors focus-ring"
                >
                  Sign In
                </Link>
              )}

              {auth?.user && (
                <Link
                  to="/dashborad/user/wishlist"
                  className="relative p-2.5 rounded-xl text-primary-500 hover:bg-surface-muted focus-ring transition-colors"
                  aria-label={`Wishlist${wishlistCount ? `, ${wishlistCount} items` : ""}`}
                >
                  <AiOutlineHeart size={22} />
                  {wishlistCount > 0 && (
                    <span className="absolute top-1 right-1 bg-accent-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-medium">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>
              )}

              <Link
                to="/cart"
                className="relative p-2.5 rounded-xl text-primary-500 hover:bg-surface-muted focus-ring transition-colors"
                aria-label={`Cart${cartItemsCount ? `, ${cartItemsCount} items` : ""}`}
              >
                <AiOutlineShoppingCart size={22} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-1 right-1 bg-accent-500 text-white text-[10px] min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center font-medium">
                    {cartItemsCount > 9 ? "9+" : cartItemsCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2.5 rounded-xl text-primary-500 hover:bg-surface-muted focus-ring"
                aria-label="Open menu"
              >
                <AiOutlineMenu size={22} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="md:hidden pb-3" role="search">
            <div className="relative">
              <AiOutlineSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"
                size={18}
              />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full py-2.5 pl-11 pr-4 rounded-full bg-surface-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20"
                value={values.keyword}
                onChange={(e) =>
                  setValues({ ...values, keyword: e.target.value })
                }
                aria-label="Search products"
              />
            </div>
          </form>
        </nav>
      </header>

      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        auth={auth}
        categories={categories}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
