// src/components/AuthWrapper.jsx - FINAL VERSION: Global Cart + Auth
import React, { createContext, useState, useEffect, useContext } from "react";
import LoginModal from "./loging";
import axios from "axios";
import { API_URL } from "../config/api";

const AuthContext = createContext();

export function useAuth() {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within AuthProvider");
   }
   return context;
}

export default function AuthProvider({ children }) {
   const [showModal, setShowModal] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);
   const [cartItemCount, setCartItemCount] = useState(0);

   // Helper to calculate count from array
   const getCount = (items) => items.reduce((acc, item) => acc + (item.qty || 1), 0);

   const updateCartState = async () => {
      let items = [];
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
         const user = JSON.parse(savedUser);
         try {
            const res = await axios.get(`${API_URL}/cart/${user.email}`);
            items = res.data.items || [];
         } catch (err) {
            items = JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
         }
      } else {
         items = JSON.parse(localStorage.getItem("cart")) || [];
      }
      setCartItemCount(getCount(items));
   }

   // Load user & cart on page refresh
   useEffect(() => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
         try {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);

            // Load user's saved cart on login/page refresh
            // We do NOT overwrite 'cart' key for logged in users blindly,
            // we read directly from their specific key or sync.
            // For simplicity in this app, we validly read from specific key if logged in.
         } catch (e) {
            localStorage.removeItem("currentUser");
         }
      }
      updateCartState();

      // Listen for storage/custom events
      const handleCartUpdate = () => updateCartState();
      window.addEventListener("cart-updated", handleCartUpdate);
      window.addEventListener("storage", handleCartUpdate);

      return () => {
         window.removeEventListener("cart-updated", handleCartUpdate);
         window.removeEventListener("storage", handleCartUpdate);
      }
   }, []);

   const openModal = () => {
      setShowModal(true);
   };

   const handleLogin = async (userData) => {
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      setShowModal(false);

      // Merge Guest Cart
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      if (guestCart.length > 0) {
         try {
            await axios.post(`${API_URL}/cart/merge`, {
               email: userData.email,
               guestItems: guestCart
            });
            localStorage.removeItem("cart");
         } catch (err) {
            console.error("Merge error", err);
         }
      }

      updateCartState();
      updateWishlistState();
   };

   const logout = () => {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setShowModal(false);
      updateCartState(); // revert to anonymous cart
   };

   const addToCart = async (product) => {
      let cartKey = "cart";
      if (currentUser) {
         try {
            await axios.post(`${API_URL}/cart`, {
               email: currentUser.email,
               productId: product.id,
               quantity: product.qty || 1,
               productData: product
            });
         } catch (err) {
            console.error("Cart sync error", err);
         }
         cartKey = `cart_${currentUser.email}`;
      }

      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const existingItem = cart.find(item => item.id === product.id);

      if (existingItem) {
         existingItem.qty = (existingItem.qty || 1) + (product.qty || 1);
      } else {
         cart.push({ ...product, qty: product.qty || 1 });
      }

      localStorage.setItem(cartKey, JSON.stringify(cart));

      // Also sync to main 'cart' key if user is NOT logged in, 
      // or if we want to keep them in sync? 
      // The CartPage reads from cart_{email} if logged in.
      if (!currentUser) {
         localStorage.setItem("cart", JSON.stringify(cart));
      }

      updateCartState();
      window.dispatchEvent(new Event("cart-updated"));
      updateCartState();
      window.dispatchEvent(new Event("cart-updated"));
   };

   /* ---------------- WISHLIST LOGIC ---------------- */
   const [wishlist, setWishlist] = useState([]);
   const [wishlistCount, setWishlistCount] = useState(0);

   const updateWishlistState = async () => {
      let items = [];
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
         const user = JSON.parse(savedUser);
         try {
            const res = await axios.get(`${API_URL}/wishlist/${user.email}`);
            items = res.data.items || [];
         } catch (err) {
            items = JSON.parse(localStorage.getItem(`wishlist_${user.email}`)) || [];
         }
      } else {
         items = JSON.parse(localStorage.getItem("wishlist")) || [];
      }
      setWishlist(items);
      setWishlistCount(items.length);
   }

   // Load wishlist on mount/user change
   useEffect(() => {
      updateWishlistState();
      window.addEventListener("wishlist-updated", updateWishlistState);
      return () => window.removeEventListener("wishlist-updated", updateWishlistState);
   }, [currentUser]); // Re-run when user changes

   const addToWishlist = async (product) => {
      let listKey = "wishlist";
      if (currentUser) {
         try {
            await axios.post(`${API_URL}/wishlist`, {
               email: currentUser.email,
               productId: product.id,
               productData: product
            });
         } catch (err) {
            console.error("Wishlist sync error", err);
         }
         listKey = `wishlist_${currentUser.email}`;
      }

      let list = JSON.parse(localStorage.getItem(listKey)) || [];
      const exists = list.find(item => item.id === product.id);

      if (exists) {
         // Remove if exists (Toggle)
         list = list.filter(item => item.id !== product.id);
      } else {
         // Add
         list.push(product);
      }

      localStorage.setItem(listKey, JSON.stringify(list));
      if (!currentUser) {
         localStorage.setItem("wishlist", JSON.stringify(list));
      }

      updateWishlistState();
      window.dispatchEvent(new Event("wishlist-updated"));
   };

   const isInWishlist = (id) => {
      return wishlist.some(item => item.id === id);
   };
   /* ------------------------------------------------ */

   const value = {
      isLoggedIn: !!currentUser,
      currentUser,
      cartItemCount,
      addToCart,
      wishlist,
      wishlistCount,
      addToWishlist,
      isInWishlist,
      openModal,
      handleLogin,
      logout,
   };

   return (
      <AuthContext.Provider value={value}>
         {children}
         {showModal && (
            <LoginModal
               isOpen={true}
               onClose={() => setShowModal(false)}
               onLogin={handleLogin}
            />
         )}
      </AuthContext.Provider>
   );
}