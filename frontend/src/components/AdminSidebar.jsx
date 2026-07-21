import { Link } from "react-router-dom";

function AdminSidebar() {
  const menuStyle = {
    color: "white",
    textDecoration: "none",
    padding: "15px 20px",
    display: "block",
    fontWeight: "bold",
    borderRadius: "8px",
    marginBottom: "8px"
  };

  return (
    <div
      style={{
        width: "240px",
        background: "#111827",
        minHeight: "100vh",
        padding: "25px",
        color: "white"
      }}
    >
      <h2
        style={{
          marginBottom: "35px"
        }}
      >
        🛒 CartConnect
      </h2>

      <Link to="/admin" style={menuStyle}>
        📊 Dashboard
      </Link>

      <Link to="/admin/products" style={menuStyle}>
        📦 Products
      </Link>

      <Link to="/admin/orders" style={menuStyle}>
        🛒 Orders
      </Link>

      <Link to="/admin/users" style={menuStyle}>
        👥 Users
      </Link>

      <Link to="/admin/coupons" style={menuStyle}>
        🎟 Coupons
      </Link>

      <Link to="/admin/reviews" style={menuStyle}>
        ⭐ Reviews
      </Link>

      <Link to="/admin/analytics" style={menuStyle}>
        📈 Analytics
      </Link>
    </div>
  );
}

export default AdminSidebar;