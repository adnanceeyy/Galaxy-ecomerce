import React from 'react';
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandYoutube,
  IconMail,
  IconPhone,
  IconMapPin
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0f2027] to-[#203a43] text-white pt-20 pb-10 mt-20 md:mt-0 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4facfe] to-[#00f2fe]">
              Galaxy Ecommerce
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the future of shopping. Premium tech, fashion, and lifestyle products curated just for you.
            </p>
            <div className="flex space-x-5 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <IconBrandFacebook size={26} stroke={1.5} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <IconBrandTwitter size={26} stroke={1.5} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <IconBrandInstagram size={26} stroke={1.5} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                <IconBrandYoutube size={26} stroke={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-100 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#4facfe] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#4facfe] transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/allproduct" className="hover:text-[#4facfe] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#4facfe] transition-all duration-300"></span>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#4facfe] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#4facfe] transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#4facfe] transition-colors duration-200 flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-[#4facfe] transition-all duration-300"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-gray-100 uppercase tracking-wider">Account</h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link to="/profile" className="hover:text-[#4facfe] transition-colors duration-200">My Profile</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-[#4facfe] transition-colors duration-200">Shopping Cart</Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-[#4facfe] transition-colors duration-200">Order History</Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#4facfe] transition-colors duration-200">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
             <h3 className="text-lg font-bold mb-6 text-gray-100 uppercase tracking-wider">Contact</h3>
             <ul className="space-y-5 text-gray-400 mb-8">
                <li className="flex items-start gap-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-[#4facfe] flex-shrink-0">
                      <IconMapPin size={20} />
                   </div>
                   <span className="text-sm">123 Galaxy Street, Tech City, Universe 9901</span>
                </li>
                <li className="flex items-center gap-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-[#4facfe] flex-shrink-0">
                      <IconPhone size={20} />
                   </div>
                   <span className="text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-4">
                   <div className="bg-gray-800 p-2 rounded-lg text-[#4facfe] flex-shrink-0">
                      <IconMail size={20} />
                   </div>
                   <span className="text-sm">support@galaxystore.com</span>
                </li>
             </ul>
             
             <form onSubmit={(e) => e.preventDefault()} className="relative">
                <input 
                  type="email" 
                  placeholder="Subscribe to newsletter" 
                  className="w-full bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#4facfe] transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] hover:opacity-90 text-white rounded-lg px-4 text-sm font-bold transition-all shadow-lg">
                  Join
                </button>
             </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Galaxy Ecommerce. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-white transition">Terms</a>
             <a href="#" className="hover:text-white transition">Privacy</a>
             <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
