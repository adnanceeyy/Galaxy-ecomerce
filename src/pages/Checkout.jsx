import React, { useEffect, useState } from "react";
import Nav from "../components/nav";

// Mock recommended products (you can replace with your real data)
const recommendedProducts = [
  { id: 101, productName: "Product A", offerPrice: 499 },
  { id: 102, productName: "Product B", offerPrice: 799 },
  { id: 103, productName: "Product C", offerPrice: 299 },
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    window.scrollTo(0, 0);
  }, []);

  const total = cartItems.reduce(
    (t, item) => t + Number(item.offerPrice) * (item.qty || 1),
    0
  );

  const handleBillingChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    if (!billingInfo.name || !billingInfo.address || !billingInfo.city) {
      alert("Please fill in all required billing details!");
      return;
    }

    alert(`🎉 Order Placed Successfully!\nTotal: ₹${total}`);

    // Clear cart
    localStorage.removeItem("cart");

    // Redirect home
    window.location.href = "/";
  };

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">
      </div>

      <div className="w-[99.5%] place-self-center h-screen rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Billing & Shipping */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Billing Details</h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={billingInfo.name}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={billingInfo.email}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={billingInfo.phone}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={billingInfo.address}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={billingInfo.city}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
              <input
                type="text"
                name="zip"
                placeholder="ZIP / Postal Code"
                value={billingInfo.zip}
                onChange={handleBillingChange}
                className="p-3 border rounded-lg"
              />
            </div>

            {/* Payment Options */}
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-2">Payment Method</h3>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="p-3 border rounded-lg w-full"
              >
                <option value="cod">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
                <option value="upi">UPI / Wallet</option>
              </select>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between my-3">
                <p>
                  {item.productName} × {item.qty || 1}
                </p>
                <p>₹{Number(item.offerPrice) * (item.qty || 1)}</p>
              </div>
            ))}

            <hr className="my-4" />

            <div className="flex justify-between text-xl font-bold">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <button
              onClick={placeOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold text-lg mt-6"
            >
              Place Order
            </button>

            {/* Recommended Products */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-3">Recommended for You</h3>
              <div className="grid grid-cols-3 gap-4">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-gray-100 p-3 rounded-xl text-center"
                  >
                    <p className="font-semibold">{prod.productName}</p>
                    <p>₹{prod.offerPrice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
