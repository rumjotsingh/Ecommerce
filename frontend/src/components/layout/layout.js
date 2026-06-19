import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

function Layout({
  children,
  title = "ShopHub — Premium Shopping Experience",
  description = "Discover premium products with fast delivery and exceptional service.",
  keyword = "ecommerce, shopping, fashion, electronics",
  author = "ShopHub",
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface-muted">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main className="flex-1" id="main-content">
        {children}
      </main>
      <Footer />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1d1d1f",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

export default Layout;
