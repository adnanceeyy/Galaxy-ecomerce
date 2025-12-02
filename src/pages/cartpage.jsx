import React, { useEffect, useState } from "react";
import Nav from "../components/nav";
import Footer from "../components/footer";
import { IconTrashFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    window.scrollTo(0, 0);
  }, []);
  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.offerPrice) * (item.qty || 1),
    0
  );
  return (
    <div>
      <Nav />
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]" />
      <div className="w-[99.5%] place-self-center min-h-screen h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b5f72] text-center mb-5 md:mb-15">
          🛒 Your Cart
        </h1>
        {cartItems.length > 0 ? (
          <div className="md:grid md:grid-cols-3 gap-6">
            <div className="col-span-2 flex flex-col gap-5">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="relative flex bg-[white] rounded-3xl shadow-lg p-1.5 md:p-3 gap-4 hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={product.productImg}
                    alt={product.productName}
                    className="w-28 h-28 md:w-40 md:h-40 rounded-3xl md:rounded-2xl object-cover shadow-md"
                  />
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg md:text-2xl font-bold text-gray-700">
                        {product.productName}
                      </h2>

                      <p className="text-xs md:text-base text-gray-500 md:mt-1">
                        {product.color}
                      </p>
                      <p className="text-xs md:text-base text-gray-500 md:mt-1">
                        Free Shipping
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-1.5 md:gap-3 bg-gray-100 px-1 py-1 md:px-3 md:py-2 rounded-sm md:rounded-xl shadow-inner">
                        <button
                          onClick={() => decreaseQty(product.id)}
                          className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center bg-gray-300 rounded-sm md:rounded-lg text-xl md:text-2xl font-bold hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span className="text-balance md:text-3xl font-semibold">
                          {product.qty || 1}
                        </span>
                        <button
                          onClick={() => increaseQty(product.id)}
                          className="w-6 h-6 md:w-10 md:h-10 flex items-center justify-center bg-gray-300 rounded-sm md:rounded-lg text-xl md:text-2xl font-bold hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-red-500 text-xs absolute top-3 right-3 underline hover:text-red-700 bg-gray-200 p-1 rounded-full"
                      >
                        <IconTrashFilled />
                      </button>
                      <p className="text-xl md:text-3xl font-bold text-[#2b5f72]">
                        ₹{Number(product.offerPrice) * (product.qty || 1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white w-full rounded-3xl shadow-xl p-6 h-fit sticky top-24 md:mt-0 mt-10">
              <h3 className="text-2xl font-extrabold text-[#2b5f72] mb-5">
                Order Summary
              </h3>
              <div className="space-y-3 text-gray-700 text-lg">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>₹{subtotal}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="text-green-600 font-bold">Free</p>
                </div>
                <hr className="my-4 border-gray-300" />
                <div className="flex justify-between text-xl font-bold">
                  <p>Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </div>
              <button className="w-full bg-[#2b5f72] hover:bg-[#244c5a] text-white py-3 rounded-2xl text-lg font-semibold mt-6 transition-all">
                Proceed to Checkout
              </button>
              <Link
              to={`/allproduct`}>
              <button className="w-full bg-[#208d12] hover:bg-[#265a24] text-white py-3 rounded-2xl text-lg font-semibold mt-3 transition-all">
                Purchase more Items
              </button>
              </Link>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl md:text-4xl font-bold text-center py-24 text-gray-700">
            🛍️ Your Cart is Empty
          </h1>
        )}
      </div>
    </div>
  );
}
