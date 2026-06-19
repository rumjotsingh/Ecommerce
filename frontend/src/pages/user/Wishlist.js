import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import UserMenu from "../../components/layout/UserMenu";
import {
  fetchWishlist,
} from "../../redux/slices/wishlistSlice";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "../../components/UI/Button";
import Card from "../../components/UI/Card";
import { ProductGridSkeleton } from "../../components/UI/SkeletonLoader";
import EmptyState from "../../components/UI/EmptyState";
import ProductCard from "../../components/Product/ProductCard";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  if (loading) {
    return (
      <DashboardLayout title="My Wishlist" sidebar={UserMenu}>
        <DashboardPageHeader
          title="My Wishlist"
          subtitle="Loading your saved items…"
          icon={<AiOutlineHeart size={20} />}
        />
        <ProductGridSkeleton count={8} columns={4} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="My Wishlist" sidebar={UserMenu}>
      <DashboardPageHeader
        title="My Wishlist"
        subtitle={
          items?.length
            ? `${items.length} saved item${items.length > 1 ? "s" : ""}`
            : "Your wishlist is empty"
        }
        icon={<AiOutlineHeart size={20} />}
      />

      {error && (
        <Card className="p-4 bg-red-50 border border-red-200">
          <p className="text-sm text-red-700">{error}</p>
        </Card>
      )}

      {items?.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            icon={<AiOutlineHeart className="w-16 h-16 text-primary-300" />}
            title="Your wishlist is empty"
            description="Save items you love and come back to them anytime."
            actionText="Continue Shopping"
            onAction={() => navigate("/")}
          />
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center pt-4">
            <Link to="/">
              <Button variant="outline" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Wishlist;
