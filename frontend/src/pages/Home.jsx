import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

function Home() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {

    API.get("/api/products")
      .then((res) => {
        setProducts(res.data.slice(0, 4));

        setTrendingProducts(
          [...res.data]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4)
        );
      })
      .catch((err) => console.log(err));

  }, []);

  return (

    <div
      style={{
        backgroundColor: "#f1f3f6",
        minHeight: "100vh",
        padding: "20px"
      }}
    >

      <div
        style={{
          background:
            "linear-gradient(135deg,#2874f0,#0053c7)",
          color: "white",
          borderRadius: "12px",
          padding: "60px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >

        <div>

          <h1
            style={{
              fontSize: "48px",
              marginBottom: "15px"
            }}
          >
            Mega Electronics Sale
          </h1>

          <h2
            style={{
              fontWeight: "normal"
            }}
          >
            Up to 50% OFF on Mobiles,
            Laptops & Gaming
          </h2>

          <Link
            to="/products"
            style={{
              display: "inline-block",
              marginTop: "25px",
              padding: "12px 30px",
              backgroundColor: "white",
              color: "#2874f0",
              textDecoration: "none",
              borderRadius: "8px",
              fontWeight: "bold"
            }}
          >
            Shop Now
          </Link>

        </div>

        <div
          style={{
            fontSize: "120px"
          }}
        >
          🛍️
        </div>

      </div>

      <div style={{ backgroundColor: "white", marginTop: "20px", padding: "25px", borderRadius: "12px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} >
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>📱</div> <p>Mobiles</p> </div>
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>💻</div> <p>Laptops</p> </div>
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>🎧</div> <p>Headphones</p> </div>
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>🎮</div> <p>Gaming</p> </div>
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>⌚</div> <p>Accessories</p> </div>
        <div onClick={() => navigate("/products")} style={{ textAlign: "center", cursor: "pointer" }} > <div style={{ fontSize: "40px" }}>📟</div> <p>Tablets</p> </div>
      </div>

      <div style={{ marginTop: "25px", backgroundColor: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} >
        <h2 style={{ marginBottom: "20px" }} > 🔥 Best Deals </h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }} >

          {products.map((product) => (

            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >

              <div
                style={{
                  width: "220px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    padding: "10px"
                  }}
                >

                  <h4>{product.name}</h4>

                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold"
                    }}
                  >
                    ₹{product.price}
                  </p>

                </div>

              </div>

            </Link>

          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }} >

          <Link
            to="/products"
            style={{
              textDecoration: "none",
              color: "#2874f0",
              fontWeight: "bold"
            }}
          >
            View All Products →
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "25px", backgroundColor: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }} >
        <h2 style={{ marginBottom: "20px" }} > 📈 Trending Products </h2>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }} >

          {trendingProducts.map((product) => (

            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >

              <div
                style={{
                  width: "220px",
                  border: "1px solid #eee",
                  borderRadius: "10px",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >

                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    padding: "10px"
                  }}
                >

                  <h4>{product.name}</h4>

                  <div
                    style={{
                      color: "#f5a623",
                      fontSize: "14px"
                    }}
                  >
                    ⭐⭐⭐⭐⭐
                  </div>

                  <p
                    style={{
                      color: "green",
                      fontWeight: "bold"
                    }}
                  >
                    ₹{product.price}
                  </p>

                </div>

              </div>

            </Link>

          ))}
        </div>
      </div>

      <div style={{ marginTop: "30px", backgroundColor: "#172337", color: "white", padding: "40px", borderRadius: "12px" }} >
        <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "30px" }} >

          <div>
            <h3>About</h3>
            <p>Contact Us</p>
            <p>About CartConnect</p>
            <p>Careers</p>
          </div>

          <div>
            <h3>Help</h3>
            <p>Payments</p>
            <p>Shipping</p>
            <p>Cancellation</p>
          </div>

          <div>
            <h3>Policy</h3>
            <p>Return Policy</p>
            <p>Privacy Policy</p>
            <p>Terms Of Use</p>
          </div>

          <div>
            <h3>Social</h3>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
        <hr style={{ margin: "25px 0", borderColor: "#444" }} />
        <div style={{ textAlign: "center" }} > © 2026 CartConnect | Built with Passion </div>
      </div>

    </div>

  );
}

export default Home;