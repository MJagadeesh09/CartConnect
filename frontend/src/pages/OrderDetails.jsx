import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function OrderDetails() {
  const { state } = useLocation();
  const order = state?.order;
  const navigate = useNavigate();
  const [status, setStatus] = useState(order?.status);

  const orderSteps = [
    "PLACED",
    "PACKED",
    "SHIPPED",
    "OUT FOR DELIVERY",
    "DELIVERED"
  ];

  const currentStep = orderSteps.indexOf(status);

  const statusColor = {
    PLACED: "#607D8B",
    PACKED: "#3949AB",
    SHIPPED: "#EF6C00",
    "OUT FOR DELIVERY": "#1976D2",
    DELIVERED: "#2E7D32",
    CANCELLED: "#D32F2F"
  };

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + 3);
  const deliveryDate = estimatedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (!order) {
    return <h2 style={{ padding: "30px" }}>Order not found.</h2>;
  }

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // Company Header Styling
    doc.setFontSize(24);
    doc.setTextColor(40, 116, 240);
    doc.text("CartConnect", 20, 20);
    doc.setFontSize(14);
    doc.setTextColor(100);
    doc.text("Professional Tax Invoice", 20, 30);

    // Metadata Details
    doc.setFontSize(12);
    doc.text(`Order ID : ${order.id}`, 20, 40);
    doc.text(`Customer : ${order.email}`, 20, 50);
    doc.text(`Status : ${status}`, 20, 60);
    doc.text(
      `Invoice Date : ${new Date().toLocaleDateString("en-IN")}`,
      20,
      70
    );

    // Tabular Item breakdown
    autoTable(doc, {
      startY: 80,
      head: [["Product", "Quantity", "Unit Price", "Total"]],
      body: [[
        order.productName,
        order.quantity,
        `₹${order.price.toLocaleString()}`,
        `₹${(order.price * order.quantity).toLocaleString()}`
      ]],
      headStyles: { fillColor: [40, 116, 240] }
    });

    const total = order.price * order.quantity;

    // Bottom Typography Branding
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(
      `Grand Total : ₹${total.toLocaleString()}`,
      20,
      doc.lastAutoTable.finalY + 20
    );
    
    doc.setFontSize(11);
    doc.setTextColor(120);
    doc.text(
      "Thank you for shopping with CartConnect!",
      20,
      doc.lastAutoTable.finalY + 35
    );
    doc.text(
      "This is a computer generated invoice.",
      20,
      doc.lastAutoTable.finalY + 43
    );

    doc.save(`Invoice-${order.id}.pdf`);
  };

  const cancelOrder = () => {
    API.put(`/api/orders/cancel/${order.id}`)
      .then((res) => {
        alert(res.data);
        setStatus("CANCELLED");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        background: "#f1f3f6",
        minHeight: "100vh",
        padding: "30px"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
        }}
      >
        <h1
          style={{
            color: "#2874f0",
            marginBottom: "25px"
          }}
        >
          📦 Order Details
        </h1>

        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "flex-start"
          }}
        >
          <img
            src={
              order.imageUrl ||
              "https://via.placeholder.com/180"
            }
            alt={order.productName}
            style={{
              width: "180px",
              height: "180px",
              objectFit: "cover",
              borderRadius: "12px"
            }}
          />

          <div style={{ flex: 1 }}>
            <h2>{order.productName}</h2>
            <p style={{ margin: "8px 0" }}><strong>Quantity:</strong> {order.quantity}</p>
            <p style={{ margin: "8px 0" }}><strong>Price:</strong> ₹{order.price.toLocaleString()}</p>
            <p style={{ margin: "8px 0" }}><strong>Total:</strong> ₹{(order.price * order.quantity).toLocaleString()}</p>
            
            <div
              style={{
                marginTop: "20px",
                padding: "12px 18px",
                background: `${statusColor[status]}20`,
                borderRadius: "10px",
                display: "inline-block",
                color: statusColor[status],
                fontWeight: "bold"
              }}
            >
              Current Status : {status}
            </div>

            <div
              style={{
                marginTop: "25px",
                background: "#F8F9FA",
                borderRadius: "12px",
                padding: "18px",
                border: "1px solid #E5E5E5"
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>Order Information</h3>
              <div style={{ marginBottom: "10px" }}>
                <strong>Order ID:</strong> #{order.id}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <strong>Payment:</strong> Cash on Delivery
              </div>
              {status !== "DELIVERED" && status !== "CANCELLED" && (
                <div style={{ color: "#2E7D32", fontWeight: "bold" }}>
                  Estimated Delivery: {deliveryDate}
                </div>
              )}
              {status === "DELIVERED" && (
                <div style={{ color: "#2E7D32", fontWeight: "bold" }}>
                  ✅ Delivered Successfully
                </div>
              )}
              {status === "CANCELLED" && (
                <div style={{ color: "#D32F2F", fontWeight: "bold" }}>
                  ❌ Order Cancelled
                </div>
              )}

              <button
                onClick={downloadInvoice}
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "14px",
                  background: "#2874f0",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  cursor: "pointer"
                }}
              >
                📄 Download Invoice
              </button>
            </div>

            {status === "CANCELLED" ? (
              <div
                style={{
                  marginTop: "35px",
                  background: "#FFEBEE",
                  padding: "25px",
                  borderRadius: "15px",
                  textAlign: "center"
                }}
              >
                <h2 style={{ color: "#D32F2F" }}>❌ Order Cancelled</h2>
                <p style={{ color: "#666", marginTop: "10px" }}>
                  This order has been cancelled successfully.
                </p>
              </div>
            ) : (
              <div
                style={{
                  marginTop: "35px"
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>Order Tracking</h3>

                {orderSteps.map((step, index) => {
                  const completed = index <= currentStep;

                  return (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "flex-start"
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center"
                        }}
                      >
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: completed ? "#2E7D32" : "#D6D6D6",
                            color: "white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontWeight: "bold",
                            fontSize: "14px"
                          }}
                        >
                          {completed ? "✓" : ""}
                        </div>

                        {index !== orderSteps.length - 1 && (
                          <div
                            style={{
                              width: "3px",
                              height: "45px",
                              background: completed ? "#2E7D32" : "#D6D6D6"
                            }}
                          />
                        )}
                      </div>

                      <div
                        style={{
                          marginLeft: "18px",
                          paddingTop: "4px",
                          paddingBottom: "30px"
                        }}
                      >
                        <div
                          style={{
                            fontWeight: completed ? "bold" : "normal",
                            color: completed ? "#2E7D32" : "#777",
                            fontSize: "17px"
                          }}
                        >
                          {step}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {(status === "PLACED" || status === "PACKED") && (
              <button
                onClick={cancelOrder}
                style={{
                  marginTop: "20px",
                  background: "#d32f2f",
                  color: "white",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Cancel Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;