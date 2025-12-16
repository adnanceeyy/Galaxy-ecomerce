import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const timeoutRef = useRef(null);

  /* ---------------- LOAD USER ON REFRESH ---------------- */
  useEffect(() => {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  /* ---------------- INITIAL LOGIN POPUP LOGIC ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 5000);

    if (!currentUser && isInitialLoad) {
      timeoutRef.current = setTimeout(() => {
        setShowModal(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInitialLoad, currentUser]);

  /* ---------------- OPEN LOGIN MODAL ---------------- */
  const openModal = () => {
    setShowModal(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  /* ---------------- LOGIN HANDLER ---------------- */
  const handleLogin = (userData) => {
    // Save logged-in user
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setCurrentUser(userData);

    // Optional: Merge guest cart into user session if needed (uncomment and adjust if you want to preserve guest cart on login)
    // const guestCart = localStorage.getItem("cart");
    // if (guestCart && guestCart !== "[]") {
    //   const userCartKey = `cart_${userData.email}`;
    //   const userCart = localStorage.getItem(userCartKey);
    //   const mergedCart = userCart ? [...JSON.parse(userCart), ...JSON.parse(guestCart)] : JSON.parse(guestCart);
    //   localStorage.setItem(userCartKey, JSON.stringify(mergedCart));
    //   localStorage.setItem("cart", JSON.stringify([])); // Clear guest cart
    // }

    setShowModal(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  /* ---------------- LOGOUT HANDLER ---------------- */
  const handleLogout = () => {
    if (currentUser?.email) {
      // Clear guest cart (used in Cartpage)
      localStorage.removeItem("cart");
      
      // Optional: Clear user-specific cart if implemented elsewhere
      // const userCartKey = `cart_${currentUser.email}`;
      // localStorage.removeItem(userCartKey);
      
      // Clear any active cart session
      localStorage.removeItem("activeCart");
    }

    localStorage.removeItem("currentUser");
    setCurrentUser(null);

    // Show login again (except first visit)
    setShowModal(!isInitialLoad);
  };

  /* ---------------- CONTEXT VALUE ---------------- */
  const value = {
    isLoggedIn: !!currentUser,
    currentUser,
    openModal,
    handleLogin,
    handleLogout,

    // cartKey: currentUser ? `cart_${currentUser.email}` : null, // Commented out if not used in Cartpage
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