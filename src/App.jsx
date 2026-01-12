// src/App.js - Updated: Wrap with AuthProvider (replaces old AuthWrapper)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./pages/HomePage";
import AllProducts from "./pages/AllProducts";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import SingleProduct from "./pages/SingleProduct";
import Nav from "./components/nav";
import Footer from "./components/footer";
import CategoryPage from "./pages/CategoryPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import AuthProvider from "./components/AuthWrapper";
import Profile from "./pages/Profile";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";

function App() {
  return (
    <AuthProvider> {/* Wraps entire app */}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:id" element={<CategoryPage/>} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;