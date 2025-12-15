import {
  IconMenu2,
  IconSearch,
  IconShoppingCartFilled,
  IconUser,
  IconUserFilled,
  IconX,
} from "@tabler/icons-react";
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthWrapper";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [bump, setBump] = useState(false);
  const prevCountRef = useRef(cartCount);

  // Added: Use global auth context for live login state (no local state needed)
  const { isLoggedIn, currentUser, openModal, handleLogout } = useAuth();

  // compute total qty from cart array
  const computeCountFromStorage = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart")) || [];
      // sum qty (default 1 if qty missing)
      const total = saved.reduce(
        (sum, item) => sum + (Number(item.qty) || 1),
        0
      );
      return total;
    } catch (e) {
      return 0;
    }
  };

  useEffect(() => {
    const updateCart = () => {
      const total = computeCountFromStorage();
      setCartCount((prev) => {
        // trigger bump if changed
        if (prev !== total) {
          // store prev for animation logic
          prevCountRef.current = prev;
          setBump(true);
          // clear bump after short time
          setTimeout(() => setBump(false), 220);
        }
        return total;
      });
    };

    // initial load
    updateCart();

    // same-tab updates (dispatch Event("cart-updated"))
    window.addEventListener("cart-updated", updateCart);

    // cross-tab updates
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const menus = () => setIsMenuOpen(true);
  const closeNav = () => setIsMenuOpen(false);

  // Updated: Use context's openModal for immediate login trigger
  const handleLoginClick = () => {
    openModal();
    // Optionally close mobile menu if open
    if (isMenuOpen) closeNav();
  };

  // Updated: Use context's handleLogout for global clear
  const handleLogoutClick = () => {
    handleLogout();
    // Optional: Close mobile menu
    if (isMenuOpen) closeNav();
  };

  // Updated: Derive userName from currentUser (live from context)
  const userName = currentUser?.name || currentUser?.email?.split('@')[0] || "User";

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

          {/* Cart Icon */}
          <li className="hidden md:block">
            <Link
              to="/cart"
              className={`relative hover:underline ${
                currentPath === "/cart" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              <IconShoppingCartFilled />

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
            <li className="hidden md:block relative group">
              <Link
                className={`hover:underline flex items-center gap-1 ${
                  currentPath === "/moProfile" ? "font-bold text-[#0f76bb]" : ""
                }`}
              >
                <IconUserFilled />
                {userName}
              </Link>
              {/* Dropdown Menu */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-30 bg-[#5fa4bd] rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <ul className="py-0">
                  <li>
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-1 text-center font-bold text-sm text-gray-100 hover:bg-gray-900 cursor-pointer"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-1 text-center font-bold text-sm text-gray-100 hover:bg-gray-900 cursor-pointer"
                    >
                      My Orders
                    </Link>
                  </li>
                  <li className="text-gray-800">
                    <button
                      onClick={handleLogoutClick}
                      className="block w-full px-4 py-1 text-center font-bold text-sm text-gray-100 hover:bg-gray-900 cursor-pointer"
                    >
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

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] bg-blue-100 text-2xl font-bold p-5 pt-10 border-l border-gray-500 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <IconX
          onClick={closeNav}
          className="absolute top-5 right-5 cursor-pointer"
        />

        <ul>
          <li className="border-b my-5 border-gray-400 text-gray-800">
            <Link to="/" onClick={closeNav}>
              Home
            </Link>
          </li>

          <li className="border-b my-5 border-gray-400 text-gray-800">
            <Link to="/about" onClick={closeNav}>
              About
            </Link>
          </li>

          <li className="border-b my-5 border-gray-400 text-gray-800">
            <Link to="/allproduct" onClick={closeNav}>
              Product
            </Link>
          </li>

          <li className="border-b my-5 border-gray-400 text-gray-800">
            <Link to="/cart" onClick={closeNav}>
              <IconShoppingCartFilled />
            </Link>
          </li>

          {/* Mobile User/Login Section - Live via context */}
          {!isLoggedIn ? (
            <li className="border-b my-5 border-gray-400 text-gray-800">
              <button
                onClick={handleLoginClick}
                className="w-full text-left flex items-center gap-2 text-gray-800 hover:text-blue-600"
              >
                <IconUser size={20} />
                Login
              </button>
            </li>
          ) : (
            <>
              <li className="border-b my-5 border-gray-400 text-gray-800">
                  <div className="flex items-center gap-2">
                    <IconUserFilled size={20} />
                    {userName}
                  </div>
              </li>
              <li className="border-b my-5 border-gray-400 text-gray-800">
                <Link to="/profile" onClick={closeNav}>
                  My Orders
                </Link>
              </li>
              <li className="border-b my-5 border-gray-400 text-gray-800">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left flex items-center gap-2 text-gray-800 hover:text-blue-600"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Removed: Local LoginModal render - Now handled globally by AuthContext */}
    </div>
  );
}