import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminCard from "../components/AdminCard";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    API.get("/api/admin/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        background: "#f4f6f9"
      }}
    >
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "35px"
        }}
      >
        <h1
          style={{
            marginBottom: "35px"
          }}
        >
          📊 Admin Dashboard
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px"
          }}
        >
          <AdminCard
            title="Users"
            value={stats.users}
            icon="👥"
            color="#2563EB"
          />

          <AdminCard
            title="Products"
            value={stats.products}
            icon="📦"
            color="#16A34A"
          />

          <AdminCard
            title="Orders"
            value={stats.orders}
            icon="🛒"
            color="#EA580C"
          />

          <AdminCard
            title="Revenue"
            value={`₹${Number(stats.revenue || 0).toLocaleString()}`}
            icon="💰"
            color="#9333EA"
          />

          <AdminCard
            title="Wishlist"
            value={stats.wishlistItems}
            icon="❤️"
            color="#DB2777"
          />

          <AdminCard
            title="Reviews"
            value={stats.reviews}
            icon="⭐"
            color="#0891B2"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;