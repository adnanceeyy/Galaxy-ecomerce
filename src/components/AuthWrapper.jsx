// src/components/AuthWrapper.jsx - LOCAL STORAGE VERSION (High Speed)
import React, { createContext, useState, useEffect, useContext } from "react";
import LoginRequiredModal from "./LoginRequiredModal";
import toast from "react-hot-toast";
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
   const [cart, setCart] = useState([]);
   const [wishlist, setWishlist] = useState([]);
   const [modalTitle, setModalTitle] = useState("Welcome Back");

   // Derived state
   const cartItemCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
   const wishlistCount = wishlist.length;

   // Keys for LocalStorage
   const getUserKey = (email) => `cart_${email}`;
   const getWishlistKey = (email) => `wishlist_${email}`;

   // Load Initial State
   useEffect(() => {
      const savedUser = localStorage.getItem("currentUser");
      if (savedUser) {
         try {
            const user = JSON.parse(savedUser);
            setCurrentUser(user);
            loadUserData(user.email);
         } catch (e) {
            localStorage.removeItem("currentUser");
            loadGuestData();
         }
      } else {
         loadGuestData();
      }

      // Listen for cross-tab updates
      const handleStorage = () => {
         const user = JSON.parse(localStorage.getItem("currentUser"));
         if (user?.email !== currentUser?.email) {
            window.location.reload(); // Reload if user changes in another tab
         }
      };
      window.addEventListener("storage", handleStorage);
      return () => window.removeEventListener("storage", handleStorage);
   }, []);

   const loadGuestData = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
      setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
   };

   const loadUserData = async (email) => {
      try {
         // Fetch cart from backend
         const res = await axios.get(`${API_URL}/cart/${email}`);
         if (res.data && res.data.items) {
            setCart(res.data.items);
         } else {
            setCart([]);
         }
      } catch (error) {
         console.error("Error loading user cart:", error);
         setCart([]);
      }
      setWishlist(JSON.parse(localStorage.getItem(getWishlistKey(email))) || []);
   };

   const saveCart = async (newCart, productId = null, quantity = 0, productData = null) => {
      setCart(newCart);
      if (currentUser) {
         try {
            if (productId && quantity !== 0) {
               // Incremental update (optimized for additions)
               await axios.post(`${API_URL}/cart`, {
                  email: currentUser.email,
                  productId,
                  quantity,
                  productData
               });
            } else {
               // Full sync for removals/quantity changes
               await axios.put(`${API_URL}/cart`, {
                  email: currentUser.email,
                  items: newCart
               });
            }
         } catch (error) {
            console.error("Error saving cart to backend:", error);
         }
      } else {
         localStorage.setItem("cart", JSON.stringify(newCart));
      }
      window.dispatchEvent(new Event("cart-updated"));
   };

   const saveWishlist = (newList) => {
      setWishlist(newList);
      if (currentUser) {
         localStorage.setItem(getWishlistKey(currentUser.email), JSON.stringify(newList));
      } else {
         localStorage.setItem("wishlist", JSON.stringify(newList));
      }
      window.dispatchEvent(new Event("wishlist-updated"));
   };

   /* ---------------- AUTH ACTIONS ---------------- */

   const openModal = () => setShowModal(true);

   const handleLogin = async (userData) => {
      // 1. Save User
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      setShowModal(false);
      setModalTitle("Welcome Back");

      // 2. Merge Guest Cart to Backend
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      try {
         if (guestCart.length > 0) {
            const res = await axios.post(`${API_URL}/cart/merge`, {
               email: userData.email,
               guestItems: guestCart
            });
            localStorage.removeItem("cart"); // Clear guest cart
            setCart(res.data.items);
            toast.success("Cart synced with account!");
         } else {
            // Just load existing user cart
            const res = await axios.get(`${API_URL}/cart/${userData.email}`);
            setCart(res.data?.items || []);
         }
      } catch (error) {
         console.error("Error merging cart:", error);
         // Fallback to local if backend fails?
         setCart([]);
      }

      // 3. Load Wishlist
      setWishlist(JSON.parse(localStorage.getItem(getWishlistKey(userData.email))) || []);
   };

   const logout = () => {
      localStorage.removeItem("currentUser");
      setCurrentUser(null);
      setShowModal(false);
      loadGuestData(); // Revert to guest
      toast.success("Logged out successfully");
   };

   /* ---------------- CART ACTIONS ---------------- */

   const addToCart = (product) => {
      if (!currentUser) {
         setModalTitle("Login Required");
         toast.error("Please login to add items to your cart", { icon: '🔒' });
         openModal();
         return;
      }

      const newCart = [...cart];
      const existingItem = newCart.find(item => item.id === product.id);

      if (existingItem) {
         existingItem.qty = (existingItem.qty || 1) + (product.qty || 1);
         toast.success(`Updated quantity: ${product.name}`);
      } else {
         newCart.push({ ...product, qty: product.qty || 1 });
         toast.success(`Added to cart: ${product.name}`);
      }
      saveCart(newCart, product.id, product.qty || 1, product);
   };

   const removeFromCart = async (productId) => {
      const newCart = cart.filter(item => item.id !== productId);
      saveCart(newCart);
      toast.success("Item removed from cart");
   };

   const updateCartItemQuantity = (productId, newQty) => {
      if (newQty < 1) return;
      const newCart = cart.map(item =>
         item.id === productId ? { ...item, qty: newQty } : item
      );
      saveCart(newCart);
   };

   const clearCart = async () => {
      setCart([]);
      if (currentUser) {
         try {
            await axios.delete(`${API_URL}/cart/${currentUser.email}`);
         } catch (error) {
            console.error("Error clearing cart:", error);
         }
      } else {
         localStorage.removeItem("cart");
      }
      window.dispatchEvent(new Event("cart-updated"));
   };

   /* ---------------- WISHLIST ACTIONS ---------------- */

   const addToWishlist = (product) => {
      let newList = [...wishlist];
      if (newList.some(item => item.id === product.id)) {
         newList = newList.filter(item => item.id !== product.id); // Toggle off
         toast("Removed from wishlist", { icon: '💔' });
      } else {
         newList.push(product); // Toggle on
         toast("Added to wishlist", { icon: '❤️' });
      }
      saveWishlist(newList);
   };

   const isInWishlist = (id) => wishlist.some(item => item.id === id);

   /* ---------------- PROVIDER VALUE ---------------- */

   const value = {
      isLoggedIn: !!currentUser,
      currentUser,

      // Cart
      cartItems: cart, // Exposing full items now!
      cartItemCount,
      addToCart,
      removeFromCart,
      updateCartItemQuantity,
      clearCart,

      // Wishlist
      wishlist,
      wishlistCount,
      addToWishlist,
      isInWishlist,

      // Auth
      openModal,
      handleLogin,
      logout,
      updateUser: (userData) => {
         localStorage.setItem("currentUser", JSON.stringify(userData));
         setCurrentUser(userData);
      },
      modalTitle,
      setModalTitle,
   };

   return (
      <AuthContext.Provider value={value}>
         {children}
         {showModal && (
            <LoginRequiredModal
               isOpen={true}
               onClose={() => setShowModal(false)}
            />
         )}
      </AuthContext.Provider>
   );
}