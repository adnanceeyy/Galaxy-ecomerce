import React, { useEffect, useState } from "react";
import { IconMapPin, IconShoppingBag, IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthWrapper";

export default function Checkout() {
  const adds = [{ id: 1, add1: "./assets/images/add1.jpg" }];

  const [cartItems, setCartItems] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";
  const apiUrl = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}/orders`;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    if (currentUser) {
      setBillingInfo(prev => ({
        ...prev,
        name: currentUser.fullName || currentUser.name || "",
        phone: currentUser.phone || "",
        email: currentUser.email || "",
      }));
    }
  }, [currentUser]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price || item.offerPrice || 0) * (item.qty || 1),
    0
  );
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!billingInfo.name || !billingInfo.phone || !billingInfo.address || !billingInfo.city || !billingInfo.pincode) {
      alert("Please fill all required fields: Name, Phone, Address, City, PIN Code");
      return;
    }

    const orderData = {
      customerDetails: {
        name: billingInfo.name,
        phone: billingInfo.phone,
        email: billingInfo.email || null,
        address: {
          street: billingInfo.address,
          city: billingInfo.city,
          state: billingInfo.state || null,
          postalCode: billingInfo.pincode,
          country: "India"
        }
      },
      orderedItems: cartItems.map(item => ({
        productId: item.id || item._id || "UNKNOWN", // Adjust based on your product ID field
        itemName: item.name,
        quantity: item.qty || 1,
        unitPrice: Number(item.price || item.offerPrice || 0),
        totalPrice: Number(item.price || item.offerPrice || 0) * (item.qty || 1)
      })),
      paymentSummary: {
        subtotal: subtotal,
        shipping: shipping,
        currency: "INR",
        total: total
      }
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      // Success: Clear cart and show confirmation
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("cart-updated"));
      setOrderPlaced(true);

      // Auto-redirect after 8 seconds
      setTimeout(() => navigate("/"), 8000);
    } catch (error) {
      console.error('Order placement error:', error);
      alert(`Order failed: ${error.message}`);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] flex items-center justify-center p-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold mb-8">Your Cart is Empty</p>
          <button
            onClick={() => navigate("/allProduct")}
            className="bg-white text-[#2b5f72] px-12 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:scale-105 transition"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-12 shadow-2xl text-center max-w-2xl">
          <IconCheck size={120} className="text-green-600 mx-auto mb-8" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#2b5f72] mb-6">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Thank you for your order! 🎉
          </p>
          <p className="text-lg text-gray-600 mb-8">
            Your order has been received and will be processed soon.
          </p>
          <p className="text-gray-500 mb-8">
            Redirecting to home in 8 seconds...
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#2b5f72] hover:bg-[#244c5a] text-white px-12 py-5 rounded-3xl text-xl font-bold shadow-xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0"></div>
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-[#2b5f72] mb-12">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left: Address Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-[#2b5f72] mb-8 flex items-center gap-4">
              <IconMapPin size={36} />
              Delivery Address
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name *"
                value={billingInfo.name}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *"
                value={billingInfo.phone}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email (optional)"
                value={billingInfo.email}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition"
              />
              <input
                type="text"
                name="address"
                placeholder="Full Address *"
                value={billingInfo.address}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition md:col-span-2"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={billingInfo.city}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={billingInfo.state}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition"
              />
              <input
                type="text"
                name="pincode"
                placeholder="PIN Code *"
                value={billingInfo.pincode}
                onChange={handleChange}
                className="p-3 border-2 border-gray-300 rounded-2xl text-lg focus:border-[#2b5f72] transition md:col-span-2"
                required
              />
              
            </div>
              <button
              onClick={handlePlaceOrder}
              className="w-full bg-gradient-to-r from-[#2b5f72] to-[#244c5a] text-white py-4 rounded-3xl text-2xl md:text-3xl font-extrabold mt-12 shadow-2xl hover:shadow-3xl transition transform hover:scale-101"
            >
              Place Order
            </button>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold text-[#2b5f72] mb-8 flex items-center gap-4">
              <IconShoppingBag size={36} />
              Order Summary ({cartItems.length} items)
            </h2>

            <div className="space-y-6 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 p-6 bg-gray-50 rounded-2xl">
                  <img
                    src={`${backendBase}${item.image}`}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-xl bg-white p-3 shadow"
                    onError={(e) => e.target.src = "https://via.placeholder.com/100?text=No+Image"}
                  />
                  <div className="flex-1">
                    <p className="font-bold text-xl">{item.name}</p>
                    <p className="text-gray-600 mt-1">Qty: {item.qty || 1}</p>
                    <p className="text-2xl font-extrabold text-[#2b5f72] mt-3">
                      ₹{Number(item.price || item.offerPrice || 0) * (item.qty || 1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-4 border-dashed border-gray-300 pt-8 mt-10">
              <div className="space-y-5 text-xl">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-bold" : "font-bold"}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && subtotal > 0 && (
                  <p className="text-green-600 text-center font-bold text-lg">
                    🎉 Free Shipping Applied!
                  </p>
                )}
              </div>

              <div className="border-t-2 border-gray-300 pt-6 mt-8">
                <div className="flex justify-between text-3xl font-extrabold text-[#2b5f72]">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>
            </div>

          
          </div>
        </div>
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden mt-8">
          <img
            src={adds[0].add1}
            className="w-full h-full"
            alt="Advertisement"
          />
        </div>
      </div>
    </>
  );
}