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
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineQuestionCircle,
  AiOutlineArrowLeft,
} from "react-icons/ai";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
        newPassword,
        answer,
      });
      if (res?.data?.success) {
        toast.success(res.data.message || "Password reset successfully");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Reset Password — ShopHub">
      <AuthCard
        title="Reset your password"
        subtitle="Enter your email, security answer, and new password"
        footer={
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-primary-400 hover:text-accent-500 transition-colors"
          >
            <AiOutlineArrowLeft size={16} />
            Back to sign in
          </Link>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={<AiOutlineMail size={18} />}
            required
          />
          <Input
            label="Security Answer — Favorite Sport?"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
            icon={<AiOutlineQuestionCircle size={18} />}
            required
          />
          <Input
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            icon={<AiOutlineLock size={18} />}
            required
          />
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Reset Password
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
};

export default ForgetPassword;
