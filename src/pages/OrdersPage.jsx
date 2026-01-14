import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconPackage, IconBox, IconChevronRight, IconAlertCircle } from "@tabler/icons-react";
import { BACKEND_BASE } from "../config/api";
import { useAuth } from "../components/AuthWrapper";
import DashboardLayout from "../components/DashboardLayout";
import InvoiceModal from "../components/InvoiceModal";
import OrderTrackingModal from "../components/OrderTrackingModal";

const OrdersPage = () => {
   const [orders, setOrders] = useState([]);
   const [loading, setLoading] = useState(true);
   const [selectedOrder, setSelectedOrder] = useState(null);
   const [trackingOrder, setTrackingOrder] = useState(null);
   const { currentUser } = useAuth();

   // Local Orders Fetch
   useEffect(() => {
      const fetchOrders = () => {
         if (currentUser?.email) {
            const allOrders = JSON.parse(localStorage.getItem("galaxy_orders")) || [];
            const userEmail = currentUser.email.toLowerCase();
            const myOrders = allOrders.filter(o =>
               o.customerDetails?.email?.toLowerCase() === userEmail
            );
            setOrders(myOrders.reverse());
         }
         setLoading(false);
      };

      if (currentUser) {
         fetchOrders();
      } else {
         setLoading(false);
      }
   }, [currentUser]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const getStatusColor = (status) => {
      const s = status?.toLowerCase() || "";
      if (s.includes("delivered")) return "bg-green-100 text-green-700 border-green-200";
      if (s.includes("cancel")) return "bg-red-100 text-red-700 border-red-200";
      if (s.includes("shipped") || s.includes("process")) return "bg-amber-100 text-amber-700 border-amber-200";
      return "bg-gray-100 text-gray-700 border-gray-200";
   };

   if (!currentUser) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
         <IconAlertCircle size={48} className="text-gray-300" />
         <p className="text-gray-500 font-medium">Please log in to view your orders.</p>
         <Link to="/login" className="px-6 py-2 bg-primary text-white rounded-lg font-bold">Login Now</Link>
      </div>
   );

   return (
      <DashboardLayout activePage="orders">
         <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold font-serif text-gray-900 tracking-tight">Order History</h1>
            <p className="text-xs text-gray-500 font-medium">{orders.length} orders placed</p>
         </div>

         {loading ? (
            <div className="space-y-6">
               {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                     <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
                     <div className="h-20 bg-gray-50 rounded-xl"></div>
                  </div>
               ))}
            </div>
         ) : orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <IconBox size={40} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
               <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't placed any orders yet. Start shopping and they will appear here.</p>
               <Link to="/allProduct" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-secondary transition-all shadow-lg shadow-primary/10 group">
                  Browse Products <IconChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
         ) : (
            <div className="space-y-8">
               {orders.map((order) => (
                  <div key={order.id || order._id} className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                     {/* Order Header */}
                     <div className="bg-gray-50/50 px-6 py-5 flex flex-wrap items-center justify-between border-b border-gray-100 gap-6">
                        <div className="flex flex-wrap gap-x-10 gap-y-4">
                           <div>
                              <span className="block text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Order Placed</span>
                              <span className="font-bold text-gray-900">{new Date(order.createdAt || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                           </div>
                           <div>
                              <span className="block text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Amount</span>
                              <span className="font-black text-primary">₹{(order.paymentSummary?.total || order.totalAmount || 0).toLocaleString('en-IN')}</span>
                           </div>
                           <div>
                              <span className="block text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Order ID</span>
                              <span className="font-mono text-gray-500 text-sm">#{(order.id || order._id || "---").slice(-8).toUpperCase()}</span>
                           </div>
                        </div>
                        <div>
                           <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                              {order.status || "Processing"}
                           </span>
                        </div>
                     </div>

                     {/* Order Items */}
                     <div className="p-6">
                        <div className="divide-y divide-gray-50">
                           {order.orderedItems?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-6 py-4 first:pt-0 last:pb-0">
                                 <div className="w-20 h-20 bg-gray-50 rounded-xl border border-gray-100 flex-shrink-0 flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
                                    {/* Image handling - using generic Icon if not present */}
                                    {item.image ? (
                                       <img src={`${BACKEND_BASE}${item.image}`} alt={item.itemName} className="w-full h-full object-contain" />
                                    ) : (
                                       <IconPackage size={32} className="text-gray-300" />
                                    )}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-gray-900 group-hover:text-accent transition-colors truncate">{item.itemName}</h4>
                                    <div className="flex items-center gap-4 mt-1">
                                       <p className="text-xs text-gray-500">Qty: <span className="font-bold text-gray-900">{item.quantity}</span></p>
                                       <p className="text-xs text-secondary font-medium">Price: ₹{Number(item.totalPrice / (item.quantity || 1)).toLocaleString('en-IN')}</p>
                                    </div>
                                 </div>
                                 <div className="text-right flex flex-col items-end">
                                    <span className="text-sm font-black text-primary">₹{Number(item.totalPrice).toLocaleString('en-IN')}</span>
                                    <Link to={`/singleProduct/${item.productId}`} className="text-[10px] font-bold text-accent hover:underline mt-1 bg-orange-50 px-2 py-0.5 rounded">View Item</Link>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* Order Footer Actions */}
                     <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex justify-end gap-3">
                        <button
                           onClick={() => setTrackingOrder(order)}
                           className="px-4 py-2 text-xs font-bold text-gray-600 border border-gray-200 rounded-lg hover:bg-white hover:shadow-sm transition-all"
                        >
                           Track Order
                        </button>
                        <button
                           onClick={() => setSelectedOrder(order)}
                           className="px-4 py-2 text-xs font-bold text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-all"
                        >
                           View Invoice
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {selectedOrder && (
            <InvoiceModal
               order={selectedOrder}
               onClose={() => setSelectedOrder(null)}
            />
         )}

         {trackingOrder && (
            <OrderTrackingModal
               order={trackingOrder}
               onClose={() => setTrackingOrder(null)}
            />
         )}
      </DashboardLayout>
   );
};

export default OrdersPage;
