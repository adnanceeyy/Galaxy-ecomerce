import React, { useState } from "react";
import Nav from "../components/nav";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Smart TV 50 Inch",
      brand: "Samsung",
      category: "Electronics",
      rating: 4.6,
      price: 89999,
      quantity: 1,
      image: "/assets/images/stv.png",
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      brand: "Apple",
      category: "Laptop",
      rating: 4.9,
      price: 189999,
      quantity: 1,
      image: "/assets/images/plaptop.png",
    },
    {
      id: 3,
      name: "Wireless Earbuds Pro",
      brand: "Sony",
      category: "Audio",
      rating: 4.4,
      price: 4999,
      quantity: 2,
      image: "/assets/images/pearbuds.png",
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const increaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

  const decreaseQty = (id) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );

  const removeItem = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(0.1);
      alert("✅ Coupon applied: 10% off!");
    } else {
      alert("❌ Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05; // 5% GST
  const shipping = 99;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax + shipping - discountAmount;

  const recommended = [
    {
      id: 11,
      name: "Gaming Mouse",
      price: 2499,
      image: "/assets/images/mouse.png",
    },
    {
      id: 12,
      name: "Bluetooth Speaker",
      price: 1999,
      image: "/assets/images/pparty.webp",
    },
    {
      id: 13,
      name: "Power Bank 20000mAh",
      price: 1499,
      image: "/assets/images/powerbank.png",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <Nav />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          🛒 Shopping Cart
        </h1>

        {/* Layout Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT — Cart Items */}
          <div className="md:col-span-2 space-y-5">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-sm border border-gray-200 p-4 md:p-5 hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-xl"
                />
                <div className="flex-1 md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                  <h2 className="font-semibold text-gray-800 text-base md:text-lg">
                    {item.name}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Brand: {item.brand} | {item.category}
                  </p>
                  <p className="text-yellow-500 text-sm mb-2">
                    ⭐ {item.rating}/5
                  </p>

                  <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQty(item.id)}
                      className="border rounded-full w-8 h-8 flex items-center justify-center text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end justify-between h-full mt-4 md:mt-0">
                  <p className="font-semibold text-gray-800 text-base md:text-lg">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Summary */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit">
            <h3 className="text-lg md:text-2xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p>₹{subtotal.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Tax (5%)</p>
                <p>₹{tax.toLocaleString()}</p>
              </div>
              <div className="flex justify-between text-gray-600">
                <p>Shipping</p>
                <p>₹{shipping}</p>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <p>Discount</p>
                  <p>-₹{discountAmount.toLocaleString()}</p>
                </div>
              )}
              <div className="flex justify-between text-gray-800 font-bold text-lg border-t pt-3">
                <p>Total</p>
                <p>₹{total.toLocaleString()}</p>
              </div>
            </div>

            {/* Coupon */}
            <div className="mt-5">
              <label className="text-sm font-medium text-gray-700">
                Have a coupon?
              </label>
              <div className="flex mt-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  type="text"
                  placeholder="Enter code (e.g. SAVE10)"
                  className="flex-1 border rounded-l-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-xl"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Checkout */}
            <button className="w-full mt-6 bg-[#0f76bb] hover:bg-[#0d5a8a] text-white py-3 rounded-xl text-sm md:text-lg font-semibold transition">
              Proceed to Checkout
            </button>

            {/* Payment Info */}
            <div className="mt-4 text-sm text-gray-500">
              <p>💳 Secure Payment | 🚚 Fast Delivery | 🔄 Easy Returns</p>
            </div>
          </div>
        </div>

        {/* Recommended */}
        <div className="mt-16">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {recommended.map((rec) => (
              <div
                key={rec.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 hover:shadow-md transition"
              >
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-40 object-contain"
                />
                <p className="mt-3 font-semibold text-gray-800">{rec.name}</p>
                <p className="text-blue-600 font-bold mt-1">
                  ₹{rec.price.toLocaleString()}
                </p>
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
