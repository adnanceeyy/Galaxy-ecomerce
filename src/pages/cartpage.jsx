import React, { useEffect, useState } from "react";
import { IconTrashFilled } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { useAuth } from "../components/AuthWrapper";

export default function Cartpage() {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const { isLoggedIn, openModal } = useAuth(); // Added: Get auth state and modal trigger
  const navigate = useNavigate(); // Added: For programmatic navigation

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

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowPopup(true);
  };

  // Delete item
  const deleteItem = () => {
    const updated = cartItems.filter((item) => item.id !== deleteId);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setShowPopup(false);
    setDeleteId(null);
  };

  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.offerPrice) * (item.qty || 1),
    0
  );

  // Added: Handle Proceed to Checkout with auth check
  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      // Immediately open modal (no delay) and block proceed
      openModal();
      return;
    }
    // If logged in, navigate to checkout
    navigate("/checkout");
  };

  // Added: Handle Purchase more Items (no auth required)
  const handlePurchaseMore = () => {
    navigate("/allproduct");
  };

  return (
    <div>
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]" />

      <div className="w-[99.5%] place-self-center min-h-screen h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-lg mb-60 md:mb-96">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#2b5f72] text-center mb-5">
          🛒 Your Cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-6">
            {/* CART ITEMS */}
            <div className="col-span-2 flex flex-col gap-3 md:gap-5 mt-8 md:mt-7">
              {cartItems.map((product) => (
                <div
                  key={product.id}
                  className="relative flex bg-white rounded-3xl shadow-lg p-3 gap-4"
                >
                  <img
                    src={product.productImg}
                    alt={product.productName}
                    className="w-28 h-28 md:w-40 md:h-40 rounded-2xl object-cover shadow-md"
                  />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-lg md:text-2xl font-bold text-gray-700">
                        {product.productName}
                      </h2>

                      <p className="text-sm text-gray-500">{product.color}</p>
                      <p className="text-sm text-gray-500">Free Shipping</p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Qty */}
                      <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl shadow-inner">
                        <button
                          onClick={() => decreaseQty(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-lg text-xl font-bold hover:bg-gray-400"
                        >
                          -
                        </button>

                        <span className="text-xl font-semibold">
                          {product.qty || 1}
                        </span>

                        <button
                          onClick={() => increaseQty(product.id)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-lg text-xl font-bold hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={() => confirmDelete(product.id)}
                        className="text-red-600 text-xs absolute top-3 right-3 underline hover:text-red-700 bg-gray-100 p-1 rounded-full"
                      >
                        <IconTrashFilled size={25} />
                      </button>

                      <p className="text-xl md:text-3xl font-bold text-[#2b5f72]">
                        ₹{Number(product.offerPrice) * (product.qty || 1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="bg-white w-full rounded-3xl shadow-xl p-4 h-fit sticky top-24 mt-2 md:mt-0">
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

              {/* Updated: Button with auth check */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#2b5f72] hover:bg-[#244c5a] text-white py-3 rounded-2xl text-lg font-semibold mt-6"
              >
                Proceed to Checkout
              </button>

              {/* Updated: Button for more items */}
              <button
                onClick={handlePurchaseMore}
                className="w-full bg-[#208d12] hover:bg-[#265a24] text-white py-3 rounded-2xl text-lg font-semibold mt-3"
              >
                Purchase more Items
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl md:text-4xl font-bold text-center py-24 text-gray-700">
            🛍️ Your Cart is Empty
          </h1>
        )}
      </div>

      {/* DELETE CONFIRM POPUP (OUTSIDE LOOP) */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-1000">
          <div className="bg-white w-80 md:w-96 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-center">
              Remove Item?
            </h2>
            <p className="text-gray-600 text-center mt-2">
              Are you sure you want to delete this product?
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-2 bg-gray-300 hover:bg-gray-400 rounded-xl font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={deleteItem}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}