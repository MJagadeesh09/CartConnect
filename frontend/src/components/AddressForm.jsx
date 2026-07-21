import { useState } from "react";

function AddressForm({ address, setAddress, errors }) {
    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px"
            }}
        >
            <h2>📍 Delivery Address</h2>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px"
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="name"
                        placeholder="Full Name"
                        value={address.name}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.name && (
                        <small style={{ color: "red" }}>
                            {errors.name}
                        </small>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="phone"
                        placeholder="Phone Number"
                        value={address.phone}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.phone && (
                        <small style={{ color: "red" }}>
                            {errors.phone}
                        </small>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="street"
                        placeholder="House No / Street"
                        value={address.street}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.street && (
                        <small style={{ color: "red" }}>
                            {errors.street}
                        </small>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="city"
                        placeholder="City"
                        value={address.city}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.city && (
                        <small style={{ color: "red" }}>
                            {errors.city}
                        </small>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="state"
                        placeholder="State"
                        value={address.state}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.state && (
                        <small style={{ color: "red" }}>
                            {errors.state}
                        </small>
                    )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <input
                        name="pincode"
                        placeholder="Pincode"
                        value={address.pincode}
                        onChange={handleChange}
                        style={{
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            fontSize: "15px",
                            outline: "none"
                        }}
                    />
                    {errors.pincode && (
                        <small style={{ color: "red" }}>
                            {errors.pincode}
                        </small>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddressForm;