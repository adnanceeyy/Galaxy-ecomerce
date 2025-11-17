import React, { useState } from "react";
import Nav from "../components/nav";

export default function CartPage() {

  return (
    <>
    <Nav />
            <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">
        {/* footbar */}
        <div
          className="
  fixed bottom-0 w-[99%] md:w-[90.5%] 
  bg-[#f7fbff] border border-[#3f3f3f50] 
  rounded-t-[30px] md:rounded-t-[80px]
  place-self-center transition-all duration-300
  md:hover:w-[99.5%] md:hover:h-[240px]
  h-[150px] md:h-[230px] flex flex-col justify-end
  px-3 md:px-6 pb-1 md:pb-8 group
"
        >
          {/* Top divider line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Footer Content */}
          <div
            className="
    grid grid-cols-2 md:grid-cols-3 
    gap-4 md:gap-8 text-gray-700 w-full
    max-w-7xl mx-auto
  "
          >
            {/* Column 1 - Logo & tagline */}
            <div className="space-y-1 md:space-y-4 col-span-2 md:col-span-1">
              <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300 mb-0 md:mb-2">
                Galaxy Ecommerce
              </h2>
              <p className="text-[10px] md:text-sm leading-tight mb-0 md:mb-3">
                Shop the stars. Best deals on fashion, tech & more.
              </p>

              {/* Social icons (visible only on md and above) */}
              <div className="hidden md:flex gap-4 pt-2">
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-6h-2v-2h2V9c0-1.1.9-2 2-2h2v2h-2c-.55 0-1 .45-1 1v1.5h3l-.5 2H13v6h-2z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </div>
            </div>

            {/* Column 2 - Shop Links */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Shop
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Brands
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Support
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* main */}
      <div className="w-[99.5%] place-self-center h-[1220px] rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z- top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        a
      </div>

    </>  );
}
