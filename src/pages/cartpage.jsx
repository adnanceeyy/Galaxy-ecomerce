import React, { useState } from "react";
import Nav from "../components/nav";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      desc: "Noise cancelling · Black",
      price: 2499,
      qty: 1,
      img: "https://i.imgur.com/8Km9tLL.png",
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      desc: "Heart rate · Waterproof",
      price: 3299,
      qty: 1,
      img: "https://i.imgur.com/QXe7jFj.png",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 199;
  const discount = subtotal > 3000 ? 200 : 0;
  const total = subtotal + shipping - discount;

  return (
    <>
      <Nav />

      {/* Background */}
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">

        {/* FIXED FOOTER */}
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
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-gray-700 w-full max-w-7xl mx-auto">

            {/* COL 1 */}
            <div className="space-y-1 md:space-y-4 col-span-2 md:col-span-1">
              <h2 className="text-lg md:text-4xl font-extrabold text-gray-700">
                Galaxy Ecommerce
              </h2>
              <p className="text-[10px] md:text-sm">
                Shop the stars. Best deals on fashion, tech & more.
              </p>

              <div className="hidden md:flex gap-4 pt-2">
                <svg className="w-6 h-6 hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
                <svg className="w-6 h-6 hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-6h-2v-2h2V9c0-1.1.9-2 2-2h2v2h-2c-.55 0-1 .45-1 1v1.5h3l-.5 2H13v6h-2z" />
                </svg>
                <svg className="w-6 h-6 hover:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </div>
            </div>

            {/* COL 2 */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Shop
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li><a href="#" className="hover:text-gray-900">Best Sellers</a></li>
                <li><a href="#" className="hover:text-gray-900">Sale</a></li>
                <li><a href="#" className="hover:text-gray-900">Brands</a></li>
              </ul>
            </div>

            {/* COL 3 */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">Support</h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li><a href="#" className="hover:text-gray-900">Returns</a></li>
                <li><a href="#" className="hover:text-gray-900">Shipping</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact Us</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* MAIN CART WHITE BOX */}
      <div className="w-[99.5%] place-self-center h-[1220px] rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative top-20 md:top-32 p-4 md:p-10 shadow-lg mb-60 md:mb-96 overflow-y-auto">

        <h1 className="text-2xl md:text-4xl font-extrabold text-gray-700 mb-6">Your Cart</h1>

        {/* CART ITEMS */}
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b border-gray-300 pb-4"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="font-bold text-gray-800 mt-1">₹{item.price}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-md"
                    onClick={() => decreaseQty(item.id)}
                  >
                    –
                  </button>
                  <span className="font-semibold">{item.qty}</span>
                  <button
                    className="px-2 py-1 bg-gray-300 rounded-md"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove Button */}
              <button
                className="text-red-500 text-sm"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* COUPON BOX */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Apply Coupon
          </h2>
          <div className="flex gap-2">
            <input
              type="text"
              className="border px-3 py-2 rounded-lg flex-1"
              placeholder="Enter coupon code"
            />
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow">
              Apply
            </button>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="mt-10 p-4 bg-white rounded-2xl shadow-md space-y-2">
          <div className="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Discount</span>
            <span>₹{discount}</span>
          </div>

          <div className="border-t pt-2 flex justify-between font-bold text-gray-900 text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button className="w-full mt-4 bg-green-600 text-white py-3 rounded-xl font-bold shadow-lg">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
