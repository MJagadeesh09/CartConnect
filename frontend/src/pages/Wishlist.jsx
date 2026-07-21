import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { cartItems, refreshCartCount } = useCart();
  const { refreshWishlistCount } = useWishlist();
  const email = localStorage.getItem("email");

  const loadWishlist = () => {
    API.get(`/api/wishlist/${email}`)
      .then((res) => {
        setWishlist(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const removeItem = (id) => {
    API.delete(`/api/wishlist/${id}`)
      .then(() => {
        loadWishlist();
        refreshWishlistCount();
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (product) => {
    const email = localStorage.getItem("email");

    API.post("/api/cart/add", {
      email,
      productId: product.productId,
      productName: product.productName,
      imageUrl: product.imageUrl,
      price: product.price
    })
      .then(() => {
        return API.delete(`/api/wishlist/${product.id}`);
      })
      .then(() => {
        toast.success("Moved to Cart 🛒");
        refreshCartCount();
        refreshWishlistCount();
        loadWishlist();
      })
      .catch((err) => console.log(err));
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
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
          color: "#e91e63",
          marginBottom: "25px"
        }}
      >
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <h2>Your wishlist is empty.</h2>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
            gap: "20px"
          }}
        >
          {wishlist.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 8px 20px rgba(0,0,0,.08)"
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.productName}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover"
                }}
              />

              <div style={{ padding: "15px" }}>
                <h3>{item.productName}</h3>

                <h2 style={{ color: "#2874f0" }}>
                  ₹{item.price.toLocaleString()}
                </h2>

                {isInCart(item.productId) ? (
                  <button
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "12px",
                      background: "#16a34a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "bold"
                    }}
                    disabled
                  >
                    ✓ Already In Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "12px",
                      background: "#2874f0",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer"
                    }}
                  >
                    🛒 Move To Cart
                  </button>
                )}

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    width: "100%",
                    marginTop: "10px",
                    background: "#ff5252",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;