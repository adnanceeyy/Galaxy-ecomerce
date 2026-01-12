import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { 
  IconSearch, 
  IconShoppingCart, 
  IconUser, 
  IconMenu2, 
  IconX,
  IconHeart 
} from "@tabler/icons-react";
import { useAuth } from "./AuthWrapper";

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, cartItemCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  // Fetch all products for suggestions
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching for suggestions:", err);
      }
    };
    fetchAll();
  }, []);

  // Filter suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = allProducts
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allProducts]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/allProduct?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/singleProduct/${id}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };
  
  const currentPath = location.pathname;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/allProduct", label: "Shop" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
    { path: "/orders", label: "My Orders" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm font-sans">
        {/* Top Bar */}
        <div className="bg-primary text-white text-[11px] md:text-xs py-2 text-center tracking-wide uppercase font-semibold">
          Free Shipping on Orders Over ₹4999 | International Delivery Available
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 items-center justify-between flex">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <img src="/assets/images/logo.png" alt="Eleckyo Logo" className="h-8 md:h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent tracking-wide ${
                  currentPath === link.path ? "text-accent font-semibold" : "text-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions: Search, Account, Cart */}
          <div className="flex items-center gap-5 md:gap-8">
            
            {/* Search Bar (Desktop) */}
            <div className="relative" ref={searchRef}>
              <form onSubmit={handleSearch} className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:border-accent transition-all">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim().length > 1 && setShowSuggestions(true)}
                  className="bg-transparent border-none outline-none  focus:ring-0 text-xs w-32 lg:w-48 text-secondary"
                />
                <button type="submit" className="text-secondary hover:text-primary transition h-full flex items-center">
                  <IconSearch size={18} stroke={1.5} />
                </button>
              </form>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[250px] bg-white border border-gray-100 rounded-xl shadow-xl z-[100] overflow-hidden">
                  {suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSuggestionClick(item.id)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <div className="w-8 h-8 flex-shrink-0">
                         <img src={`${import.meta.env.VITE_BACKEND_URL.replace("/api", "")}${item.image}`} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary truncate">{item.name}</p>
                        <p className="text-[10px] text-accent">₹{item.price}</p>
                      </div>
                    </button>
                  ))}
                  <button 
                    onClick={handleSearch}
                    className="w-full py-2 bg-gray-50 text-[10px] font-bold text-gray-500 hover:text-accent transition-colors"
                  >
                    View all results
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist (Desktop) */}
             <Link to="/wishlist" className="relative hidden md:block text-secondary hover:text-primary transition transform hover:scale-105">
              <IconHeart size={22} stroke={1.5} />
              {/* Optional: Add count badge if needed */}
              {/* {wishlistCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-3 h-3 rounded-full flex items-center justify-center">{wishlistCount}</span>} */}
            </Link>

            {/* Account */}
            <div className="relative group">
              <Link to={isLoggedIn ? "/profile" : "/login"} className="text-secondary hover:text-primary transition flex items-center gap-2">
                 <IconUser size={20} stroke={1.5} />
                 {isLoggedIn && <span className="hidden lg:block text-[10px] font-bold uppercase tracking-wider text-secondary group-hover:text-primary transition">{currentUser?.name?.split(' ')[0]}</span>}
              </Link>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative text-secondary hover:text-primary transition transform hover:scale-105">
              <IconShoppingCart size={20} stroke={1.5} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-bold h-3.5 w-3.5 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-secondary hover:text-primary transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <IconMenu2 size={24} stroke={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl p-6 flex flex-col h-full transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
              <span className="text-xl font-serif font-bold text-primary">Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-secondary hover:text-accent transition p-2 bg-gray-50 rounded-full"
              >
                <IconX size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium px-4 py-3 rounded-lg transition-colors ${
                    currentPath === link.path 
                      ? "bg-gray-50 text-accent font-semibold" 
                      : "text-secondary hover:bg-gray-50 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mt-4 flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm flex-1 text-secondary"
                />
                <button type="submit" className="text-secondary">
                  <IconSearch size={20} stroke={1.5} />
                </button>
              </form>

              {!isLoggedIn && (
                <Link 
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-6 bg-primary text-white py-3.5 rounded-lg text-center font-bold tracking-wide shadow-md hover:bg-secondary transition-colors"
                >
                  LOGIN / REGISTER
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;