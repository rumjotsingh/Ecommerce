import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Electronics",
    subtitle: "Up to 50% Off",
    gradient: "from-accent-600 to-accent-800",
    link: "/products",
  },
  {
    id: 2,
    title: "Fashion",
    subtitle: "Min 40% Off",
    gradient: "from-pink-500 to-rose-600",
    link: "/products",
  },
  {
    id: 3,
    title: "Home & Kitchen",
    subtitle: "From ₹199",
    gradient: "from-emerald-500 to-teal-600",
    link: "/products",
  },
  {
    id: 4,
    title: "Beauty",
    subtitle: "Extra 10% Off",
    gradient: "from-violet-500 to-purple-600",
    link: "/products",
  },
];

const OffersSection = () => (
  <section className="py-6 bg-surface-muted">
    <div className="max-w-8xl mx-auto container-padding">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {offers.map((offer, i) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={offer.link}
              className={`block rounded-2xl bg-gradient-to-br ${offer.gradient} p-6 text-white text-center hover:shadow-soft-lg transition-shadow h-32 flex flex-col items-center justify-center`}
            >
              <h3 className="text-base font-bold mb-1">{offer.title}</h3>
              <p className="text-sm text-white/80">{offer.subtitle}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OffersSection;
