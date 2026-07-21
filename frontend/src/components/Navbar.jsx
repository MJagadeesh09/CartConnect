import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { cartCount, refreshCartCount } = useCart();
  const { wishlistCount, refreshWishlistCount } = useWishlist();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    if (token) {
      refreshCartCount();
    }
    refreshWishlistCount();
  }, [token]);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginLeft: "22px",
    padding: "10px 16px",
    borderRadius: "10px",
    transition: "0.3s",
    fontWeight: "600"
  };

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: "linear-gradient(90deg,#2563EB,#14B8A6)",
        color: "white",
        boxShadow: "0 6px 18px rgba(0,0,0,0.15)"
      }}
    >
      <Link
        to="/products"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          color: "white",
          textDecoration: "none"
        }}
      >
        <span style={{ fontSize: "34px" }}>🛒</span>
        <div>
          <div
            style={{
              fontSize: "28px",
              fontWeight: "700",
              letterSpacing: "1px"
            }}
          >
            CartConnect
          </div>
          <div
            style={{
              fontSize: "12px",
              opacity: 0.9
            }}
          >
            Smart Shopping Simplified
          </div>
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Link
          to="/"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffffff22";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Home
        </Link>

        <Link
          to="/products"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffffff22";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          Products
        </Link>

        <Link
          to="/wishlist"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffffff22";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          ❤️ Wishlist ({wishlistCount})
        </Link>

        <Link
          to="/cart"
          style={linkStyle}
          onMouseEnter={(e) => {
            e.target.style.background = "#ffffff22";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span
              style={{
                background: "#EF4444",
                color: "white",
                minWidth: "22px",
                height: "22px",
                borderRadius: "50%",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "12px",
                marginLeft: "6px",
                boxShadow: "0 2px 8px rgba(0,0,0,.3)"
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>

        {token && (
          <>
            <Link
              to="/orders"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffffff22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              📦 My Orders
            </Link>

            <Link
              to="/profile"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffffff22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginLeft: "22px",
                padding: "10px 16px",
                fontSize: "16px",
                fontWeight: "600",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffffff22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Logout
            </button>
          </>
        )}

        {!token && (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffffff22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={linkStyle}
              onMouseEnter={(e) => {
                e.target.style.background = "#ffffff22";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
              }}
            >
              Register
            </Link>

            <Link to="/admin">Admin</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;