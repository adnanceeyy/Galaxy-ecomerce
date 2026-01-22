import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconCheck, IconCreditCard, IconLock, IconTruck } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import { API_URL, BACKEND_BASE } from "../config/api";
import axios from "axios";
import toast from "react-hot-toast";
import OrderSuccessModal from "../components/OrderSuccessModal";

const CheckoutPage = () => {
   const navigate = useNavigate();
   const { isLoggedIn, currentUser, clearCart, cartItems } = useAuth(); // Use global cart
   const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [placedOrderId, setPlacedOrderId] = useState(null);
   const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' or 'cod'

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
      if (cartItems.length === 0 && !showSuccessModal) {
         navigate("/cart"); // Redirect empty cart
      }
   }, [cartItems, navigate, showSuccessModal]);

   // Load Razorpay Script
   useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
      return () => {
         document.body.removeChild(script);
      };
   }, []);

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   /* ---------------- RAZORPAY PAYMENT ---------------- */
   const handleRazorpayPayment = async (orderData) => {
      return new Promise((resolve, reject) => {
         const options = {
            key: "rzp_test_yourkeyhere", // Replace with real key in production
            amount: orderData.paymentSummary.total * 100, // In paise
            currency: "INR",
            name: "Eleckyo Store",
            description: "Order Settlement",
            image: "https://eleckyo.com/logo.png",
            handler: function (response) {
               resolve(response.razorpay_payment_id);
            },
            prefill: {
               name: orderData.customerDetails.name,
               email: orderData.customerDetails.email,
               contact: orderData.customerDetails.phone,
            },
            theme: {
               color: "#1e3a8a", // Primary color
            },
            modal: {
               ondismiss: function () {
                  reject(new Error("Payment cancelled by user"));
               }
            }
         };

         const rzp = new window.Razorpay(options);
         rzp.open();
      });
   };

   /* ---------------- PLACE ORDER ---------------- */
   const handlePlaceOrder = async (e) => {
      e.preventDefault();

      if (!isLoggedIn || !currentUser) {
         toast.error("Please log in to place an order.");
         return;
      }

      const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price) * (item.qty || 1), 0);
      const shipping = 0;
      const total = subtotal + shipping;

      let orderData = {
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
            productId: String(item.id || item._id),
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
         paymentMethod: paymentMethod,
         status: "Processing"
      };

      try {
         let paymentId = null;

         if (paymentMethod === "card") {
            // Initiate Razorpay
            try {
               paymentId = await handleRazorpayPayment(orderData);
               orderData.paymentId = paymentId;
               orderData.status = "Paid & Confirmed";
            } catch (payErr) {
               if (payErr.message !== "Payment cancelled by user") {
                  toast.error(payErr.message);
               }
               return;
            }
         }

         const pendingToast = toast.loading(paymentMethod === "card" ? "Finalizing order..." : "Processing order...");

         // Submit to Backend
         const res = await axios.post(`${API_URL}/orders`, orderData);

         setPlacedOrderId(res.data.orderId);
         setShowSuccessModal(true);
         toast.dismiss(pendingToast);

         // Clear Cart
         await clearCart();
      } catch (err) {
         console.error("Order error:", err);
         toast.error(err.response?.data?.message || "Failed to place order. Please try again.");
      }
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
                  <div className="w-8 h-px bg-gray-300"></div>
                  <span className="text-primary flex items-center gap-1"><span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">2</span> Checkout</span>
                  <div className="w-8 h-px bg-gray-300"></div>
                  <span className="text-gray-400">Confirmation</span>
               </div>
            </div>

            <form onSubmit={handlePlaceOrder} className="flex flex-col lg:flex-row gap-8 lg:gap-16">

               {/* LEFT: Shipping Details */}
               <div className="flex-1 space-y-8">

                  {/* Contact Info */}
                  <div className="bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
                     <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2">
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
                     <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2">
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
                           </select>
                        </div>
                     </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                     <h2 className="text-lg font-bold font-sans mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-blue-50 text-primary flex items-center justify-center text-xs font-sans font-bold">3</span>
                        Payment Settlement
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                           type="button"
                           onClick={() => setPaymentMethod("card")}
                           className={`group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 transition-all ${paymentMethod === "card"
                              ? "border-primary bg-blue-50/30"
                              : "border-gray-100 bg-white hover:border-gray-200"
                              }`}
                        >
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === "card" ? "bg-primary text-white" : "bg-gray-50 text-gray-400"}`}>
                              <IconCreditCard size={20} />
                           </div>
                           <div className="text-left">
                              <p className={`font-bold text-sm ${paymentMethod === "card" ? "text-primary" : "text-gray-900"}`}>Digital Payment</p>
                              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Card / UPI / NetBanking</p>
                           </div>
                           {paymentMethod === "card" && (
                              <div className="absolute top-4 right-4 text-primary">
                                 <IconCheck size={18} stroke={3} />
                              </div>
                           )}
                        </button>

                        <button
                           type="button"
                           onClick={() => setPaymentMethod("cod")}
                           className={`group relative flex flex-col items-start gap-3 p-5 rounded-2xl border-2 transition-all ${paymentMethod === "cod"
                              ? "border-primary bg-blue-50/30"
                              : "border-gray-100 bg-white hover:border-gray-200"
                              }`}
                        >
                           <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === "cod" ? "bg-primary text-white" : "bg-gray-50 text-gray-400"}`}>
                              <IconTruck size={20} />
                           </div>
                           <div className="text-left">
                              <p className={`font-bold text-sm ${paymentMethod === "cod" ? "text-primary" : "text-gray-900"}`}>Cash on Delivery</p>
                              <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Pay at your doorstep</p>
                           </div>
                           {paymentMethod === "cod" && (
                              <div className="absolute top-4 right-4 text-primary">
                                 <IconCheck size={18} stroke={3} />
                              </div>
                           )}
                        </button>
                     </div>
                  </div>

               </div>

               {/* RIGHT: Order Summary */}
               <div className="w-full lg:w-80">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 lg:p-6 sticky top-24">
                     <h3 className="text-lg font-bold font-sans mb-6">Order Summary</h3>

                     {/* Mini Cart List */}
                     <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar pt-2">
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
                        className="w-full h-14 bg-primary hover:bg-black text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
                     >
                        <IconLock size={20} />
                        {paymentMethod === "card" ? "Pay Securely" : "Complete Order"}
                        <span className="ml-1 opacity-70">₹{total.toLocaleString()}</span>
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
