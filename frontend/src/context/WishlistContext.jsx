import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlistCount, setWishlistCount] = useState(0);

  const refreshWishlistCount = () => {
    const email = localStorage.getItem("email");

    // Safety check if user is logged out
    if (!email) {
      setWishlistCount(0);
      return;
    }

    API.get(`/api/wishlist/${email}`)
      .then((res) => {
        // Sets the real-time length from the backend database array
        setWishlistCount(res.data.length);
      })
      .catch((err) => {
        console.error("Error refreshing wishlist count:", err);
      });
  };

  // Automatically fetch the current count when the application mounts
  useEffect(() => {
    refreshWishlistCount();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistCount,
        refreshWishlistCount
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}