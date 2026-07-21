import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageStyle, setImageStyle] = useState({
    transform: "scale(1)",
    transformOrigin: "center center"
  });
  
  const [reviews, setReviews] = useState([]);

  const [reviewStats, setReviewStats] = useState({
    averageRating: 0,
    totalReviews: 0
  });
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const { refreshCartCount } = useCart();
  const stock = 7;

  useEffect(() => {
    API.get("/api/products")
      .then((res) => {
        setAllProducts(res.data);

        const found = res.data.find(
          p => p.id === Number(id)
        );
        
        setProduct(found);
        if (found) {
          setSelectedImage(found.imageUrl);
        }
        
        API.get(`/api/reviews/${id}`)
          .then((reviewRes) => {
            setReviews(reviewRes.data);
          })
          .catch((err) => console.log(err));

        API.get(`/api/reviews/product/${id}/stats`)
          .then((res) => {
            setReviewStats(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!product) return;

    let viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    viewed = viewed.filter(item => item.id !== product.id);
    viewed.unshift(product);
    viewed = viewed.slice(0, 5);

    localStorage.setItem("recentlyViewed", JSON.stringify(viewed));
  }, [product]);

  useEffect(() => {
    const viewed = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(
      viewed.filter(item => item.id !== Number(id))
    );
  }, [id, product]);

  const addToCart = () => {
    const email = localStorage.getItem("email");

    API.post("/api/cart/add", {
      email,
      productId: product.id,
      productName: product.name,
      price: product.price
    })
      .then(() => {
        toast.success(`${product.name} added to cart 🛒`);
        refreshCartCount();
      })
      .catch((err) => console.log(err));
  };

  const submitReview = () => {
    if (comment.trim() === "") {
      alert("Please enter a review.");
      return;
    }

    const username = localStorage.getItem("email");

    const alreadyReviewed = reviews.some(
      (review) => review.username === username
    );

    if (alreadyReviewed) {
      alert("You have already reviewed this product.");
      return;
    }

    API.post("/api/reviews", {
      productId: product.id,
      username,
      rating,
      comment
    })
      .then((res) => {
        setReviews([
          ...reviews,
          res.data
        ]);
        
        API.get(`/api/reviews/product/${product.id}/stats`)
          .then((response) => {
            setReviewStats(response.data);
          });

        setComment("");
        setRating(5);
        alert("Review Added");
      })
      .catch((err) => console.log(err));
  };

  const buyNow = () => {
    addToCart();
    navigate("/cart");
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  if (!product) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  const relatedProducts = allProducts
    .filter(
      p => p.category === product?.category && p.id !== product?.id
    )
    .slice(0, 4);

  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        gap: "50px",
        flexWrap: "wrap"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <img
              key={item}
              src={product.imageUrl}
              alt=""
              onClick={() => setSelectedImage(product.imageUrl)}
              style={{
                width: "70px",
                height: "70px",
                objectFit: "cover",
                border:
                  selectedImage === product.imageUrl
                    ? "2px solid #2874f0"
                    : "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            />
          ))}
        </div>

        <div
          style={{
            width: "420px",
            height: "420px",
            overflow: "hidden",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setImageStyle({
              transform: "scale(2)",
              transformOrigin: `${x}% ${y}%`
            });
          }}
          onMouseLeave={() =>
            setImageStyle({
              transform: "scale(1)",
              transformOrigin: "center center"
            })
          }
        >
          <img
            src={selectedImage}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transition: "transform .25s ease",
              ...imageStyle
            }}
          />
        </div>
      </div>

      <div>
        <h1>{product.name}</h1>

        <div
          style={{
            display: "inline-block",
            backgroundColor: "#2874f0",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold",
            marginBottom: "15px"
          }}
        >
          {product.category}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "18px"
          }}
        >
          <span
            style={{
              background: "#22C55E",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            ⭐ {reviewStats.averageRating}
          </span>
          <span
            style={{
              color: "#64748B",
              fontWeight: "600"
            }}
          >
            {reviewStats.totalReviews} Reviews
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "15px"
          }}
        >
          <h2
            style={{
              color: "#212121",
              margin: 0
            }}
          >
            ₹{product.price}
          </h2>

          <span
            style={{
              textDecoration: "line-through",
              color: "#777"
            }}
          >
            ₹{Math.round(product.price * 1.15)}
          </span>

          <span
            style={{
              color: "green",
              fontWeight: "bold"
            }}
          >
            15% OFF
          </span>
        </div>

        <p style={{ maxWidth: "500px", lineHeight: "1.6" }}>
          {product.description}
        </p>

        <div
          style={{
            color: "#dc3545",
            fontWeight: "bold",
            marginTop: "15px",
            marginBottom: "20px"
          }}
        >
          🔥 Only {stock} left in stock
        </div>

        <div
          style={{
            marginBottom: "10px",
            color: "#555"
          }}
        >
          🚚 Free Delivery
        </div>

        <div
          style={{
            marginBottom: "10px",
            color: "#555"
          }}
        >
          🔄 7 Days Replacement
        </div>

        <div
          style={{
            marginBottom: "25px",
            color: "#555"
          }}
        >
          🛡 1 Year Warranty
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "30px"
          }}
        >
          <button
            onClick={addToCart}
            style={{
              padding: "14px 28px",
              backgroundColor: "#ff9f00",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            🛒 Add To Cart
          </button>

          <button
            onClick={buyNow}
            style={{
              padding: "14px 28px",
              backgroundColor: "#fb641b",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ⚡ Buy Now
          </button>
        </div>

        <hr
          style={{
            margin: "40px 0"
          }}
        />

        <h2>
          Specifications
        </h2>

        <table
          style={{
            width: "100%",
            maxWidth: "650px",
            borderCollapse: "collapse",
            marginBottom: "40px"
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Brand
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                Apple
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Category
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                {product.category}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Display
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                6.7-inch OLED
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                RAM
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                8 GB
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Storage
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                256 GB
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Battery
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                5000 mAh
              </td>
            </tr>

            <tr>
              <td
                style={{
                  padding: "12px",
                  background: "#f5f5f5",
                  fontWeight: "bold"
                }}
              >
                Warranty
              </td>
              <td
                style={{
                  padding: "12px"
                }}
              >
                1 Year
              </td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: "30px 0" }} />
        <h2> Write Review </h2>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          style={{ padding: "10px", marginBottom: "10px" }}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        <br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          rows="4"
          style={{ width: "100%", maxWidth: "500px", padding: "10px", marginTop: "10px" }}
        />
        <br />
        <button
          onClick={submitReview}
          style={{ marginTop: "10px", padding: "10px 20px", backgroundColor: "green", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Submit Review
        </button>
        
        <hr style={{ margin: "30px 0" }} />
        <h2> Customer Reviews </h2>
        
        {reviews.map((review) => (
          <div 
            key={review.id} 
            style={{ 
              marginBottom: "20px", 
              padding: "15px", 
              border: "1px solid #eee", 
              borderRadius: "8px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)"
            }} 
          >
            <h4> {review.username} </h4>
            
            <div
              style={{
                color: "green",
                fontSize: "13px",
                fontWeight: "bold",
                marginBottom: "8px"
              }}
            >
              ✔ Verified Buyer
            </div>

            <div
              style={{
                color: "#388e3c",
                fontWeight: "bold",
                marginBottom: "8px"
              }}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>
            
            <p> {review.comment} </p>
          </div>
        ))}
      </div>

      <hr style={{ marginTop: "50px" }} />

      <h2 style={{ width: "100%", marginTop: "30px" }}>
        You May Also Like
      </h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {relatedProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/products/${item.id}`)}
            style={{
              width: "220px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover"
              }}
            />
            <div style={{ padding: "10px" }}>
              <h4>{item.name}</h4>
              <p style={{ color: "green", fontWeight: "bold" }}>
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ marginTop: "40px" }} />

      <h2 style={{ width: "100%", marginTop: "30px" }}>
        Recently Viewed
      </h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {recentlyViewed.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/products/${item.id}`)}
            style={{
              width: "220px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover"
              }}
            />
            <div style={{ padding: "10px" }}>
              <h4>{item.name}</h4>
              <p style={{ color: "green", fontWeight: "bold" }}>
                ₹{item.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetails;