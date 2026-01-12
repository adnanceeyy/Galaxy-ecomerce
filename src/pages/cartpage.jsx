import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconTrash, IconMinus, IconPlus, IconArrowLeft, IconLock } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  // Load Cart
  useEffect(() => {
    const loadCart = () => {
      let items = [];
      if (isLoggedIn && currentUser) {
        items = JSON.parse(localStorage.getItem(`cart_${currentUser.email}`)) || [];
      } else {
        items = JSON.parse(localStorage.getItem("cart")) || [];
      }
      setCartItems(items);
    };

    loadCart();
    
    // Listen for updates (from Nav or other components)
    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, [isLoggedIn, currentUser]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    if (isLoggedIn && currentUser) {
      localStorage.setItem(`cart_${currentUser.email}`, JSON.stringify(newCart));
    } else {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item.id !== id);
    updateCart(newCart);
  };

  const updateQty = (id, delta) => {
    const newCart = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = Math.max(1, (item.qty || 1) + delta);
        return { ...item, qty: newQty };
      }
      return item;
    });
    updateCart(newCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0);
  const shipping = subtotal > 4999 ? 0 : 500;
  const total = subtotal + shipping;

  const backendBase = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace("/api", "")
    : "http://localhost:5000";

  return (
    <div className="bg-gray-50 min-h-screen font-sans pt-8 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-6">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
            <Link to="/allProduct" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-secondary transition-colors">
              <IconArrowLeft size={20} /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* LEFT: Cart Items Table */}
            <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="py-4 px-6 font-bold text-gray-700">Product</th>
                      <th className="py-4 px-6 font-bold text-gray-700">Price</th>
                      <th className="py-4 px-6 font-bold text-gray-700">Quantity</th>
                      <th className="py-4 px-6 font-bold text-gray-700">Total</th>
                      <th className="py-4 px-6 font-bold text-gray-700"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                              <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center p-1 border border-gray-200">
                                <img 
                                  src={`${backendBase}${item.image}`} 
                                  alt={item.name} 
                                  className="max-h-full max-w-full object-contain"
                                  onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")} 
                                />
                              </div>
                              <div>
                                <Link to={`/singleProduct/${item.id}`} className="font-bold text-primary hover:text-accent transition-colors line-clamp-1">
                                  {item.name}
                                </Link>
                                <p className="text-xs text-gray-500">{item.category || "Electronics"}</p>
                              </div>
                            </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">
                          ₹{Number(item.price).toLocaleString()}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center border border-gray-300 rounded h-8 w-24 bg-white">
                            <button onClick={() => updateQty(item.id, -1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-red-500"><IconMinus size={14} /></button>
                            <span className="flex-1 text-center text-sm font-bold">{item.qty || 1}</span>
                            <button onClick={() => updateQty(item.id, 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-green-500"><IconPlus size={14} /></button>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-bold text-primary">
                          ₹{(Number(item.price) * (item.qty || 1)).toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <IconTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                 <Link to="/allProduct" className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors">
                    <IconArrowLeft size={18} /> Continue Shopping
                 </Link>
                 <button onClick={() => updateCart([])} className="text-red-500 text-sm hover:underline">
                    Clear Cart
                 </button>
              </div>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="w-full lg:w-80">
               <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h3 className="text-lg font-bold font-serif mb-6 border-b border-gray-100 pb-4">Order Summary</h3>
                  
                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                     <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between">
                        <span>Shipping</span>
                        {shipping === 0 ? (
                           <span className="text-green-600 font-bold">Free</span>
                        ) : (
                           <span className="font-bold text-gray-900">₹{shipping}</span>
                        )}
                     </div>
                     <div className="flex justify-between">
                        <span>Tax Estimate</span>
                        <span className="font-bold text-gray-900">Included</span>
                     </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                     <div className="flex justify-between items-end">
                        <span className="font-bold text-lg text-primary">Total</span>
                        <span className="font-bold text-2xl text-accent">₹{total.toLocaleString()}</span>
                     </div>
                  </div>

                  <button 
                     onClick={() => navigate("/checkout")}
                     className="w-full bg-primary hover:bg-secondary text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/30"
                  >
                     <IconLock size={18} /> Proceed to Checkout
                  </button>
                  
                  <div className="mt-4 text-center">
                     <span className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <IconLock size={12} /> Secure Checkout
                     </span>
                  </div>
               </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;