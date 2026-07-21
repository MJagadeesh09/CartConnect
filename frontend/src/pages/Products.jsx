import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("");
  const [addedProduct, setAddedProduct] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);

  const { cartItems, setCartItems, refreshCartCount } = useCart();
  const { refreshWishlistCount } = useWishlist();

  // ⭐ Recommendation 1: Decoupled and running in parallel
  useEffect(() => {
    API.get("/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    loadWishlist();
  }, []);

  const addToCart = (product) => {
    const email = localStorage.getItem("email");

    API.post("/api/cart/add", {
      email,
      productId: product.id,
      productName: product.name,
      imageUrl: product.imageUrl,
      price: product.price
    })
      .then(() => {
        toast.success(`${product.name} added to cart 🛒`);
        
        setAddedProduct(product.id);
        setTimeout(() => {
          setAddedProduct(null);
        }, 1500);

        refreshCartCount();

        const storedEmail = localStorage.getItem("email");
        API.get(`/api/cart/${storedEmail}`)
          .then((res) => {
            setCartItems(res.data);
          })
          .catch((err) => console.error("Error reloading cart items:", err));
      })
      .catch((err) => {
        console.error("Error adding to cart:", err);
        toast.error("Failed to add item to cart");
      });
  };

  const loadWishlist = () => {
    const email = localStorage.getItem("email");

    API.get(`/api/wishlist/${email}`)
      .then((res) => {
        setWishlistIds(res.data.map((item) => item.productId));
        refreshWishlistCount();
      })
      .catch((err) => {
        console.error("Error loading wishlist:", err);
      });
  };

  // 🚫 Don't change: O(1) array inclusion check remains speedy on renders
  const isWishlisted = (productId) => {
    return wishlistIds.includes(productId);
  };

  // ⭐ Recommendations 2, 3, & 4 applied here
  const toggleWishlist = (product) => {
    const email = localStorage.getItem("email");

    if (wishlistIds.includes(product.id)) {
      API.get(`/api/wishlist/${email}`)
        .then((res) => {
          const item = res.data.find((w) => w.productId === product.id);

          if (item) {
            API.delete(`/api/wishlist/${item.id}`)
              .then(() => {
                toast.info("Removed from Wishlist"); // Feedback
                loadWishlist(); // DB as single source of truth
              })
              .catch((err) => {
                console.error("Error deleting from wishlist:", err);
                toast.error("Could not remove from wishlist");
              });
          }
        })
        .catch((err) => {
          console.error("Error finding wishlist item to delete:", err);
          toast.error("Something went wrong. Please try again.");
        });
    } else {
      API.post("/api/wishlist/add", {
        email,
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl,
        price: product.price
      })
        .then(() => {
          toast.success("Added to Wishlist ❤️"); // Feedback
          loadWishlist(); // DB as single source of truth
        })
        .catch((err) => {
          console.error("Error adding to wishlist:", err);
          toast.error("Could not save to wishlist");
        });
    }
  };

  const increaseQuantity = (cartItem) => {
    API.put(`/api/cart/${cartItem.id}`, {
      ...cartItem,
      quantity: cartItem.quantity + 1
    })
      .then((res) => {
        setCartItems(
          cartItems.map((item) =>
            item.id === cartItem.id ? res.data : item
          )
        );
        refreshCartCount();
      })
      .catch((err) => console.error("Error increasing quantity:", err));
  };

  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity === 1) {
      API.delete(`/api/cart/${cartItem.id}`)
        .then(() => {
          setCartItems(
            cartItems.filter((item) => item.id !== cartItem.id)
          );
          refreshCartCount();
        })
        .catch((err) => console.error("Error deleting cart item:", err));
      return;
    }

    API.put(`/api/cart/${cartItem.id}`, {
      ...cartItem,
      quantity: cartItem.quantity - 1
    })
      .then((res) => {
        setCartItems(
          cartItems.map((item) =>
            item.id === cartItem.id ? res.data : item
          )
        );
        refreshCartCount();
      })
      .catch((err) => console.error("Error decreasing quantity:", err));
  };

  const getCartItem = (productId) => {
    return cartItems.find(
      (item) => item.productId === productId
    );
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "ALL" ? true : product.category === category
    )
    .sort((a, b) => {
      if (sortOrder === "LOW") {
        return a.price - b.price;
      }
      if (sortOrder === "HIGH") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "25px" }}>
        🛍 Products
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "15px",
          marginBottom: "30px",
          flexWrap: "wrap"
        }}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc"
          }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option value="ALL">All Categories</option>
          <option value="MOBILE">Mobile</option>
          <option value="LAPTOP">Laptop</option>
          <option value="HEADPHONES">Headphones</option>
          <option value="ACCESSORIES">Accessories</option>
          <option value="TABLET">Tablet</option>
          <option value="GAMING">Gaming</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        >
          <option value="">Sort By</option>
          <option value="LOW">Price Low → High</option>
          <option value="HIGH">Price High → Low</option>
        </select>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "25px",
          justifyContent: "center"
        }}
      >
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                width: "280px",
                border: "1px solid #ddd",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "all .35s ease",
                cursor: "pointer"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                e.currentTarget.style.boxShadow = "0 16px 35px rgba(0,0,0,.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px) scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,.1)";
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  {product.badge && (
                    <div
                      style={{
                        background:
                          product.badge === "HOT"
                            ? "#FF6B00"
                            : product.badge === "NEW"
                            ? "#2563EB"
                            : product.badge === "BEST SELLER"
                            ? "#7C3AED"
                            : product.badge === "SALE"
                            ? "#16A34A"
                            : product.badge === "MOST LOVED"
                            ? "#EC4899"
                            : "#DC2626",
                        color: "white",
                        padding: "5px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.25)"
                      }}
                    >
                      {product.badge === "HOT" && "🔥"}
                      {product.badge === "NEW" && "🆕"}
                      {product.badge === "BEST SELLER" && "⭐"}
                      {product.badge === "SALE" && "💰"}
                      {product.badge === "MOST LOVED" && "❤️"}
                      {product.badge === "LIMITED" && "⚡"}
                      {" "}
                      {product.badge}
                    </div>
                  )}

                  {product.discount && (
                    <div
                      style={{
                        background: "#E53935",
                        color: "white",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: "bold",
                        width: "fit-content",
                        boxShadow: "0 3px 8px rgba(0,0,0,0.25)"
                      }}
                    >
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
              </div>

              <div style={{ padding: "15px" }}>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    style={{ fontSize: "28px", cursor: "pointer" }}
                  >
                    {isWishlisted(product.id) ? "❤️" : "🤍"}
                  </span>
                </div>

                <h3>{product.name}</h3>

                <div
                  style={{
                    display: "inline-block",
                    backgroundColor: "#f0f0f0",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "10px"
                  }}
                >
                  {product.category}
                </div>

                <p>{product.description}</p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "10px"
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#16a34a",
                      color: "white",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "bold"
                    }}
                  >
                    ⭐ {(product.averageRating || 0).toFixed(1)}
                  </div>
                  <span style={{ fontSize: "13px", color: "#666" }}>
                    {product.totalReviews || 0} {product.totalReviews === 1 ? "Review" : "Reviews"}
                  </span>
                </div>

                <div
                  style={{
                    color: "#22C55E",
                    fontWeight: "600",
                    marginBottom: "12px"
                  }}
                >
                  🚚 Free Delivery
                </div>

                <h2 style={{ color: "green" }}>₹{product.price}</h2>

                {getCartItem(product.id) ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: "#f5f5f5",
                      borderRadius: "8px",
                      overflow: "hidden",
                      marginTop: "10px"
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        decreaseQuantity(getCartItem(product.id));
                      }}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "none",
                        backgroundColor: "#2874f0",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    >
                      −
                    </button>
                    <div
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "18px"
                      }}
                    >
                      {getCartItem(product.id).quantity}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        increaseQuantity(getCartItem(product.id));
                      }}
                      style={{
                        width: "40px",
                        height: "40px",
                        border: "none",
                        backgroundColor: "#2874f0",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                        fontWeight: "bold"
                      }}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: "none",
                      backgroundColor:
                        addedProduct === product.id
                          ? "#16a34a"
                          : "#2874f0",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    {addedProduct === product.id ? "✓ Added" : "🛒 Add To Cart"}
                  </button>
                )}

                <Link
                  to={`/products/${product.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    marginTop: "10px",
                    padding: "10px",
                    border: "2px solid #2563EB",
                    borderRadius: "8px",
                    color: "#2563EB",
                    fontWeight: "bold",
                    textDecoration: "none"
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  ⚡ Quick View
                </Link>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;