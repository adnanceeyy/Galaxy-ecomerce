import {
  IconMenu2,
  IconSearch,
  IconShoppingCartFilled,
  IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menus = () => setIsMenuOpen(true);
  const closeNav = () => setIsMenuOpen(false);

  return (
    <div className="w-full flex justify-center fixed top-0 z-200">
      <nav className="w-[98%] h-10 md:h-20 mt-2 bg-[#f7fbff] text-[#080f30] border border-[#5555556b] flex items-center justify-between pr-1 rounded-[50px] shadow-2xl">
        <Link to="/">
          <img
            className="w-[30px] md:w-[70px] m-2"
            src="/assets/images/logo.png"
            alt="logo"
          />
        </Link>

        <ul className="flex space-x-6 md:space-x-20 text-lg md:text-xl font-medium items-center">
          <div
            class="hidden md:flex items-center gap-2 border border-gray-300 
            rounded-full px-2 pr-16 py-1 mr-10 
            focus-within:bg-[#508cb825]  focus-within:border-[#387eb1]  transition-all duration-300"
          >
            <IconSearch className=" text-gray-400 " />
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block rounded-full text-[21px] outline-0"
            />
          </div>
          {[
            { path: "/", label: "Home" },
            { path: "/about", label: "About" },
            { path: "/allproduct", label: "Product" },
            { path: "/contact", label: "Contact" },
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

          <li className="hidden md:block">
            <Link
              to="/cart"
              className={`hover:underline ${
                currentPath === "/cart" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              <IconShoppingCartFilled />
            </Link>
          </li>

          {/* Mobile Menu Icon */}
          <li className="block md:hidden px-2 text-[#292929]">
            <IconMenu2 size={28} onClick={menus} />
          </li>
        </ul>
      </nav>

      {/* ✅ Mobile Nav with animation */}
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
            <Link to="/contact" onClick={closeNav}>
              Contact
            </Link>
          </li>
          <li className="border-b my-5 border-gray-400 text-gray-800">
            <Link to="/cart" onClick={closeNav}>
              <IconShoppingCartFilled />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
