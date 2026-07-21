import { useState } from "react"; // Step 1: Imported useState
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function MiniCart() {
  const { cartItems } = useCart();
  const [visible, setVisible] = useState(true); // Step 1: Added visible state

  if (cartItems.length === 0) {
    return null;
  }

  // Step 2: Added early return if not visible
  if (!visible) {
    return null;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "320px",
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(14px)",
          borderRadius: "18px",
          boxShadow: "0 12px 35px rgba(0,0,0,0.18)",
          padding: "18px",
          zIndex: 999,
          border: "1px solid rgba(255,255,255,0.4)",
          transition: "all 0.35s ease",
          animation: "slideUp 0.35s ease"
        }}
      >
        {/* Step 3: Replaced the heading section with a header container and close button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px"
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#2874f0"
            }}
          >
            🛒 My Cart
          </h3>
          <button
            onClick={() => setVisible(false)}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "22px",
              cursor: "pointer",
              color: "#777"
            }}
          >
            ✕
          </button>
        </div>

        {cartItems.slice(0, 3).map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}
          >
            <span>{item.productName}</span>
            <strong>×{item.quantity}</strong>
          </div>
        ))}

        {cartItems.length > 3 && (
          <div
            style={{
              color: "#666",
              marginBottom: "10px"
            }}
          >
            +{cartItems.length - 3} more items
          </div>
        )}

        <hr />

        <h3
          style={{
            color: "green"
          }}
        >
          ₹{subtotal.toLocaleString()}
        </h3>

        <Link
          to="/cart"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: "15px",
            padding: "12px",
            backgroundColor: "#2874f0",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            fontWeight: "bold"
          }}
        >
          View Cart →
        </Link>
      </div>

      <style>
        {`
          @keyframes slideUp {
            0% {
              transform: translateY(30px);
              opacity: 0;
            }
            100% {
              transform: translateY(0px);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}

export default MiniCart;