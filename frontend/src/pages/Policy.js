import React from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";

const Policy = () => (
  <Layout title="Privacy Policy — ShopHub">
    <StaticPage
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information"
      updated="June 2025"
    >
      <Section title="Information We Collect">
        <p>
          We collect information you provide when creating an account, placing
          orders, or contacting support — including your name, email, phone,
          address, and payment details.
        </p>
      </Section>

      <Section title="How We Use Your Information">
        <p>
          Your data is used to process orders, improve our services, send order
          updates, and respond to your inquiries. We never sell your personal
          information to third parties.
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We use industry-standard encryption and secure payment processing
          through Razorpay. Access to your data is restricted to authorized
          personnel only.
        </p>
      </Section>

      <Section title="Cookies">
        <p>
          We use cookies to remember your preferences and improve your browsing
          experience. You can disable cookies in your browser settings.
        </p>
      </Section>

      <Section title="Your Rights">
        <p>
          You may request access, correction, or deletion of your personal data
          at any time by contacting{" "}
          <a href="mailto:privacy@shophub.com" className="text-accent-500 hover:underline">
            privacy@shophub.com
          </a>
          .
        </p>
      </Section>
    </StaticPage>
  </Layout>
);

export default Policy;
