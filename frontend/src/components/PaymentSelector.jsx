function PaymentSelector({

    paymentMethod,

    setPaymentMethod

}) {

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "20px"
            }}
        >

            <h2>💳 Payment Method</h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    marginTop: "15px"
                }}
            >

                <label>
                    <input
                        type="radio"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />

                    Cash on Delivery
                </label>

                <label>
                    <input
                        type="radio"
                        value="UPI"
                        checked={paymentMethod === "UPI"}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />

                    UPI
                </label>

                <label>
                    <input
                        type="radio"
                        value="CARD"
                        checked={paymentMethod === "CARD"}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                    />

                    Credit / Debit Card
                </label>

            </div>

        </div>

    );

}

export default PaymentSelector;