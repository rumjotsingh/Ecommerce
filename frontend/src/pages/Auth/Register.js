import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import AuthCard from "../../components/shared/AuthCard";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const PHONE_REGEX = /^\d{10}$/;

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setForm((prev) => ({ ...prev, phone: digits }));
    if (phoneError) {
      setPhoneError(
        digits.length === 0
          ? ""
          : PHONE_REGEX.test(digits)
          ? ""
          : "Phone number must be exactly 10 digits"
      );
    }
  };

  const validatePhone = () => {
    if (!PHONE_REGEX.test(form.phone)) {
      setPhoneError("Phone number must be exactly 10 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validatePhone()) return;
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.REGISTER, form);
      if (res?.data?.success) {
        toast.success(res.data.message || "Account created!");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Account — ShopHub">
      <AuthCard
        title="Create your account"
        subtitle="Join ShopHub and start shopping in minutes"
        footer={
          <p className="text-center text-sm text-primary-400">
            Already have an account?{" "}
            <Link to="/login" className="text-accent-500 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={update("name")}
            placeholder="John Doe"
            icon={<AiOutlineUser size={18} />}
            required
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="you@example.com"
              icon={<AiOutlineMail size={18} />}
              required
            />
            <Input
              label="Phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={handlePhoneChange}
              onBlur={validatePhone}
              placeholder="9876543210"
              icon={<AiOutlinePhone size={18} />}
              error={phoneError}
              helperText={!phoneError ? "10-digit mobile number" : undefined}
              maxLength={10}
              required
            />
          </div>

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={update("password")}
            placeholder="Create a strong password"
            icon={<AiOutlineLock size={18} />}
            required
          />

          <Input
            label="Delivery Address"
            value={form.address}
            onChange={update("address")}
            placeholder="Your full address"
            icon={<AiOutlineHome size={18} />}
            required
          />

          <Input
            label="Security Question — Favorite Sport?"
            value={form.answer}
            onChange={update("answer")}
            placeholder="Your answer (for password recovery)"
            icon={<AiOutlineQuestionCircle size={18} />}
            required
          />

          <p className="text-xs text-primary-400">
            By creating an account, you agree to our{" "}
            <Link to="/terms" className="text-accent-500 hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/policy" className="text-accent-500 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Create Account
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
};

export default Register;
