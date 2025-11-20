import React from 'react'

export default function Footer() {
    
  return (
    <>
    <div
        className="fixed bottom-0 w-full md:w-[90.5%] bg-[#f7fbff] border border-[#3f3f3f50]
        rounded-t-[30px] md:rounded-t-[80px] place-self-center transition-all duration-300
        md:hover:w-[99.5%] md:hover:h-[240px] h-[160px] md:h-[230px] flex flex-col justify-end
        px-3 md:px-8 pb-3 md:pb-8 group"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

        {/* Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-gray-700 w-full max-w-7xl mx-auto">
          <div className="space-y-1 md:space-y-4 col-span-2 md:col-span-1">
            <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300">
              Galaxy Ecommerce
            </h2>
            <p className="text-[10px] md:text-sm leading-tight">
              Shop the stars. Best deals on fashion, tech & more.
            </p>
          </div>

          <div className="space-y-1 md:space-y-3">
            <h3 className="text-xs md:text-lg font-semibold text-gray-900">
              Shop
            </h3>
            <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
              <li>Best Sellers</li>
              <li>Sale</li>
              <li>Brands</li>
            </ul>
          </div>

          <div className="space-y-1 md:space-y-3">
            <h3 className="text-xs md:text-lg font-semibold text-gray-900">
              Support
            </h3>
            <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
              <li>Returns</li>
              <li>Shipping</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
