import React from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const footerLinks = {
  shop: [
    { to: "/products", label: "All Products" },
    { to: "/categories", label: "Categories" },
    { to: "/search", label: "Search" },
  ],
  support: [
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact Us" },
    { to: "/return-policy", label: "Returns" },
    { to: "/shipping", label: "Shipping" },
  ],
  company: [
    { to: "/about", label: "About Us" },
    { to: "/terms", label: "Terms of Use" },
    { to: "/policy", label: "Privacy Policy" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-primary-500 text-primary-300 mt-auto">
      <div className="max-w-8xl mx-auto container-padding py-14 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-white tracking-tight">
                ShopHub
              </span>
            </Link>
            <p className="text-sm text-primary-400 leading-relaxed mb-6 max-w-xs">
              Premium shopping experience with curated products, fast delivery,
              and exceptional service.
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: AiOutlineInstagram, label: "Instagram" },
                { Icon: AiOutlineTwitter, label: "Twitter" },
                { Icon: AiOutlineFacebook, label: "Facebook" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-primary-300 hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-primary-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-primary-400">
              <li className="flex items-start gap-2">
                <AiOutlineEnvironment className="mt-0.5 flex-shrink-0" size={16} />
                <span>123 Shopping Street, Commerce City</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlinePhone size={16} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <AiOutlineMail size={16} />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-8xl mx-auto container-padding py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-400">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-primary-400">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
            <span>Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
