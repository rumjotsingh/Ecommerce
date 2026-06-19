import React, { useState } from "react";
import Layout from "../components/layout/layout";
import StaticPage from "../components/shared/StaticPage";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Button from "../components/UI/Button";

const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse products, add items to your cart, and proceed to checkout. Sign in or create an account, confirm your address, and pay securely via Razorpay.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept credit/debit cards, UPI, net banking, and wallets through Razorpay. All transactions are encrypted and secure.",
  },
  {
    q: "How long does shipping take?",
    a: "Standard delivery takes 5–7 business days. Express options (2–3 days) are available at checkout. Free shipping on orders over ₹499.",
  },
  {
    q: "Can I track my order?",
    a: "Yes. You'll receive a tracking link by email once your order ships. You can also check status under My Orders in your account.",
  },
  {
    q: "What is your return policy?",
    a: "Most items can be returned within 7 days if unused and in original packaging. See our Return Policy page for full details.",
  },
  {
    q: "How do I reset my password?",
    a: "Click Forgot Password on the sign-in page. Enter your email, security answer, and new password to reset your account.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <Layout title="FAQ — ShopHub">
      <StaticPage
        title="Frequently Asked Questions"
        subtitle="Quick answers to common questions about shopping with ShopHub"
      >
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-muted transition-colors focus-ring"
                aria-expanded={open === i}
              >
                <span className="text-sm font-semibold text-primary-500">
                  {faq.q}
                </span>
                {open === i ? (
                  <AiOutlineMinus className="text-primary-400 flex-shrink-0" size={18} />
                ) : (
                  <AiOutlinePlus className="text-primary-400 flex-shrink-0" size={18} />
                )}
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm text-primary-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-surface-muted rounded-xl text-center">
          <p className="text-sm text-primary-400 mb-4">Still have questions?</p>
          <Link to="/contact">
            <Button variant="primary">Contact Support</Button>
          </Link>
        </div>
      </StaticPage>
    </Layout>
  );
};

export default FAQ;
