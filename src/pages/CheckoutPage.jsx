import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconCheck, IconCreditCard, IconLock, IconTruck } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import { BACKEND_BASE } from "../config/api";
import toast from "react-hot-toast";
import OrderSuccessModal from "../components/OrderSuccessModal";

const CheckoutPage = () => {
   const navigate = useNavigate();
   const { isLoggedIn, currentUser, clearCart, cartItems } = useAuth(); // Use global cart
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [placedOrderId, setPlacedOrderId] = useState(null);

   // Form State
   const [formData, setFormData] = useState({
      firstName: currentUser?.name?.split(' ')[0] || "",
      lastName: currentUser?.name?.split(' ').slice(1).join(' ') || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      address: currentUser?.address || "",
      city: "",
      zip: "",
      country: "India",
   });

   useEffect(() => {
      if (cartItems.length === 0) {
         navigate("/cart"); // Redirect empty cart
      }
   }, [cartItems, navigate]);

   // Scroll to top on mount
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   /* ---------------- MOCK ORDER PLACE ---------------- */
   const handlePlaceOrder = async (e) => {
      e.preventDefault();

      if (!isLoggedIn || !currentUser) {
         toast.error("Please log in to place an order.");
         return;
      }

      const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0);
      const shipping = 0;
      const total = subtotal + shipping;

      const newOrderId = "ORD-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

      const orderData = {
         _id: newOrderId,
         id: newOrderId,
         customerDetails: {
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            email: currentUser.email,
            address: {
               street: formData.address,
               city: formData.city,
               postalCode: formData.zip,
               country: formData.country
            }
         },
         orderedItems: cartItems.map(item => ({
            productId: item.id || item._id,
            itemName: item.name,
            quantity: item.qty || 1,
            unitPrice: Number(item.price),
            totalPrice: Number(item.price) * (item.qty || 1),
            image: item.image
         })),
         paymentSummary: {
            subtotal: subtotal,
            shipping: shipping,
            total: total,
            currency: 'INR'
         },
         status: "Processing",
         createdAt: new Date().toISOString()
      };

      // SIMULATE PROCESSING
      const pendingToast = toast.loading("Processing secure payment...");

      setTimeout(() => {
         try {
            // Save to LocalStorage "Database"
            const allOrders = JSON.parse(localStorage.getItem("galaxy_orders")) || [];
            allOrders.push(orderData);
            localStorage.setItem("galaxy_orders", JSON.stringify(allOrders));

            setPlacedOrderId(newOrderId);
            toast.dismiss(pendingToast);
            toast.success("Order placed successfully!");

            // Clear Cart
            clearCart();

            // Show Success Modal
            setShowSuccessModal(true);
         } catch (err) {
            toast.dismiss(pendingToast);
            toast.error("Failed to place order locally");
         }
      }, 1500); // 1.5s delay for realism
   };

   const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0);
   const shipping = 0;
   const total = subtotal + shipping;

   return (
      <div className="bg-gray-50 min-h-screen font-sans pt-8 pb-16">
         <div className="max-w-[1200px] mx-auto px-4 md:px-8">

            <div className="flex items-center justify-center mb-6">
               <div className="flex items-center gap-4 text-sm font-bold">
                  <span className="text-gray-400">Cart</span>
                  <div className="w-8 h-[1px] bg-gray-300"></div>
                  <span className="text-primary flex items-center gap-1"><span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span> Checkout</span>
                  <div className="w-8 h-[1px] bg-gray-300"></div>
                  <span className="text-gray-400">Confirmation</span>
               </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 lg:gap-16">

               {/* LEFT: Shipping Details */}
               <div className="flex-1 space-y-8">

                  {/* Contact Info */}
                  <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
                     <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-primary flex items-center justify-center text-xs font-sans font-bold">1</span>
                        Contact Information
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-1 md:col-span-2">
                           <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                           <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                           <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                           <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
                     <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-primary flex items-center justify-center text-xs font-sans font-bold">2</span>
                        Shipping Address
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">First Name</label>
                           <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Last Name</label>
                           <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Address</label>
                           <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">City</label>
                           <input
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div>
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Postal Code</label>
                           <input
                              type="text"
                              name="zip"
                              value={formData.zip}
                              onChange={handleChange}
                              required
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                           />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                           <label className="block text-[10px] font-bold text-gray-700 uppercase mb-1">Country</label>
                           <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition bg-white"
                           >
                              <option>India</option>
                              <option>United States</option>
                              <option>United Kingdom</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  {/* Payment Method (Mock) */}
                  <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
                     <h2 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-primary flex items-center justify-center text-xs font-sans font-bold">3</span>
                        Payment
                     </h2>
                     <div className="space-y-4">
                        <label className="flex items-center gap-4 p-4 border border-primary bg-blue-50/50 rounded-lg cursor-pointer transition">
                           <input type="radio" name="payment" defaultChecked className="accent-primary w-5 h-5" />
                           <div className="flex items-center gap-3 flex-1">
                              <IconCreditCard className="text-primary" />
                              <span className="font-bold text-gray-900">Credit / Debit Card</span>
                           </div>
                           <div className="flex gap-2">
                              <div className="h-6 w-10 bg-gray-200 rounded"></div>
                              <div className="h-6 w-10 bg-gray-200 rounded"></div>
                           </div>
                        </label>
                        <label className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-gray-300 transition">
                           <input type="radio" name="payment" className="accent-primary w-5 h-5" />
                           <div className="flex items-center gap-3 flex-1">
                              <IconTruck className="text-gray-500" />
                              <span className="font-bold text-gray-700">Cash on Delivery</span>
                           </div>
                        </label>
                     </div>
                  </div>

               </div>

               {/* RIGHT: Order Summary */}
               <div className="w-full lg:w-80">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 lg:p-6 sticky top-24">
                     <h3 className="text-lg font-bold font-serif mb-6">Order Summary</h3>

                     {/* Mini Cart List */}
                     <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                        {cartItems.map(item => (
                           <div key={item.id} className="flex gap-3">
                              <div className="relative">
                                 <div className="w-16 h-16 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                                    <img
                                       src={`${BACKEND_BASE}${item.image}`}
                                       className="max-h-full max-w-full object-contain"
                                       onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=No+Image")}
                                    />
                                 </div>
                                 <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-500 text-white rounded-full flex items-center justify-center text-xs font-bold">{item.qty}</span>
                              </div>
                              <div className="flex-1">
                                 <h4 className="text-sm font-bold text-gray-800 line-clamp-2">{item.name}</h4>
                                 <p className="text-sm text-gray-500">₹{Number(item.price).toLocaleString()}</p>
                              </div>
                              <div className="font-bold text-sm">
                                 ₹{(Number(item.price) * (item.qty || 1)).toLocaleString()}
                              </div>
                           </div>
                        ))}
                     </div>

                     <div className="border-t border-gray-100 pt-4 space-y-3 text-sm text-gray-600 mb-6">
                        <div className="flex justify-between">
                           <span>Subtotal</span>
                           <span className="font-bold text-gray-900">₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                           <span>Shipping</span>
                           {shipping === 0 ? <span className="text-green-600 font-bold">Free</span> : <span className="font-bold text-gray-900">₹{shipping}</span>}
                        </div>
                     </div>

                     <div className="border-t border-gray-100 pt-4 mb-8">
                        <div className="flex justify-between items-end">
                           <span className="font-bold text-lg text-primary">Total</span>
                           <div className="text-right">
                              <span className="text-xs text-gray-400 font-normal">INR</span> <span className="font-bold text-2xl text-accent">₹{total.toLocaleString()}</span>
                           </div>
                        </div>
                     </div>

                     <button
                        type="submit"
                        className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/30"
                     >
                        <IconLock size={16} /> Pay ₹{total.toLocaleString()}
                     </button>

                     <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                        <IconLock size={14} /> <span className="text-xs font-semibold">SSL Secured Payment</span>
                     </div>

                  </div>
               </div>

            </form>
         </div>

         <OrderSuccessModal
            isOpen={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            orderId={placedOrderId}
         />
      </div>
   );
};

export default CheckoutPage;