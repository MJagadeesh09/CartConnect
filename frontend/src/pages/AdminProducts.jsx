import { useEffect, useState } from "react";
import API from "../api/axios";
import ProductFormModal from "../components/ProductFormModal";
import DeleteProductModal from "../components/DeleteProductModal";
import AdminSidebar from "../components/AdminSidebar";

function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = () => {

    API.get("/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div
      style={{
        display: "flex",
        background: "#f4f6f9"
      }}
    >

      <AdminSidebar />

      <div
        style={{
          flex: 1,
          padding: "30px"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px"
          }}
        >

          <h1>📦 Product Management</h1>

          <button
            onClick={() => {
              setSelectedProduct(null);
              setShowForm(true);
            }}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#2563EB",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            ➕ Add Product
          </button>

        </div>

        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "30px"
          }}
        />

        <table
          style={{
            width: "100%",
            background: "white",
            borderCollapse: "collapse",
            borderRadius: "10px",
            overflow: "hidden"
          }}
        >

          <thead
            style={{
              background: "#2563EB",
              color: "white"
            }}
          >

            <tr>

              <th style={{ padding: "15px" }}>Image</th>

              <th>Name</th>

              <th>Category</th>

              <th>Price</th>

              <th>Badge</th>

              <th>Discount</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #eee"
                }}
              >

                <td>

                  <img
                    src={product.imageUrl}
                    alt=""
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      margin: "8px"
                    }}
                  />

                </td>

                <td>{product.name}</td>

                <td>{product.category}</td>

                <td>₹{product.price}</td>

                <td>{product.badge}</td>

                <td>{product.discount}%</td>

                <td>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowForm(true);
                    }}
                    style={{
                      marginRight: "10px",
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#16A34A",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowDelete(true);
                    }}
                    style={{
                      padding: "8px 14px",
                      border: "none",
                      borderRadius: "6px",
                      background: "#DC2626",
                      color: "white",
                      cursor: "pointer"
                    }}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showForm && (

        <ProductFormModal

          product={selectedProduct}

          close={() => setShowForm(false)}

          refresh={loadProducts}

        />

      )}

      {showDelete && (

        <DeleteProductModal

          product={selectedProduct}

          close={() => setShowDelete(false)}

          refresh={loadProducts}

        />

      )}

    </div>

  );
}

export default AdminProducts;