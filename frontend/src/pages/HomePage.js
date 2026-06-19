import React from "react";
import Layout from "../components/layout/layout";
import ModernHero from "../components/Home/ModernHero";
import TrustBadges from "../components/Home/TrustBadges";
import CategoryShowcase from "../components/Home/CategoryShowcase";
import ProductSection from "../components/Product/ProductSection";
import OffersSection from "../components/Home/OffersSection";
import NewsletterSection from "../components/Home/NewsletterSection";

const HomePage = () => {
  return (
    <Layout title="ShopHub — Premium Shopping Experience">
      <ModernHero />
      <TrustBadges />
      <CategoryShowcase />
      <OffersSection />
      <ProductSection
        title="Featured For You"
        subtitle="Handpicked products we think you'll love"
        sliceStart={0}
        sliceEnd={8}
        className="bg-white"
      />
      <ProductSection
        title="Trending Now"
        subtitle="What everyone's shopping this week"
        sliceStart={0}
        sliceEnd={4}
        badge="Hot"
        badgeColor="bg-danger-500"
        className="bg-surface-muted"
      />
      <ProductSection
        title="Flash Sale"
        subtitle="Limited time offers — grab them before they're gone"
        sliceStart={4}
        sliceEnd={8}
        badge="⚡ Ends Soon"
        badgeColor="bg-secondary-500"
        className="bg-white"
      />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh drops from top brands"
        sliceStart={8}
        sliceEnd={12}
        badge="New"
        badgeColor="bg-accent-500"
        className="bg-surface-muted"
      />
      <ProductSection
        title="Best Sellers"
        subtitle="Our most loved products"
        sliceStart={0}
        sliceEnd={4}
        className="bg-white"
      />
      <NewsletterSection />
    </Layout>
  );
};

export default HomePage;
