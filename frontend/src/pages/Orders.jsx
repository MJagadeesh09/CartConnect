import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const statusStyles = {
    PLACED: {
      bg: "#ECEFF1",
      color: "#455A64"
    },
    PACKED: {
      bg: "#E8EAF6",
      color: "#3949AB"
    },
    SHIPPED: {
      bg: "#FFF3E0",
      color: "#EF6C00"
    },
    "OUT FOR DELIVERY": {
      bg: "#E3F2FD",
      color: "#1976D2"
    },
    DELIVERED: {
      bg: "#E8F5E9",
      color: "#2E7D32"
    },
    CANCELLED: {
      bg: "#FFEBEE",
      color: "#C62828"
    }
  };

  const deliveryMessages = {
    PLACED: "Preparing your order",
    PACKED: "Packed and ready to ship",
    SHIPPED: "Expected Tomorrow",
    "OUT FOR DELIVERY": "Arriving Today",
    DELIVERED: "Delivered Successfully",
    CANCELLED: "Order Cancelled"
  };

  useEffect(() => {
    API.get(`/api/orders/${email}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, [email]);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div
      style={{
        background: "#f1f3f6",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <h1
        style={{
          color: "#2874f0",
          marginBottom: "25px"
        }}
      >
        📦 My Orders
      </h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px"
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "8px",
            fontSize: "16px",
            border: "1px solid #ccc",
            background: "white",
            cursor: "pointer"
          }}
        >
          <option value="ALL">All States</option>
          <option value="PLACED">Placed</option>
          <option value="PACKED">Packed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="OUT FOR DELIVERY">Out For Delivery</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <h3 style={{ color: "#666", marginTop: "20px" }}>No orders found</h3>
      ) : (
        filteredOrders.map((order) => {
          const style = statusStyles[order.status] || {
            bg: "#ECEFF1",
            color: "#455A64"
          };

          const deliveryText =
            deliveryMessages[order.status] || "Processing";

          return (
            <div
              key={order.id}
              onClick={() =>
                navigate("/order-details", {
                  state: { order }
                })
              }
              style={{
                background: "white",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.25s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "18px"
                }}
              >
                <img
                  src={
                    order.imageUrl ||
                    "https://via.placeholder.com/100x100?text=Product"
                  }
                  alt={order.productName}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "1px solid #eee"
                  }}
                />

                <div>
                  <h2
                    style={{
                      marginBottom: "8px"
                    }}
                  >
                    {order.productName}
                  </h2>

                  <div
                    style={{
                      color: "#666"
                    }}
                  >
                    Qty × {order.quantity}
                  </div>

                  <div
                    style={{
                      marginTop: "10px",
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}
                  >
                    ₹{(order.price * order.quantity).toLocaleString()}
                  </div>
                </div>
              </div>

              <div
                style={{
                  textAlign: "right"
                }}
              >
                <div
                  style={{
                    background: style.bg,
                    color: style.color,
                    padding: "8px 18px",
                    borderRadius: "30px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    display: "inline-block"
                  }}
                >
                  ● {order.status}
                </div>

                <div
                  style={{
                    marginTop: "10px",
                    color: "#666",
                    fontSize: "14px"
                  }}
                >
                  🚚 {deliveryText}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Orders;