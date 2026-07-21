import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Navbar from "./components/Navbar";
import MiniCart from "./components/MiniCart";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import OrderReview from "./pages/OrderReview";
import OrderSuccess from "./pages/OrderSuccess";
import OrderDetails from "./pages/OrderDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          {/* Navbar appears on every page */}
          <Navbar />

          {/* Routes */}
          <Routes>
            {/* Default page */}
            <Route path="/" element={<Home />} />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Main pages */}
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Checkout page */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {/* Wishlist page */}
            <Route path="/wishlist" element={<Wishlist />} />

            {/* Product details page */}
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/review" element={<OrderReview />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route   path="/order-details"element={<OrderDetails />}/>
            <Route   path="/admin"element={<AdminDashboard />}/>
            <Route path="/admin/products" element={<AdminProducts />} />
          </Routes>

          {/* MiniCart placed after the routes */}
          <MiniCart />

          {/* React Toastify Container */}
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;