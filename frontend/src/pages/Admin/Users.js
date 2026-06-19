import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminMenu from "../../components/layout/AdminMenu";
import DashboardLayout from "../../components/profile/DashboardLayout";
import DashboardPageHeader from "../../components/profile/DashboardPageHeader";
import { API_ENDPOINTS } from "../../config/api";
import Card from "../../components/UI/Card";
import EmptyState from "../../components/UI/EmptyState";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(API_ENDPOINTS.USER.GET_ALL);
        setUsers(data?.users || data || []);
      } catch {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <DashboardLayout title="All Users" sidebar={AdminMenu}>
      <DashboardPageHeader
        title="All Users"
        subtitle={
          loading
            ? "Loading users…"
            : `${users.length} registered user${users.length !== 1 ? "s" : ""}`
        }
        icon={<AiOutlineUser size={20} />}
      />

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-white border border-border rounded-xl animate-pulse" />
          ))}
        </div>
      ) : users.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-muted text-left">
                  <th className="px-5 py-3 font-semibold text-primary-500">Name</th>
                  <th className="px-5 py-3 font-semibold text-primary-500">Email</th>
                  <th className="px-5 py-3 font-semibold text-primary-500 hidden sm:table-cell">
                    Phone
                  </th>
                  <th className="px-5 py-3 font-semibold text-primary-500 hidden md:table-cell">
                    Role
                  </th>
                  <th className="px-5 py-3 font-semibold text-primary-500 hidden lg:table-cell">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b border-border last:border-0 hover:bg-surface-muted/50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-500 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                          {user.name?.charAt(0)?.toUpperCase() || "U"}
                        </div>
                        <span className="font-medium text-primary-500 truncate max-w-[120px] sm:max-w-none">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-primary-400">
                      <span className="flex items-center gap-1.5 truncate max-w-[180px]">
                        <AiOutlineMail size={14} className="flex-shrink-0" />
                        {user.email}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-primary-400 hidden sm:table-cell">
                      <span className="flex items-center gap-1.5">
                        <AiOutlinePhone size={14} />
                        {user.phone || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          user.role === 1
                            ? "bg-purple-50 text-purple-700"
                            : "bg-surface-muted text-primary-400"
                        }`}
                      >
                        {user.role === 1 ? "Admin" : "Customer"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-primary-400 hidden lg:table-cell">
                      {user.createdAt
                        ? moment(user.createdAt).format("MMM DD, YYYY")
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <EmptyState
            icon={<AiOutlineUser className="w-16 h-16 text-primary-300" />}
            title="No users found"
            description="Registered users will appear here."
          />
        </Card>
      )}
    </DashboardLayout>
  );
};

export default Users;
