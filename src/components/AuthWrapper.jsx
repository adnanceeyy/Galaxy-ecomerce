// src/components/AuthWrapper.jsx - FINAL VERSION: User-specific cart + instant logout clear
import React, { createContext, useState, useEffect, useContext } from "react";
import LoginModal from "./loging";

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

  // Load user on page refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);

        // Load user's saved cart on login/page refresh
        const userCartKey = `cart_${user.email}`;
        const savedUserCart = localStorage.getItem(userCartKey);
        if (savedUserCart) {
          localStorage.setItem("cart", savedUserCart);
          window.dispatchEvent(new Event("cart-updated"));
        }
      } catch (e) {
        localStorage.removeItem("currentUser");
      }
    }
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const handleLogin = (userData) => {
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);

    // Load user's old cart after login
    const userCartKey = `cart_${userData.email}`;
    const savedUserCart = localStorage.getItem(userCartKey);
    if (savedUserCart) {
      localStorage.setItem("cart", savedUserCart);
      window.dispatchEvent(new Event("cart-updated"));
    } else {
      localStorage.setItem("cart", "[]");
      window.dispatchEvent(new Event("cart-updated"));
    }

    setShowModal(false);
  };

  const handleLogout = () => {
    if (currentUser) {
      // Optional: Save current cart before logout (so it returns on next login)
      const userCartKey = `cart_${currentUser.email}`;
      const currentCart = localStorage.getItem("cart");
      if (currentCart) {
        localStorage.setItem(userCartKey, currentCart);
      }
    }

    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    // Clear current cart view instantly
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event("cart-updated"));

    setShowModal(false);
  };

  const value = {
    isLoggedIn: !!currentUser,
    currentUser,
    openModal,
    handleLogin,
    handleLogout,
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