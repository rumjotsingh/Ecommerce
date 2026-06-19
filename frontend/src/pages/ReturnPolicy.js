import React from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";

const ReturnPolicy = () => (
  <Layout title="Return Policy — ShopHub">
    <StaticPage
      title="Return & Refund Policy"
      subtitle="Hassle-free returns within 7 days of delivery"
      updated="June 2025"
    >
      <Section title="Return Window">
        <p>
          You may return most items within 7 days of delivery. Products must be
          unused, in original packaging, with all tags attached.
        </p>
      </Section>

      <Section title="How to Return">
        <ol className="list-decimal pl-5 space-y-2">
          <li>Go to My Orders in your account</li>
          <li>Select the item you want to return</li>
          <li>Choose a reason and submit the request</li>
          <li>Pack the item securely and hand it to our pickup partner</li>
        </ol>
      </Section>

      <Section title="Refunds">
        <p>
          Refunds are processed within 5–7 business days after we receive and
          inspect the returned item. The amount is credited to your original
          payment method.
        </p>
      </Section>

      <Section title="Non-Returnable Items">
        <ul className="list-disc pl-5 space-y-2">
          <li>Personal care and hygiene products</li>
          <li>Custom or personalized items</li>
          <li>Perishable goods</li>
          <li>Items marked as final sale</li>
        </ul>
      </Section>

      <Section title="Need Help?">
        <p>
          Contact{" "}
          <a href="mailto:returns@shophub.com" className="text-accent-500 hover:underline">
            returns@shophub.com
          </a>{" "}
          for return assistance.
        </p>
      </Section>
    </StaticPage>
  </Layout>
);

export default ReturnPolicy;
