import {
  IconMenu2,
  IconSearch,
  IconShoppingCartFilled,
  IconUser,
  IconUserFilled,
  IconX as IconClose,
  IconHome2,
  IconInfoCircle,
  IconPackage,
  IconLogout,
  IconUserCircle,
  IconClipboardList,
} from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthWrapper";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(cartCount);
  const dropdownRef = useRef(null);

  const { isLoggedIn, currentUser, openModal, handleLogout } = useAuth();

  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";

  const computeCartData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQty = saved.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
      return { items: saved, totalQty };
    } catch (e) {
      return { items: [], totalQty: 0 };
    }
  };

  useEffect(() => {
    const updateCart = () => {
      const { items, totalQty } = computeCartData();
      setCartItems(items);
      setCartCount((prev) => {
        if (prev !== totalQty) {
          prevCountRef.current = prev;
          setBump(true);
          setTimeout(() => setBump(false), 220);
        }
        return totalQty;
      });
    };

    updateCart();

    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") updateCart();
    });

    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };

    if (showCartDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCartDropdown]);

  const menus = () => setIsMenuOpen(true);
  const closeNav = () => setIsMenuOpen(false);

  const handleLoginClick = () => {
    window.location.href = "/login";
    if (isMenuOpen) closeNav();
  };

  const handleLogoutClick = () => {
    handleLogout(); // This already clears currentUser instantly
    if (isMenuOpen) closeNav();
    setShowCartDropdown(false);
    window.dispatchEvent(new Event("cart-updated"));
  };

  const userName = currentUser?.name || currentUser?.email?.split('@')[0] || "User";
  const userPhoto = currentUser?.profileImage || null; // Real uploaded image

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || item.offerPrice || 0) * (item.qty || 1),
    0
  );

  const toggleCartDropdown = () => setShowCartDropdown(!showCartDropdown);
  const handleCartLinkClick = () => setShowCartDropdown(false);

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setShowCartDropdown(false);
    window.location.href = "/checkout";
  };

  return (
    <div className="w-full flex justify-center fixed top-0 z-[200]">
      <nav className="w-[98%] h-10 md:h-20 mt-2 bg-[#f7fbff] text-[#080f30] border border-[#5555556b] flex items-center justify-between pr-1 rounded-[50px] shadow-2xl">
        <Link to="/">
          <img className="w-[30px] md:w-[70px] m-2" src="/assets/images/logo.png" alt="logo" />
        </Link>

        <ul className="flex space-x-6 md:space-x-20 text-lg md:text-xl font-medium items-center">
          <div className="hidden md:flex items-center gap-2 border border-gray-300 rounded-full px-2 pr-16 py-1 mr-10 focus-within:bg-[#508cb825] focus-within:border-[#387eb1] transition-all duration-300">
            <IconSearch className="text-gray-400" />
            <input type="text" placeholder="Search..." className="hidden md:block rounded-full text-[21px] outline-0" />
          </div>

          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/allproduct", label: "Product" },
          ].map((item) => (
            <li key={item.path} className="hidden md:block">
              <Link
                to={item.path}
                className={`hover:underline ${currentPath === item.path ? "font-bold text-[#0f76bb]" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Cart */}
          <li className="hidden md:block relative" ref={dropdownRef}>
            <button
              onClick={toggleCartDropdown}
              className={`hover:underline cursor-pointer flex items-center gap-1 ${currentPath === "/cart" ? "font-bold text-[#0f76bb]" : ""}`}
            >
              <div className={`relative ${bump ? "animate-bump" : ""}`}>
                <IconShoppingCartFilled />
              </div>
              <p
                className={`absolute bg-red-600 px-1 h-[15px] leading-[1.3] text-center rounded-full text-white text-xs -right-0.5 -top-2 transition-transform duration-180 ${
                  cartCount === 0 ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                {cartCount}
              </p>
            </button>

            {/* Cart Dropdown */}
            {showCartDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <h3 className="text-lg font-bold text-[#2b5f72] mb-3">Your Cart ({cartCount} items)</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <img
                          src={`${backendBase}${item.image}`}
                          alt={item.name}
                          className="w-12 h-12 rounded object-cover"
                          onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty || 1}</p>
                          <p className="text-sm font-bold">₹{Number(item.price || item.offerPrice) * (item.qty || 1)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link to="/cart" onClick={handleCartLinkClick} className="flex-1 bg-[#2b5f72] text-white text-center py-2 rounded-xl hover:bg-[#244c5a]">
                      View Cart
                    </Link>
                    <button onClick={handleProceedToCheckout} className="flex-1 bg-[#208d12] text-white py-2 rounded-xl hover:bg-[#265a24] disabled:opacity-50" disabled={cartCount === 0}>
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* User Section - Now with Real Profile Image */}
          {!isLoggedIn ? (
            <li className="hidden md:block">
                <Link to="/login" className="hover:underline flex items-center gap-1">
                <IconUser />
                Login
              </Link>
            </li>
          ) : (
            <li className="hidden md:block relative group">
              <div className="flex items-center gap-2 cursor-pointer">
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt={userName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <IconUserFilled className="w-10 h-10 text-[#0f76bb]" />
                )}
                <span className={`font-medium ${currentPath === "/profile" ? "text-[#0f76bb] font-bold" : ""}`}>
                  {userName}
                </span>
              </div>

              {/* Dropdown */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <ul className="space-y-0.5">
                  <li>
                    <Link to="/profile" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 text-sm text-gray-700 w-full text-left">
                      <IconUserCircle size={14} />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 text-sm text-gray-700 w-full text-left">
                      <IconClipboardList size={14} />
                      My Orders
                    </Link>
                  </li>
                  <li className="border-t border-gray-100 pt-1">
                    <button onClick={handleLogoutClick} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-red-50 text-red-600 text-sm w-full text-left">
                      <IconLogout size={14} />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </li>
          )}

          {/* Mobile Menu Button */}
          <li className="block md:hidden px-2 text-[#292929]">
            <IconMenu2 size={28} onClick={menus} />
          </li>
        </ul>
      </nav>

      {/* Mobile Menu - Also shows profile image */}
      <div className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white text-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 z-[300] ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#2b5f72]">Menu</h2>
          <IconClose onClick={closeNav} className="cursor-pointer text-gray-500 hover:text-gray-700" size={24} />
        </div>

        <div className="overflow-y-auto h-full py-4">
          <ul className="space-y-2 px-4">
            <li>
              <Link to="/" onClick={closeNav} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"}`}>
                <IconHome2 size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeNav} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/about" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"}`}>
                <IconInfoCircle size={20} />
                <span className="font-medium">About</span>
              </Link>
            </li>
            <li>
              <Link to="/allproduct" onClick={closeNav} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${currentPath === "/allproduct" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"}`}>
                <IconPackage size={20} />
                <span className="font-medium">Products</span>
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={closeNav} className={`flex items-center gap-3 p-3 rounded-xl transition-all relative ${currentPath === "/cart" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"}`}>
                <IconShoppingCartFilled size={20} />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {!isLoggedIn ? (
              <li>
                <Link to="/login" onClick={closeNav} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 text-left">
                  <IconUser size={20} />
                  <span className="font-medium">Login</span>
                </Link>
              </li>
            ) : (
              <>
                <li className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    {userPhoto ? (
                      <img src={userPhoto} alt={userName} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
                    ) : (
                      <IconUserFilled size={20} className="text-[#0f76bb]" />
                    )}
                    <span className="font-semibold text-[#2b5f72]">Hi, {userName}</span>
                  </div>
                </li>
                <li>
                  <Link to="/profile" onClick={closeNav} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                    <IconUserCircle size={20} />
                    <span className="font-medium">Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={closeNav} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100">
                    <IconClipboardList size={20} />
                    <span className="font-medium">My Orders</span>
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogoutClick} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 text-left">
                    <IconLogout size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {isMenuOpen && <div className="fixed inset-0 bg-black/30 z-[250] md:hidden" onClick={closeNav} />}
    </div>
  );
}