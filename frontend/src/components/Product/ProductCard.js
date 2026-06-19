import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
} from "react-icons/ai";
import { useAuth } from "../../context/auth";
import { getProductImageUrl } from "../../utils/productImage";
import toast from "react-hot-toast";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slices/wishlistSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductCard = ({ product, className = "", index = 0 }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auth] = useAuth();
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const imageUrl = getProductImageUrl(product);

  useEffect(() => {
    setIsInWishlist(
      wishlistItems?.some((item) => item._id === product._id) || false
    );
  }, [wishlistItems, product._id]);

  const isInCart = cartItems?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product.quantity === 0) {
      toast.error("Out of stock");
      return;
    }
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success("Added to cart");
  };

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    if (!auth?.token) {
      toast.error("Please sign in to save items");
      navigate("/login");
      return;
    }
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlist(product._id)).unwrap();
        toast.success("Removed from wishlist");
      } else {
        await dispatch(addToWishlist(product._id)).unwrap();
        toast.success("Saved to wishlist");
      }
    } catch (err) {
      toast.error(err || "Something went wrong");
    }
  };

  const discountPercentage =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const rating = product.rating || 4.0;
  const reviewCount = product.reviewCount || 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className={`group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-soft-lg hover:border-border-strong transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => navigate(`/product/${product.slug}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/product/${product.slug}`)
      }
      aria-label={`View ${product.name}`}
    >
      <div className="relative aspect-[4/5] bg-surface-muted overflow-hidden">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 skeleton" />
        )}
        {!imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
              imageLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-primary-300 text-sm">
            No image
          </div>
        )}

        {discountPercentage > 0 && (
          <span className="absolute top-3 left-3 bg-danger-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}

        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-soft hover:scale-110 transition-transform focus-ring"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isInWishlist ? (
            <AiFillHeart className="text-danger-500" size={18} />
          ) : (
            <AiOutlineHeart className="text-primary-400 hover:text-danger-500" size={18} />
          )}
        </button>

        <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0 || isInCart}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold shadow-soft transition-all focus-ring ${
              product.quantity === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : isInCart
                ? "bg-success-500 text-white"
                : "bg-primary-500 text-white hover:bg-primary-600"
            }`}
          >
            <AiOutlineShoppingCart size={16} />
            {product.quantity === 0
              ? "Out of Stock"
              : isInCart
              ? "In Cart"
              : "Add to Cart"}
          </button>
        </div>
      </div>

      <div className="p-4">
        {product.category && (
          <p className="text-[11px] text-primary-400 uppercase tracking-wider font-medium mb-1 truncate">
            {product.category.name}
          </p>
        )}

        <h3 className="text-sm font-semibold text-primary-500 line-clamp-2 leading-snug mb-2 group-hover:text-accent-500 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-1.5 mb-2">
          <span className="inline-flex items-center gap-0.5 bg-primary-500 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {rating.toFixed(1)}
            <AiFillStar size={10} />
          </span>
          <span className="text-xs text-primary-400">
            ({reviewCount > 0 ? reviewCount.toLocaleString() : "New"})
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary-500">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-primary-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {product.quantity === 0 ? (
          <p className="text-xs text-danger-500 font-medium mt-1.5">Out of Stock</p>
        ) : product.quantity <= 5 ? (
          <p className="text-xs text-warning-600 mt-1.5">Only {product.quantity} left</p>
        ) : null}
      </div>
    </motion.article>
  );
};

export default ProductCard;
