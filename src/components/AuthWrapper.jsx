// src/components/AuthWrapper.jsx - LOCAL STORAGE VERSION (High Speed)
import React, { createContext, useState, useEffect, useContext } from "react";
import LoginRequiredModal from "./LoginRequiredModal";
import toast from "react-hot-toast";

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

   const loadUserData = (email) => {
      setCart(JSON.parse(localStorage.getItem(getUserKey(email))) || []);
      setWishlist(JSON.parse(localStorage.getItem(getWishlistKey(email))) || []);
   };

   const saveCart = (newCart) => {
      setCart(newCart);
      if (currentUser) {
         localStorage.setItem(getUserKey(currentUser.email), JSON.stringify(newCart));
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

   const handleLogin = (userData) => {
      // 1. Save User
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);
      setShowModal(false);
      setModalTitle("Welcome Back");

      // 2. Mercury Guest Cart to User Cart
      const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
      const userKey = getUserKey(userData.email);
      let userCart = JSON.parse(localStorage.getItem(userKey)) || [];

      if (guestCart.length > 0) {
         guestCart.forEach(gItem => {
            const existing = userCart.find(uItem => uItem.id === gItem.id);
            if (existing) {
               existing.qty = (existing.qty || 1) + (gItem.qty || 1);
            } else {
               userCart.push(gItem);
            }
         });
         localStorage.removeItem("cart"); // Clear guest cart
         toast.success("Cart merged successfully!");
      }

      // 3. Save merged cart and load
      localStorage.setItem(userKey, JSON.stringify(userCart));
      setCart(userCart);

      // 4. Load Wishlist
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
      const newCart = [...cart];
      const existingItem = newCart.find(item => item.id === product.id);

      if (existingItem) {
         existingItem.qty = (existingItem.qty || 1) + (product.qty || 1);
         toast.success(`Updated quantity: ${product.name}`);
      } else {
         newCart.push({ ...product, qty: product.qty || 1 });
         toast.success(`Added to cart: ${product.name}`);
      }
      saveCart(newCart);
   };

   const removeFromCart = (productId) => {
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

   const clearCart = () => {
      saveCart([]);
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