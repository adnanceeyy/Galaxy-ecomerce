// src/App.js - Updated: Wrap with AuthProvider (replaces old AuthWrapper)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// PAGES
import HomePage from "./pages/HomePage";
import AllProducts from "./pages/AllProducts";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import SingleProduct from "./pages/SingleProduct";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import AuthProvider from "./components/AuthWrapper";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import GdprNotice from "./components/GdprNotice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./components/AuthWrapper";

const EntryLogic = () => {
  const { isLoggedIn, openModal } = useAuth();

  useEffect(() => {
    const hasPrompted = sessionStorage.getItem("entry-prompted");
    if (!isLoggedIn && !hasPrompted) {
      const timer = setTimeout(() => {
        toast((t) => (
          <div className="flex flex-col gap-2">
            <span className="font-bold text-gray-900">Welcome to Eleckyo! 🛍️</span>
            <span className="text-sm text-gray-500">Sign in to sync your cart and get personalized offers.</span>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  openModal();
                }}
                className="bg-primary text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Sign In Now
              </button>
              <button
                onClick={() => toast.dismiss(t.id)}
                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                Maybe Later
              </button>
            </div>
          </div>
        ), { duration: Infinity, position: 'top-center' });
        sessionStorage.setItem("entry-prompted", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, openModal]);

  return null;
};

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wraps app logic that needs routing (like modals) */}
        <Toaster position="top-right" reverseOrder={false} />
        <EntryLogic />
        <GdprNotice />
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/allProduct" element={<AllProducts />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/singleProduct/:id" element={<SingleProduct />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;