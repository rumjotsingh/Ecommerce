import React from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";

const Terms = () => (
  <Layout title="Terms of Use — ShopHub">
    <StaticPage
      title="Terms of Use"
      subtitle="Please read these terms carefully before using ShopHub"
      updated="June 2025"
    >
      <Section title="Acceptance of Terms">
        <p>
          By accessing or using ShopHub, you agree to be bound by these Terms of
          Use. If you do not agree, please do not use our platform.
        </p>
      </Section>

      <Section title="Account Responsibilities">
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity under your account. Notify us
          immediately of any unauthorized use.
        </p>
      </Section>

      <Section title="Orders & Payments">
        <p>
          All orders are subject to availability and confirmation. Prices are
          listed in INR and include applicable taxes unless stated otherwise.
          Payment is processed securely through Razorpay.
        </p>
      </Section>

      <Section title="Product Information">
        <p>
          We strive for accurate descriptions and images. Minor variations in
          color or appearance may occur. We reserve the right to correct pricing
          errors.
        </p>
      </Section>

      <Section title="Limitation of Liability">
        <p>
          ShopHub is not liable for indirect, incidental, or consequential
          damages arising from your use of our services, to the fullest extent
          permitted by law.
        </p>
      </Section>

      <Section title="Changes">
        <p>
          We may update these terms at any time. Continued use after changes
          constitutes acceptance. Questions? Email{" "}
          <a href="mailto:legal@shophub.com" className="text-accent-500 hover:underline">
            legal@shophub.com
          </a>
          .
        </p>
      </Section>
    </StaticPage>
  </Layout>
);

export default Terms;
