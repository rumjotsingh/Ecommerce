import React from "react";
import { motion } from "framer-motion";
import { BiShield, BiPackage, BiSupport, BiRefresh } from "react-icons/bi";

const badges = [
  { icon: BiPackage, title: "Free Delivery", description: "On orders over ₹499" },
  { icon: BiRefresh, title: "Easy Returns", description: "7-day return policy" },
  { icon: BiShield, title: "Secure Payment", description: "100% protected" },
  { icon: BiSupport, title: "24/7 Support", description: "Dedicated help" },
];

const TrustBadges = () => (
  <section className="bg-white border-b border-border">
    <div className="max-w-8xl mx-auto container-padding py-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center gap-3"
          >
            <div className="p-2.5 rounded-xl bg-surface-muted text-primary-500">
              <badge.icon size={22} />
            </div>
            <div>
              <h3 className="font-medium text-primary-500 text-sm">{badge.title}</h3>
              <p className="text-xs text-primary-400">{badge.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
