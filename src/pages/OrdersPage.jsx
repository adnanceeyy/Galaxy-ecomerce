import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthWrapper";

export default function OrdersPage() {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    
    // Mock Orders Logic or Fetch from LocalStorage
    // In a real app, this would fetch from backend using currentUser.id
    
    // For now, let's create some dummy orders if none exist
    const dummyOrders = [
      {
        id: "ORD-7729-2023",
        date: "Oct 12, 2025",
        status: "Delivered",
        total: 12999,
        items: [
           { name: "Wireless Headset Pro", image: "https://via.placeholder.com/80", qty: 1 }
        ]
      },
      {
        id: "ORD-9921-2024",
        date: "Jan 05, 2026",
        status: "Processing",
        total: 4500,
        items: [
           { name: "Gaming Mouse X", image: "https://via.placeholder.com/80", qty: 2 }
        ]
      }
    ];

    setOrders(dummyOrders);
    window.scrollTo(0,0);

  }, [isLoggedIn, navigate]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-[#f7fbff] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-[#2b5f72]">My Orders</h1>
            <p className="text-gray-500 mt-2 text-lg">Track and manage your recent purchases</p>
          </div>
          <Link to="/allproduct" className="bg-[#2b5f72] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#204a5a] transition shadow-lg">
             Shop More
          </Link>
        </div>

        <div className="space-y-6">
           {orders.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
                <p className="text-2xl text-gray-400 font-bold mb-4">No orders yet</p>
                <Link to="/allproduct" className="text-[#2b5f72] font-semibold underline">Start Shopping</Link>
             </div>
           ) : (
             orders.map((order) => (
                <div key={order.id} className="bg-white rounded-[30px] p-6 md:p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                   <div className="flex flex-col md:flex-row justify-between mb-6 border-b border-gray-100 pb-4">
                      <div className="space-y-1">
                         <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Order ID</p>
                         <p className="text-xl font-bold text-gray-800">{order.id}</p>
                      </div>
                      <div className="space-y-1 mt-4 md:mt-0">
                         <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Date</p>
                         <p className="text-lg text-gray-700">{order.date}</p>
                      </div>
                      <div className="space-y-1 mt-4 md:mt-0">
                         <p className="text-sm text-gray-500 uppercase tracking-wide font-bold">Total Amount</p>
                         <p className="text-xl font-extrabold text-[#2b5f72]">₹{order.total.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1 mt-4 md:mt-0">
                         <p className="text-sm text-gray-500 uppercase tracking-wide font-bold mb-1">Status</p>
                         <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                           order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                         }`}>
                           {order.status}
                         </span>
                      </div>
                   </div>

                   <div className="space-y-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                           <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="font-bold text-gray-800">{item.name}</p>
                              <p className="text-gray-500 text-sm">Qty: {item.qty}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-4">
                      <button className="text-[#2b5f72] font-bold hover:underline">View Invoice</button>
                      <button className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl text-sm font-bold transition">Track Order</button>
                   </div>
                </div>
             ))
           )}
        </div>

      </div>
    </div>
  );
}
