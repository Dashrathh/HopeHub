import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [user, setUser] = useState(null); // user info
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-12 text-gray-600 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-12 text-red-500 text-lg">
        User not found or unauthorized.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-teal-700 mb-4">
        Welcome, {user.name} 👋
      </h1>
      <p className="text-gray-700 mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Phone:</strong> {user.phone || "N/A"}
      </p>
      <p className="text-gray-700 mb-2">
        <strong>Address:</strong> {user.address || "N/A"}
      </p>
      <p className="text-gray-700 mt-6">
        You can now donate products, become a volunteer, and explore the HopeHub
        platform.
      </p>
    </div>
  );
};

export default Dashboard;
