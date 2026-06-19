import React from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";

const About = () => (
  <Layout title="About Us — ShopHub">
    <StaticPage
      title="About ShopHub"
      subtitle="Your trusted destination for premium products and seamless shopping"
    >
      <Section title="Who We Are">
        <p>
          ShopHub is a modern e-commerce platform built to make online shopping
          simple, secure, and enjoyable. We curate quality products across
          electronics, fashion, home, and more — all at competitive prices.
        </p>
      </Section>

      <Section title="Our Mission">
        <p>
          We believe everyone deserves access to great products with fast
          delivery and honest service. From browsing to checkout, every step is
          designed with you in mind.
        </p>
      </Section>

      <Section title="Why Shop With Us">
        <ul className="list-disc pl-5 space-y-2">
          <li>Curated product selection from trusted brands</li>
          <li>Secure payments powered by Razorpay</li>
          <li>Free delivery on orders over ₹499</li>
          <li>Easy 7-day return policy</li>
          <li>24/7 customer support</li>
        </ul>
      </Section>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        {[
          { value: "10K+", label: "Products" },
          { value: "50K+", label: "Happy Customers" },
          { value: "100+", label: "Categories" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-4 bg-surface-muted rounded-xl">
            <p className="text-2xl font-bold text-primary-500">{stat.value}</p>
            <p className="text-xs text-primary-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </StaticPage>
  </Layout>
);

export default About;
