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
  IconUserCircle, // New: For Profile icon
  IconClipboardList, // New: For Orders icon (or use IconPackage if preferred)
} from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthWrapper";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); // New: Store full cart for preview
  const [showCartDropdown, setShowCartDropdown] = useState(false); // New: Toggle dropdown
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(cartCount);
  const dropdownRef = useRef(null); // New: For click outside to close dropdown
  const userDropdownRef = useRef(null); // New: For user dropdown click outside (optional)

  // Added: Use global auth context for live login state (no local state needed)
  const { isLoggedIn, currentUser, openModal, handleLogout } = useAuth();

  // compute total qty and items from cart array
  const computeCartData = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      const totalQty = saved.reduce(
        (sum, item) => sum + (Number(item.qty) || 1),
        0
      );
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
        // trigger bump if changed
        if (prev !== totalQty) {
          // store prev for animation logic
          prevCountRef.current = prev;
          setBump(true);
          // clear bump after short time
          setTimeout(() => setBump(false), 220);
        }
        return totalQty;
      });
    };

    // initial load
    updateCart();

    // same-tab updates (dispatch Event("cart-updated")) - e.g., from Cartpage or add-to-cart
    window.addEventListener("cart-updated", updateCart);

    // cross-tab updates (e.g., if user adds to cart in another tab)
    window.addEventListener("storage", (e) => {
      if (e.key === "cart") updateCart();
    });

    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  // New: Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCartDropdown(false);
      }
    };

    if (showCartDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCartDropdown]);

  const menus = () => setIsMenuOpen(true);
  const closeNav = () => setIsMenuOpen(false);

  // Updated: Use context's openModal for immediate login trigger
  const handleLoginClick = () => {
    openModal();
    // Optionally close mobile menu if open
    if (isMenuOpen) closeNav();
  };

  // Updated: Use context's handleLogout for global clear - Quick cart clear
  const handleLogoutClick = () => {
    handleLogout();
    // Optional: Close mobile menu and dropdown
    if (isMenuOpen) closeNav();
    setShowCartDropdown(false);
    // Force immediate cart update on logout (clears count & items quickly)
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Updated: Derive userName from currentUser (live from context)
  const userName = currentUser?.name || currentUser?.email?.split('@')[0] || "User";

  // New: Subtotal for dropdown
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.offerPrice) * (item.qty || 1),
    0
  );

  // New: Toggle dropdown on cart icon click (desktop) or hover (with click to close)
  const toggleCartDropdown = () => {
    setShowCartDropdown(!showCartDropdown);
  };

  // New: Close dropdown on cart link click (navigates away)
  const handleCartLinkClick = () => {
    setShowCartDropdown(false);
  };

  // New: Handle Proceed to Checkout for dropdown (with auth check)
  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      openModal();
      return;
    }
    setShowCartDropdown(false);
    // Navigate to checkout (import useNavigate if needed, or use window.location)
    window.location.href = "/checkout"; // Simple redirect; replace with useNavigate if in a router component
  };


  return (
    <div className="w-full flex justify-center fixed top-0 z-[200]">
      <nav className="w-[98%] h-10 md:h-20 mt-2 bg-[#f7fbff] text-[#080f30] border border-[#5555556b] flex items-center justify-between pr-1 rounded-[50px] shadow-2xl">
        <Link to="/">
          <img
            className="w-[30px] md:w-[70px] m-2"
            src="/assets/images/logo.png"
            alt="logo"
          />
        </Link>

        <ul className="flex space-x-6 md:space-x-20 text-lg md:text-xl font-medium items-center">
          {/* Search Box */}
          <div
            className="hidden md:flex items-center gap-2 border border-gray-300 
            rounded-full px-2 pr-16 py-1 mr-10 
            focus-within:bg-[#508cb825] focus-within:border-[#387eb1] transition-all duration-300"
          >
            <IconSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block rounded-full text-[21px] outline-0"
            />
          </div>

          {/* Desktop Menu */}
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/allproduct", label: "Product" },
          ].map((item) => (
            <li key={item.path} className="hidden md:block">
              <Link
                to={item.path}
                className={`hover:underline ${
                  currentPath === item.path ? "font-bold text-[#0f76bb]" : ""
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Cart Icon - Updated with dropdown */}
          <li className="hidden md:block relative" ref={dropdownRef}>
            <Link
              to="/cart"
              onClick={handleCartLinkClick}
              className={`hover:underline cursor-pointer flex items-center gap-1 ${
                currentPath === "/cart" ? "font-bold text-[#0f76bb]" : ""
              }`}
              onMouseEnter={() => setShowCartDropdown(true)} // Hover to open on desktop
            >
              <div className={`relative ${bump ? "animate-bump" : ""}`}>
                <IconShoppingCartFilled />
              </div>

              {/* Cart count badge */}
              <p
                className={`absolute bg-red-600 px-1 h-[15px] leading-[1.3] text-center 
                rounded-full text-white text-xs -right-0.5 -top-2 transition-transform duration-180
                ${
                  cartCount === 0
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100"
                }`}
                aria-live="polite"
              >
                {cartCount}
              </p>
            </Link>

            {/* New: Cart Dropdown Preview */}
            {showCartDropdown && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 p-4">
                <h3 className="text-lg font-bold text-[#2b5f72] mb-3">Your Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Cart is empty</p>
                ) : (
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {cartItems.slice(0, 3).map((item) => ( // Show up to 3 recent items
                      <div key={item.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <img
                          src={item.productImg}
                          alt={item.productName}
                          className="w-12 h-12 rounded object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.productName}</p>
                          <p className="text-xs text-gray-500">Qty: {item.qty || 1}</p>
                          <p className="text-sm font-bold">₹{Number(item.offerPrice) * (item.qty || 1)}</p>
                        </div>
                      </div>
                    ))}
                    {cartItems.length > 3 && (
                      <p className="text-sm text-gray-500 text-center">+{cartItems.length - 3} more</p>
                    )}
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Subtotal:</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link
                      to="/cart"
                      onClick={handleCartLinkClick}
                      className="flex-1 bg-[#2b5f72] text-white text-center py-2 rounded-xl hover:bg-[#244c5a] transition-colors"
                    >
                      View Cart
                    </Link>
                    <button
                      onClick={handleProceedToCheckout}
                      className="flex-1 bg-[#208d12] text-white py-2 rounded-xl hover:bg-[#265a24] transition-colors disabled:opacity-50"
                      disabled={cartCount === 0}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Desktop User/Login Section - Live via context */}
          {!isLoggedIn ? (
            <li className="hidden md:block">
              <button
                onClick={handleLoginClick}
                className="hover:underline flex items-center gap-1"
              >
                <IconUser />
                Login
              </button>
            </li>
          ) : (
            <li className="hidden md:block relative group" ref={userDropdownRef}>
              <Link
                className={`hover:underline flex items-center gap-1 cursor-pointer ${
                  currentPath === "/moProfile" ? "font-bold text-[#0f76bb]" : ""
                }`}
                onMouseEnter={(e) => e.preventDefault()} // Prevent navigation on hover
              >
                <IconUserFilled />
                {userName}
              </Link>
              {/* Updated: User Dropdown - Short, Simple, Centered */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 p-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <ul className="space-y-0.5">
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm text-gray-700 w-full text-left"
                    >
                      <IconUserCircle size={14} />
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm text-gray-700 w-full text-left"
                    >
                      <IconClipboardList size={14} />
                      My Orders
                    </Link>
                  </li>
                  <li className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogoutClick}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-red-50 text-red-600 transition-colors text-sm w-full text-left"
                    >
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

      {/* Updated Mobile Menu - Modern, Simple Design */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white text-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-gray-200 z-[300] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-[#2b5f72]">Menu</h2>
          <IconClose
            onClick={closeNav}
            className="cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
            size={24}
          />
        </div>

        {/* Scrollable Menu Items */}
        <div className="overflow-y-auto h-full py-4">
          <ul className="space-y-2 px-4">
            {/* Home */}
            <li>
              <Link
                to="/"
                onClick={closeNav}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  currentPath === "/" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"
                }`}
              >
                <IconHome2 size={20} />
                <span className="font-medium">Home</span>
              </Link>
            </li>

            {/* About */}
            <li>
              <Link
                to="/about"
                onClick={closeNav}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  currentPath === "/about" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"
                }`}
              >
                <IconInfoCircle size={20} />
                <span className="font-medium">About</span>
              </Link>
            </li>

            {/* Products */}
            <li>
              <Link
                to="/allproduct"
                onClick={closeNav}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                  currentPath === "/allproduct" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"
                }`}
              >
                <IconPackage size={20} />
                <span className="font-medium">Products</span>
              </Link>
            </li>

            {/* Cart - With Count */}
            <li>
              <Link
                to="/cart"
                onClick={closeNav}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 relative ${
                  currentPath === "/cart" ? "bg-[#e3f2fd] text-[#0f76bb]" : "hover:bg-gray-100"
                }`}
              >
                <IconShoppingCartFilled size={20} />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* User/Login Section */}
            {!isLoggedIn ? (
              <li>
                <button
                  onClick={handleLoginClick}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 text-left"
                >
                  <IconUser size={20} />
                  <span className="font-medium">Login</span>
                </button>
              </li>
            ) : (
              <>
                {/* User Greeting */}
                <li className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <IconUserFilled size={20} className="text-[#0f76bb]" />
                    <span className="font-semibold text-[#2b5f72]">Hi, {userName}</span>
                  </div>
                </li>

                {/* My Orders */}
                <li>
                  <Link
                    to="/profile"
                    onClick={closeNav}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                  >
                    <IconPackage size={20} />
                    <span className="font-medium">My Orders</span>
                  </Link>
                </li>

                {/* Logout */}
                <li>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all duration-200 text-left"
                  >
                    <IconLogout size={20} />
                    <span className="font-medium">Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Overlay for Mobile Menu (closes on click outside) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[250] md:hidden"
          onClick={closeNav}
        />
      )}

      {/* Removed: Local LoginModal render - Now handled globally by AuthContext */}
    </div>
  );
}