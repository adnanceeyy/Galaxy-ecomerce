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
  const [isClosing, setIsClosing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, cartItemCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const searchRef = useRef(null);

  // Handle menu close with animation
  const handleCloseMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsMobileMenuOpen(false);
      setIsClosing(false);
    }, 300); // Match animation duration
  };

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
      handleCloseMenu();
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (id) => {
    navigate(`/singleProduct/${id}`);
    setSearchQuery("");
    setShowSuggestions(false);
    handleCloseMenu();
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
        <div className="bg-primary text-white text-[8px] md:text-xs py-1 md:py-2 text-center tracking-wide uppercase font-semibold">
          Free Shipping on Orders Over ₹4999 | International Delivery Available
        </div>

        {/* Main Navbar */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 items-center justify-between flex">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center  gap-2 group">
            <img src="/assets/images/fulllogo.png" alt="Eleckyo Logo" className="h-8 md:h-9 w-auto object-contain group-hover:scale-105 transition self-center items-center place-content-center place-self-center" />
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

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-secondary hover:text-primary transition-all duration-300 z-[70] relative"
              onClick={() => isMobileMenuOpen ? handleCloseMenu() : setIsMobileMenuOpen(true)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-2'}`}></span>
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute w-6 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-2'}`}></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Premium Full-Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className={`fixed inset-0 z-[40] md:hidden ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-98"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
          
          {/* Menu Content */}
          <div className="relative h-full flex flex-col p-8 pt-24 overflow-y-auto">
            
            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center space-y-2 mb-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={handleCloseMenu}
                  className={`group relative overflow-hidden ${isClosing ? '' : 'animate-slideInLeft'}`}
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <div className={`py-4 px-6 rounded-xl transition-all duration-300 ${
                    currentPath === link.path 
                      ? "bg-white/20 backdrop-blur-sm" 
                      : "hover:bg-white/10"
                  }`}>
                    <span className="text-2xl font-bold text-white tracking-tight group-hover:translate-x-2 inline-block transition-transform duration-300">
                      {link.label}
                    </span>
                    {currentPath === link.path && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent rounded-r-full"></div>
                    )}
                  </div>
                </Link>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className={`space-y-4 ${isClosing ? '' : 'animate-slideInLeft'}`} style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 text-white placeholder:text-white/60 focus:outline-none focus:border-accent focus:bg-white/15 transition-all"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-accent transition-colors">
                  <IconSearch size={22} stroke={1.5} />
                </button>
              </form>

              {/* Quick Links */}
              <div className="flex gap-3">
                <Link 
                  to="/wishlist" 
                  onClick={handleCloseMenu}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/15 transition-all"
                >
                  <IconHeart size={20} stroke={1.5} />
                  <span className="font-medium text-sm">Wishlist</span>
                </Link>
                
                <Link 
                  to="/cart" 
                  onClick={handleCloseMenu}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/15 transition-all relative"
                >
                  <IconShoppingCart size={20} stroke={1.5} />
                  <span className="font-medium text-sm">Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Account Button */}
              {!isLoggedIn ? (
                <Link 
                  to="/login"
                  onClick={handleCloseMenu}
                  className="block w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl text-center font-bold tracking-wide shadow-lg shadow-accent/30 transition-all transform hover:scale-[1.02]"
                >
                  LOGIN / REGISTER
                </Link>
              ) : (
                <Link 
                  to="/profile"
                  onClick={handleCloseMenu}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 text-white hover:bg-white/15 transition-all"
                >
                  <IconUser size={20} stroke={1.5} />
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm">My Account</p>
                    <p className="text-xs text-white/70">{currentUser?.email}</p>
                  </div>
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