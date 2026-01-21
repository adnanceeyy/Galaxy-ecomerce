import React from "react";
import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMail,
  IconPhone,
  IconMapPin
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 font-sans border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/assets/images/fulllogo.png" alt="Eleckyo Logo" className="h-10 w-auto object-contain brightness-0 invert" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Your premium destination for cutting-edge electronics. Quality products, exceptional service, and global shipping.
            </p>
            <div className="flex gap-4 pt-2">
              {[IconBrandFacebook, IconBrandTwitter, IconBrandInstagram, IconBrandLinkedin].map((Icon, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-accent transition-colors bg-gray-800 p-2 rounded-full hover:bg-white">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-serif tracking-wide border-b border-gray-700 pb-2 inline-block">Shop</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/allProduct" className="hover:text-accent transition-colors flex items-center gap-2">All Products</Link></li>
              <li><Link to="/category/696f5b651d0d229e80d6f683" className="hover:text-accent transition-colors flex items-center gap-2">Headphones</Link></li>
              <li><Link to="/category/696f5c8c1d0d229e80d6f6b5" className="hover:text-accent transition-colors flex items-center gap-2">Computers</Link></li>
              <li><Link to="/category/696f5c3c1d0d229e80d6f6a9" className="hover:text-accent transition-colors flex items-center gap-2">Smartphones</Link></li>
              <li><Link to="/category/696f5d941d0d229e80d6f6ec" className="hover:text-accent transition-colors flex items-center gap-2">Accessories</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-serif tracking-wide border-b border-gray-700 pb-2 inline-block">Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/contact" className="hover:text-accent transition-colors flex items-center gap-2">Contact Us</Link></li>
              <li><Link to="/orders" className="hover:text-accent transition-colors flex items-center gap-2">Track Order</Link></li>
              <li><Link to="/profile" className="hover:text-accent transition-colors flex items-center gap-2">My Account</Link></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">Returns Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors flex items-center gap-2">FAQs</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-bold font-serif tracking-wide border-b border-gray-700 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <IconMapPin size={20} className="text-accent shrink-0 mt-0.5" />
                <span>Parambilpeedika, Airport road,<br />Malappuram, Kerala, India</span>
              </li>
              <li className="flex items-center gap-3">
                <IconPhone size={20} className="text-accent shrink-0" />
                <span>+91 7034 887478</span>
              </li>
              <li className="flex items-center gap-3">
                <IconMail size={20} className="text-accent shrink-0" />
                <span>support@eleckyosupport.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Eleckyo Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
