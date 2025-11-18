import React from "react";
import { IconHeart, IconStarFilled } from "@tabler/icons-react";

export default function SingleProduct() {
  return (
    <>
      {/* BACKGROUND (behind everything) */}
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0 -z-10" />

      {/* FOOTER BAR (fixed) */}
      <div
        className="
  fixed bottom-0 w-full md:w-[90.5%] 
  bg-[#f7fbff] border border-[#3f3f3f50] 
  rounded-t-[30px] md:rounded-t-[80px]
  place-self-center transition-all duration-300
  md:hover:w-[99.5%] md:hover:h-[240px]
  h-[160px] md:h-[230px] flex flex-col justify-end
  px-3 md:px-8 pb-3 md:pb-8 group
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
            <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300">
              Galaxy Ecommerce
            </h2>
            <p className="text-[10px] md:text-sm leading-tight">
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
      {/* MAIN CARD */}
      <div
        className="w-[99.5%] mx-auto place-self-center h-auto rounded-[30px] md:rounded-[80px]
        bg-[#f7fbff] relative top-14 md:top-28 p-1 md:p-5 overflow-hidden
        shadow-[rgba(0,0,0,0.12)] shadow-lg mb-60 md:mb-96 z-10 
        "
      >
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-start gap-4 md:gap-8">
          {/* IMAGE */}
          <div className="bg-gray-200 w-full md:w-[700px] h-[360px] md:h-[650px] border border-[#a8a8a859] mx-2 md:mx-0 rounded-[28px] md:rounded-[70px] p-8 flex items-center place-self-center md:place-self-start justify-center overflow-hidden">
            <img
              className="h-full max-h-[100%] object-contain"
              src="./assets/images/mouse.webp"
              alt="product"
            />
          </div>

          {/* CONTENT */}
          <div className="mx-2 mt-2 md:mt-8">
            {/* TITLE */}
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
                Salpido Wireless Mouse (Made in India)
              </h2>

              {/* wishlist heart (small) */}
              <button
                aria-label="Add to wishlist"
                className="ml-auto bg-white p-2 rounded-full shadow-sm hover:scale-105 transition"
              >
                <IconHeart className="w-5 h-5 text-red-500" />
              </button>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1 bg-[#24a7ff] text-white px-3 py-1 rounded-md">
                <span className="text-base md:text-sm font-medium">4.5</span>
                <IconStarFilled color="#f1cd0c" className="h-4 w-4" />
              </div>
              <p className="text-[14px] text-gray-600">(1200+ reviews)</p>
              <span className="ml-2 text-sm text-green-700 font-medium">
                In Stock
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-baseline gap-4 mt-2">
              <h3 className="text-red-600 font-light text-2xl line-through">
                ₹599
              </h3>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                ₹399
              </h2>
              <span className="ml-2 inline-block bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded">
                ₹200 OFF
              </span>
            </div>

            {/* SHORT DESCRIPTION */}
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Experience smooth, accurate, and comfortable control with the
              newest generation wireless mouse — perfect for work, gaming, and
              long hours of usage.
            </p>

            {/* HIGHLIGHT BOX */}
            <div className="bg-gray-100 p-4 rounded-xl flex items-start gap-3 mt-4 shadow-sm">
              <div className="text-2xl">⚡</div>
              <p className="text-gray-700 text-[15px]">
                Long battery life, lag-free performance, and ultra-quiet clicks
                — optimized for productivity & portability.
              </p>
            </div>

            {/* FEATURES (emojis used to avoid extra icon libs) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-gray-700">
              <div className="flex flex-col items-center">
                <div className="text-2xl">📱</div>
                <p className="text-sm font-medium mt-1">Mobile-Friendly</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl">💻</div>
                <p className="text-sm font-medium mt-1">Laptop Ready</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl">📺</div>
                <p className="text-sm font-medium mt-1">Smart TV Support</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl">🎯</div>
                <p className="text-sm font-medium mt-1">Precise Sensor</p>
              </div>
            </div>

            {/* SPECIALITIES */}
            <div className="mt-6 space-y-3">
              <h3 className="text-lg md:text-xl font-semibold">
                Specialities:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Ergonomic comfort grip</li>
                <li>High-precision optical sensor</li>
                <li>12-month battery backup</li>
                <li>Bluetooth + Wireless USB support</li>
                <li>Ultra-quiet buttons</li>
                <li>Compatible with Windows, Mac, Linux</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full h-auto flex-col gap-2 md:flex-row md:gap-4 mt-8 px-2 md:px-0 md:justify-center mb-24">
          <button className="bg-[#72c7ff] w-full  rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-3">
            Buy Now
          </button>
          <button className="bg-[#2dabff] w-full rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-3">
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}
