import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

function ProductFormModal({ product, close, refresh }) {

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "MOBILE",
    badge: "HOT",
    discount: 0,
    price: 0
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveProduct = () => {

    if (
      form.name.trim() === "" ||
      form.description.trim() === "" ||
      form.imageUrl.trim() === ""
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (product) {

      API.put(`/api/products/${product.id}`, form)
        .then(() => {
          toast.success("Product Updated Successfully");
          refresh();
          close();
        })
        .catch((err) => console.log(err));

    } else {

      API.post("/api/products", form)
        .then(() => {
          toast.success("Product Added Successfully");
          refresh();
          close();
        })
        .catch((err) => console.log(err));

    }

  };

  return (

    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
      }}
    >

      <div
        style={{
          background: "white",
          width: "550px",
          borderRadius: "16px",
          padding: "30px"
        }}
      >

        <h2 style={{ marginBottom: "20px" }}>
          {product ? "✏ Edit Product" : "➕ Add Product"}
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          style={inputStyle}
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          style={{
            ...inputStyle,
            height: "80px"
          }}
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          style={inputStyle}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>MOBILE</option>
          <option>LAPTOP</option>
          <option>HEADPHONES</option>
          <option>ACCESSORIES</option>
          <option>TABLET</option>
          <option>GAMING</option>
        </select>

        <select
          name="badge"
          value={form.badge}
          onChange={handleChange}
          style={inputStyle}
        >
          <option>HOT</option>
          <option>NEW</option>
          <option>BEST SELLER</option>
          <option>SALE</option>
          <option>MOST LOVED</option>
          <option>LIMITED</option>
        </select>

        <input
          name="discount"
          type="number"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
          style={inputStyle}
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          style={inputStyle}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginTop: "20px"
          }}
        >

          <button
            onClick={close}
            style={cancelButton}
          >
            Cancel
          </button>

          <button
            onClick={saveProduct}
            style={saveButton}
          >
            {product ? "Update" : "Add Product"}
          </button>

        </div>

      </div>

    </div>

  );

}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "14px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const cancelButton = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#E5E7EB"
};

const saveButton = {
  padding: "12px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#2563EB",
  color: "white",
  fontWeight: "bold"
};

export default ProductFormModal;