import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function OrderReview() {
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const { state } = useLocation();

    const {
        cartItems,
        address,
        paymentMethod,
        total
    } = state;

    const placeOrder = async () => {
        try {
            await API.post(`/api/orders/place/${email}`);
            navigate("/order-success");
        } catch (err) {
            console.error(err);
            alert(err.response?.data || err.message);
        }
    };

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
                    color: "#2874f0"
                }}
            >
                Review Your Order
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "25px"
                }}
            >
                <div>
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            marginBottom: "20px"
                        }}
                    >
                        <h2>📍 Delivery Address</h2>
                        <p><strong>{address.name}</strong></p>
                        <p>{address.street}</p>
                        <p>
                            {address.city},{" "}{address.state}
                        </p>
                        <p>{address.pincode}</p>
                        <p>{address.phone}</p>
                    </div>

                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "12px"
                        }}
                    >
                        <h2>🛒 Products</h2>
                        {cartItems.map(item => (
                            <div
                                key={item.id}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    padding: "12px 0",
                                    borderBottom: "1px solid #eee"
                                }}
                            >
                                <div>
                                    <strong>{item.productName}</strong>
                                    <div>Qty : {item.quantity}</div>
                                </div>
                                <strong>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                </strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        height: "fit-content"
                    }}
                >
                    <h2>Payment</h2>
                    <p>
                        <strong>{paymentMethod}</strong>
                    </p>
                    
                    <hr />

                    <h2>Total</h2>
                    <h1
                        style={{
                            color: "green"
                        }}
                    >
                        ₹{total.toLocaleString()}
                    </h1>

                    <button
                        onClick={placeOrder}
                        style={{
                            width: "100%",
                            marginTop: "25px",
                            padding: "15px",
                            background: "#2874f0",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "18px",
                            cursor: "pointer"
                        }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderReview;