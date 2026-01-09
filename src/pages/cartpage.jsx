// src/pages/Cartpage.jsx - FINAL VERSION: User-specific cart persistence
import React, { useEffect, useState } from "react";
import { IconTrashFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthWrapper";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { isLoggedIn, currentUser, openModal } = useAuth();
  const navigate = useNavigate();

  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";

  // Load cart on mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    window.scrollTo(0, 0);
  }, []);

  // Helper: Save cart to both main and user-specific
  const saveCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    if (currentUser) {
      const userCartKey = `cart_${currentUser.email}`;
      localStorage.setItem(userCartKey, JSON.stringify(updatedCart));
    }

    window.dispatchEvent(new Event("cart-updated"));
  };

  const increaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );
    saveCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, (item.qty || 1) - 1) } : item
    );
    saveCart(updated);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  const deleteItem = () => {
    const updated = cartItems.filter((item) => item.id !== deleteId);
    saveCart(updated);
    setShowPopup(false);
    setDeleteId(null);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price || item.offerPrice || 0) * (item.qty || 1),
    0
  );

  const totalSavings = cartItems.reduce(
    (save, item) => 
      save + (Number(item.mrPrice || item.price || 0) - Number(item.price || item.offerPrice || 0)) * (item.qty || 1),
    0
  );

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  const handlePurchaseMore = () => {
    navigate("/allProduct");
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] pt-20 pb-20">
      
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 p-4 md:p-10 shadow-2xl mb-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b5f72] text-center mb-10 md:mb-16">
          🛒 Your Cart ({cartItems.length} items)
        </h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="flex-1 flex flex-col gap-4">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="relative bg-white rounded-3xl shadow-lg p-4 md:p-6 flex flex-col md:flex-row gap-5 hover:shadow-2xl transition-all"
                >
                  {/* Image */}
                  <div className="w-full md:w-40 h-44 md:h-40 flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src={`${backendBase}${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-contain rounded-2xl bg-gray-50 p-4"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg md:text-xl font-bold text-gray-800">
                        {product.name}
                      </h2>
                      {product.productDetailedName && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {product.productDetailedName}
                        </p>
                      )}
                      {(product.color || product.size) && (
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          {product.color && <span>Color: {product.color}</span>}
                          {product.size && <span>Size: {product.size}</span>}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-row md:flex-row justify-between items-start md:items-center gap-4 mt-4">
                      {/* Qty */}
                      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-2xl">
                        <button
                          onClick={() => decreaseQty(product.id)}
                          className="w-9 h-9 bg-white rounded-full shadow hover:bg-gray-200 text-lg"
                        >
                          −
                        </button>
                        <span className="text-lg font-bold w-10 text-center">
                          {product.qty || 1}
                        </span>
                        <button
                          onClick={() => increaseQty(product.id)}
                          className="w-9 h-9 bg-white rounded-full shadow hover:bg-gray-200 text-lg"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-xl md:text-2xl font-extrabold text-[#2b5f72]">
                          ₹{Number(product.price || product.offerPrice || 0) * (product.qty || 1)}
                        </p>
                        {product.mrPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            ₹{Number(product.mrPrice) * (product.qty || 1)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => confirmDelete(product.id)}
                    className="absolute top-4 right-4 text-red-600 hover:text-red-700 bg-gray-200 p-2.5 rounded-full hover:bg-red-100 transition-all duration-300"
                  >
                    <IconTrashFilled size={26} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-7">
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#2b5f72] mb-5">
                Order Summary
              </h3>

              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between text-base md:text-lg">
                  <p>Subtotal</p>
                  <p className="font-semibold">₹{subtotal}</p>
                </div>

                {totalSavings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p>You Save</p>
                    <p className="font-bold">₹{totalSavings}</p>
                  </div>
                )}

                <div className="flex justify-between text-base md:text-lg">
                  <p>Shipping</p>
                  <p className="text-green-600 font-bold">Free</p>
                </div>

                <hr className="my-5 border-gray-300" />

                <div className="flex justify-between text-xl md:text-2xl font-extrabold text-[#2b5f72]">
                  <p>Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#2b5f72] hover:bg-[#244c5a] text-white py-4 rounded-2xl text-lg md:text-xl font-bold mt-6 shadow-lg hover:shadow-xl transition"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={handlePurchaseMore}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-4 rounded-2xl text-lg md:text-xl font-bold mt-3 shadow-lg hover:shadow-xl transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-32 px-6">
            <div className="text-6xl mb-6 opacity-30">🛒</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
              Discover amazing products and fill your cart with items you'll love!
            </p>
            <button
              onClick={() => navigate("/allProduct")}
              className="bg-[#2b5f72] hover:bg-[#244c5a] text-white px-10 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl transition"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-2xl text-center">
            <div className="text-5xl mb-4">🗑️</div>
            <h2 className="text-2xl font-bold mb-3">Remove Item?</h2>
            <p className="text-gray-600 mb-8">
              This item will be removed from your cart.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-2xl font-bold"
              >
                Cancel
              </button>
              <button
                onClick={deleteItem}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}