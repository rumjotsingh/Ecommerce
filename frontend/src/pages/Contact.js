import React, { useState } from "react";
import Layout from "../components/layout/layout";
import StaticPage, { Section } from "../components/shared/StaticPage";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import toast from "react-hot-toast";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  };

  return (
    <Layout title="Contact Us — ShopHub">
      <StaticPage
        title="Contact Us"
        subtitle="We're here to help — reach out anytime"
      >
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: AiOutlineMail,
              label: "Email",
              value: "support@shophub.com",
              href: "mailto:support@shophub.com",
            },
            {
              icon: AiOutlinePhone,
              label: "Phone",
              value: "+1 (555) 123-4567",
              href: "tel:+15551234567",
            },
            {
              icon: AiOutlineEnvironment,
              label: "Address",
              value: "123 Shopping Street, Commerce City",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 bg-surface-muted rounded-xl text-center sm:text-left"
            >
              <item.icon className="text-accent-500 mx-auto sm:mx-0 mb-2" size={22} />
              <p className="text-xs text-primary-400 uppercase tracking-wide mb-1">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="text-sm font-medium text-primary-500 hover:text-accent-500">
                  {item.value}
                </a>
              ) : (
                <p className="text-sm font-medium text-primary-500">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        <Section title="Send us a message">
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Input
              label="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="John Doe"
              icon={<AiOutlineUser size={18} />}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              icon={<AiOutlineMail size={18} />}
              required
            />
            <div>
              <label className="block text-sm font-semibold text-primary-500 mb-2">
                Message
              </label>
              <div className="relative">
                <div className="absolute left-4 top-4 w-5 flex items-center justify-center pointer-events-none text-primary-400">
                  <AiOutlineMessage size={18} />
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="How can we help?"
                  rows={4}
                  required
                  className="input resize-none pl-14 pr-4 py-3"
                />
              </div>
            </div>
            <Button type="submit" variant="primary" loading={sending} icon={<AiOutlineMessage size={18} />}>
              Send Message
            </Button>
          </form>
        </Section>
      </StaticPage>
    </Layout>
  );
};

export default Contact;
