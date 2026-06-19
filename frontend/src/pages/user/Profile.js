import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import { useAuth } from "../../context/auth";
import { API_ENDPOINTS } from "../../config/api";
import toast from "react-hot-toast";
import axios from "axios";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineHome,
  AiOutlineSave,
} from "react-icons/ai";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { email, name, phone, address } = auth?.user || {};
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        const ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
        setPassword("");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout title="Your Profile" sidebar={UserMenu}>
      <DashboardPageHeader
        title="Edit Profile"
        subtitle="Update your personal information"
        icon={<AiOutlineUser size={20} />}
      />

      <Card className="p-6 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section>
            <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wide mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                icon={<AiOutlineUser size={20} />}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                icon={<AiOutlineMail size={20} />}
                disabled
              />
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wide mb-4">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Phone Number"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
                icon={<AiOutlinePhone size={20} />}
                required
              />
              <Input
                label="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                icon={<AiOutlineHome size={20} />}
                required
              />
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wide mb-4">
              Security
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank to keep current password"
                icon={<AiOutlineLock size={20} />}
              />
              <div className="flex items-end">
                <div className="w-full rounded-xl border border-border bg-surface-muted p-4 text-sm text-primary-400">
                  <p className="font-medium text-primary-500 mb-1">Password tips</p>
                  <ul className="text-xs space-y-0.5">
                    <li>Use 8+ characters</li>
                    <li>Mix letters and numbers</li>
                    <li>Include special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-2 border-t border-border">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              icon={<AiOutlineSave size={18} />}
            >
              {loading ? "Updating…" : "Update Profile"}
            </Button>
          </div>
        </form>
      </Card>
    </DashboardLayout>
  );
};

export default Profile;
