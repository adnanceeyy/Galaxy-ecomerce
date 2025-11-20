import React, { useEffect } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";

export default function Cartpage() {
  const adds = [
    {
      id: 1,
      add1: "./assets/images/add1.jpg",
    },
    {
      id: 2,
      add2: "./assets/images/add2.jpg",
    },
  ];

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <Nav />

      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] fixed top-0 -z-10" />
      <Footer />
      {/* MAIN CART CONTENT */}
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        {/* bigimg */}
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
          <img
            src={adds[0].add1}
            className="w-full h-full"
            alt="img vannitilla"
          />
        </div>
        <h1 className="text-2xl md:text-5xl font-extrabold text-[#2b5f72] my-6 text-center">
          Cart Page
        </h1>

        <div className="grid grid-cols-1 gap-y-5 md:grid-cols-3 md:gap-6">
          {/* CART ITEMS */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex bg-white rounded-2xl shadow-md p-3 md:p-4 gap-1 md:gap-3 mx-1.5 md:mx-0">
              <img
                src="./assets/images/mouse.webp"
                alt="product"
                className="w-20 h-20 md:w-44 md:h-44 rounded-xl object-cover"
              />

              <div className="flex flex-col justify-between flex-1">
                <h2 className="text-sm md:text-3xl font-bold text-gray-700">
                  Dell Mouse&quot; M2 Chip
                </h2>

                <p className="text-[10px] md:text-lg text-gray-500">
                  Color: light green
                </p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <button className="px-2.5 py-0.5 md:px-4 md:py-1 rounded-lg bg-gray-200 font-medium text-lg md:text-3xl">
                      -
                    </button>
                    <span className="font-bold md:text-2xl">1</span>
                    <button className="px-2.5 py-0.5 md:px-4 md:py-1 rounded-lg bg-gray-200 font-medium text-lg md:text-3xl">
                      +
                    </button>
                  </div>

                  <p className="text-xl md:text-4xl font-bold text-[#2b5f72]">
                    ₹390
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 h-fit mx-1.5 md:mx-0">
            <h3 className="text-xl md:text-2xl font-extrabold text-[#2b5f72] mb-4">
              Order Summary
            </h3>

            <div className="flex justify-between text-gray-700 mb-2">
              <p>Subtotal</p>
              <p>₹390</p>
            </div>

            <div className="flex justify-between text-gray-700 mb-2">
              <p>Shipping</p>
              <p className="text-green-600 font-bold">Free</p>
            </div>

            <div className="h-px bg-gray-300 my-4" />

            <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900 mb-4">
              <p>Total</p>
              <p>₹390</p>
            </div>

            <button className="w-full bg-[#2b5f72] hover:bg-[#244c5a] text-white py-3 rounded-2xl text-lg md:text-xl font-semibold transition-all">
              Checkout
            </button>
          </div>
        </div>
        <div>
          {/* small ad image */}
          
        </div>
      </div>
    </div>
  );
}
