import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import AddressForm from "../components/AddressForm";
import PaymentSelector from "../components/PaymentSelector";
import { useCart } from "../context/CartContext";

function Checkout() {
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [errors, setErrors] = useState({});
    const [paymentMethod, setPaymentMethod] = useState("COD");
    
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);
    const [availableCoupons, setAvailableCoupons] = useState([]);

    // Fetch all available coupons on component mount
    useEffect(() => {
        API.get("/api/coupons")
            .then(res => {
                setAvailableCoupons(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const validateAddress = () => {
        const newErrors = {};

        if (!address.name.trim())
            newErrors.name = "Full Name is required";

        if (!/^[6-9]\d{9}$/.test(address.phone))
            newErrors.phone = "Enter a valid mobile number";

        if (!address.street.trim())
            newErrors.street = "Street is required";

        if (!address.city.trim())
            newErrors.city = "City is required";

        if (!address.state.trim())
            newErrors.state = "State is required";

        if (!/^\d{6}$/.test(address.pincode))
            newErrors.pincode = "Enter a valid pincode";

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const applyCoupon = (codeToApply = couponCode) => {
        if (!codeToApply || !codeToApply.trim()) {
            alert("Please enter or select a coupon code");
            return;
        }

        API.get(`/api/coupons/${codeToApply.trim()}`)
            .then(res => {
                if (!res.data) {
                    alert("Invalid Coupon");
                    return;
                }

                if (subtotal < res.data.minAmount) {
                    alert(`Minimum purchase ₹${res.data.minAmount.toLocaleString()}`);
                    return;
                }

                setCouponCode(codeToApply.toUpperCase());
                setDiscount(res.data.discount);
                setCouponApplied(true);
                alert("Coupon Applied 🎉");
            })
            .catch(() => {
                alert("Invalid Coupon");
            });
    };

    const removeCoupon = () => {
        setCouponCode("");
        setDiscount(0);
        setCouponApplied(false);
    };

    const { cartItems } = useCart();

    // Calculations
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    // Step 1: Helper Function to determine coupon suggestions
    const getCouponSuggestion = () => {
        if (availableCoupons.length === 0)
            return null;

        const sortedCoupons = [...availableCoupons]
            .sort((a, b) => a.minAmount - b.minAmount);

        for (const coupon of sortedCoupons) {
            if (subtotal < coupon.minAmount) {
                return {
                    unlocked: false,
                    coupon,
                    remaining: coupon.minAmount - subtotal
                };
            }
        }

        return {
            unlocked: true,
            coupon: sortedCoupons[sortedCoupons.length - 1]
        };
    };

    // Step 2: Get the coupon suggestion object
    const suggestion = getCouponSuggestion();

    const delivery = subtotal > 500 ? 0 : 99;
    const total = subtotal + delivery - discount;

    return (
        <div
            style={{
                background: "#f1f3f6",
                minHeight: "100vh",
                padding: "30px"
            }}
        >
            <h1 style={{ color: "#2874f0" }}>Checkout</h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "25px"
                }}
            >
                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px"
                    }}
                >
                    <AddressForm address={address} setAddress={setAddress} errors={errors} />
                    
                    <PaymentSelector
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                    />

                    <h2>Order Summary</h2>

                    {cartItems.map(item => (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "15px 0",
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

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        height: "fit-content",
                        position: "sticky",
                        top: "20px"
                    }}
                >
                    <h2>Price Details</h2>
                    <hr />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "12px 0"
                        }}
                    >
                        <span>Subtotal</span>
                        <strong>₹{subtotal.toLocaleString()}</strong>
                    </div>

                    {!couponApplied ? (
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <input
                                type="text"
                                placeholder="Coupon Code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    marginBottom: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "6px",
                                    boxSizing: "border-box"
                                }}
                            />
                            <button
                                onClick={() => applyCoupon(couponCode)}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    background: "#2874f0",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Apply Coupon
                            </button>
                        </div>
                    ) : (
                        <div
                            style={{
                                background: "#E8F5E9",
                                padding: "15px",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            <div style={{ color: "#2E7D32", fontWeight: "bold", fontSize: "18px" }}>
                                ✔ Coupon Applied
                            </div>
                            <div style={{ marginTop: "8px" }}>
                                🎟 {couponCode.toUpperCase()}
                            </div>
                            <div style={{ color: "green", marginTop: "5px" }}>
                                You saved ₹{discount.toLocaleString()}
                            </div>
                            <button
                                onClick={removeCoupon}
                                style={{
                                    marginTop: "12px",
                                    width: "100%",
                                    padding: "10px",
                                    background: "#e53935",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Remove Coupon
                            </button>
                        </div>
                    )}

                    {/* Step 3: Display the Coupon Suggestion Banner */}
                    {suggestion && (
                        <div
                            style={{
                                background: suggestion.unlocked ? "#E8F5E9" : "#FFF8E1",
                                padding: "15px",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginBottom: "20px"
                            }}
                        >
                            {suggestion.unlocked ? (
                                <div style={{ color: "#2E7D32", fontWeight: "bold" }}>
                                    🎉 Congratulations! You unlocked 
                                    <strong> {" "}{suggestion.coupon.code}</strong>
                                </div>
                            ) : (
                                <div style={{ color: "#EF6C00", fontWeight: "bold" }}>
                                    💡 Add products worth 
                                    <strong> ₹{suggestion.remaining.toLocaleString()}</strong> more to unlock 
                                    <strong> {" "}{suggestion.coupon.code}</strong>
                                </div>
                            )}
                        </div>
                    )}

                    <h3 style={{ marginTop: "25px" }}>
                        🎁 Available Coupons
                    </h3>

                    {availableCoupons.map(coupon => (
                        <div
                            key={coupon.id}
                            style={{
                                border: "1px dashed #2874f0",
                                borderRadius: "10px",
                                padding: "12px",
                                marginTop: "10px"
                            }}
                        >
                            <strong>
                                🎟 {coupon.code}
                            </strong>
                            <div>
                                Save ₹{coupon.discount.toLocaleString()}
                            </div>
                            <div
                                style={{
                                    color: "#666",
                                    fontSize: "14px"
                                }}
                            >
                                Minimum Order ₹{coupon.minAmount.toLocaleString()}
                            </div>
                            <button
                                onClick={() => applyCoupon(coupon.code)}
                                style={{
                                    marginTop: "10px",
                                    padding: "8px 14px",
                                    background: "#2874f0",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "6px",
                                    cursor: "pointer"
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    ))}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "12px 0",
                            marginTop: "20px"
                        }}
                    >
                        <span>Delivery</span>
                        <strong>
                            {delivery === 0 ? "FREE" : `₹${delivery}`}
                        </strong>
                    </div>

                    {discount > 0 && (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                margin: "12px 0",
                                color: "green"
                            }}
                        >
                            <span>Discount</span>
                            <strong>-₹{discount.toLocaleString()}</strong>
                        </div>
                    )}

                    <hr />

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "22px",
                            color: "green"
                        }}
                    >
                        <strong>Total</strong>
                        <strong>₹{total.toLocaleString()}</strong>
                    </div>

                    <button
                        onClick={() => {
                            if (validateAddress()) {
                                navigate("/review", {
                                    state: {
                                        cartItems,
                                        address,
                                        paymentMethod,
                                        total
                                    }
                                });
                            }
                        }}
                        style={{
                            width: "100%",
                            marginTop: "25px",
                            padding: "14px",
                            background: "#fb641b",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "18px",
                            cursor: "pointer"
                        }}
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;