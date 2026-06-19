import React, { useState } from "react";
import Layout from "../../components/layout/layout";
import AuthCard from "../../components/shared/AuthCard";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
      if (res?.data?.success) {
        toast.success(res.data.message || "Welcome back!");
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Sign In — ShopHub">
      <AuthCard
        title="Welcome back"
        subtitle="Sign in to access your orders, wishlist, and account"
        footer={
          <p className="text-center text-sm text-primary-400">
            New to ShopHub?{" "}
            <Link to="/register" className="text-accent-500 font-semibold hover:underline">
              Create an account
            </Link>
          </p>
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
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            icon={<AiOutlineLock size={18} />}
            required
          />

          <div className="flex items-center justify-end">
            <Link
              to="/forget-password"
              className="text-sm text-accent-500 font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <p className="text-xs text-primary-400">
            By signing in, you agree to our{" "}
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
            Sign In
          </Button>
        </form>
      </AuthCard>
    </Layout>
  );
};

export default Login;
