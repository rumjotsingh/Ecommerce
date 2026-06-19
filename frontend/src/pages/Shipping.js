import React from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";

const Shipping = () => (
  <Layout title="Shipping Information — ShopHub">
    <StaticPage
      title="Shipping & Delivery"
      subtitle="Everything you need to know about how we deliver your orders"
      updated="June 2025"
    >
      <Section title="Free Shipping">
        <p>
          Enjoy free standard shipping on all orders over ₹499. Orders below
          ₹499 incur a flat ₹49 delivery fee.
        </p>
      </Section>

      <Section title="Delivery Times">
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Standard:</strong> 5–7 business days</li>
          <li><strong>Express:</strong> 2–3 business days (available at checkout)</li>
          <li><strong>Metro cities:</strong> Often delivered within 3–5 days</li>
        </ul>
      </Section>

      <Section title="Order Tracking">
        <p>
          Once your order ships, you'll receive a tracking link via email. You
          can also view order status in your account under My Orders.
        </p>
      </Section>

      <Section title="Delivery Areas">
        <p>
          We currently deliver across India. Remote or pin-code restricted areas
          may experience slightly longer delivery times.
        </p>
      </Section>

      <Section title="Missed Delivery">
        <p>
          If you're unavailable, our courier will attempt delivery up to two
          more times. Contact support if you need to reschedule.
        </p>
      </Section>
    </StaticPage>
  </Layout>
);

export default Shipping;
