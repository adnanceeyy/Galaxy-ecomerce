import { IconMenu2, IconShoppingCartFilled, IconTrolley } from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const currentPath = window.location.pathname;

  return (
    <div className="w-full flex justify-center fixed top-0 z-100">
      <nav className="w-[98%] h-10 md:h-20 mt-2 bg-[#f7fbff] text-[#080f30] border border-[#5555556b] flex items-center justify-between pr-1 rounded-[50px] shadow-2xl">
        <Link to="/">
          <img className="w-[55px]  md:w-[130px]" src="./assets/images/logo.png" alt="" />
        </Link>
        <ul className="flex space-x-20 text-xl font-medium">

          <li className="hidden md:block">
            <Link
              to="/"
              className={`hover:underline ${
                currentPath === "/" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              Home
            </Link>
          </li>

          <li className="hidden md:block">
            <Link
              to="/about"
              className={`hover:underline ${
                currentPath === "/about" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              to="/allproduct"
              className={`hover:underline ${
                currentPath === "/allproduct" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              Product
            </Link>
          </li>
          <li className="hidden md:block">
            <Link
              to="/contact"
              className={`hover:underline ${
                currentPath === "/contact" ? "font-bold text-[#0f76bb]" : ""
              }`}
            >
              Contact
            </Link>
          </li>
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
          <li className="block md:hidden px-2 text-[#292929]" >
              <IconMenu2 size={28}/>
          </li>
        </ul>
      </nav>
    </div>
  );
}
