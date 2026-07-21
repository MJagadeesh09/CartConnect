import { useEffect } from "react"; 
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

function Cart() {

  const {
    cartItems,
    setCartItems,
    refreshCartCount
  } = useCart();

  

  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const loadCart = () => {
    refreshCartCount();
  };

  useEffect(() => {
    loadCart();
  }, []);


  const removeItem = (id) => {
    API.delete(`/api/cart/${id}`)
      .then(() => {
        loadCart();
        refreshCartCount();
      })
      .catch((err) => console.log(err));
  };

  const increaseQuantity = (item) => {
    API.put(`/api/cart/${item.id}`, {
      ...item,
      quantity: item.quantity + 1
    })
      .then(() => {
        loadCart();
        refreshCartCount();
      })
      .catch((err) => console.log(err));
  };

  const decreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeItem(item.id);
      return;
    }

    API.put(`/api/cart/${item.id}`, {
      ...item,
      quantity: item.quantity - 1
    })
      .then(() => {
        loadCart();
        refreshCartCount();
      })
      .catch((err) => console.log(err));
  };

  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 My Cart</h2>

      {cartItems.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "15px",
                borderRadius: "8px"
              }}
            >
              <h3>{item.productName}</h3>
              <h4>Price: ₹{item.price}</h4>

              <div style={{ marginBottom: "10px" }}>
                <button onClick={() => decreaseQuantity(item)}>➖</button>
                <span
                  style={{
                    margin: "0 15px",
                    fontWeight: "bold"
                  }}
                >
                  {item.quantity}
                </span>
                <button onClick={() => increaseQuantity(item)}>➕</button>
              </div>

              <p>
                Subtotal:{" "}
                <strong>
                  ₹{item.price * item.quantity}
                </strong>
              </p>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))}

          <hr />

          <h2>Grand Total: ₹{grandTotal}</h2>

          <Link
            to="/checkout"
            style={{
              display: "block",
              textAlign: "center",
              background: "#fb641b",
              color: "white",
              textDecoration: "none",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "20px",
              fontWeight: "bold"
            }}
          >
            Proceed to Checkout →
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;