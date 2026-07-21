import { Link } from "react-router-dom";

function OrderSuccess() {

    return (

        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background: "#f1f3f6"
            }}
        >

            <h1
                style={{
                    color: "green",
                    fontSize: "52px"
                }}
            >
                ✅
            </h1>

            <h2>Order Placed Successfully!</h2>

            <p>

                Thank you for shopping with CartConnect.

            </p>

            <Link
                to="/orders"
                style={{
                    marginTop: "20px",
                    background: "#2874f0",
                    color: "white",
                    padding: "14px 25px",
                    borderRadius: "8px",
                    textDecoration: "none"
                }}
            >
                View My Orders
            </Link>

        </div>

    );

}

export default OrderSuccess;