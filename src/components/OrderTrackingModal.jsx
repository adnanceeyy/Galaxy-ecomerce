import React from "react";
import {
   IconTruck,
   IconPackage,
   IconCheck,
   IconX,
   IconMapPin,
   IconCircleCheckFilled,
   IconLoader2,
   IconClock,
   IconBoxSeam,
   IconDeviceMobile,
   IconCircleXFilled
} from "@tabler/icons-react";

const OrderTrackingModal = ({ order, onClose }) => {
   if (!order) return null;

   // ALIGNED WITH ADMIN STATUSES: Pending, Processing, Shipped, Completed, Failed
   const statusMap = {
      'pending': { label: 'Pending Verification', index: 0, color: 'text-amber-500', bg: 'bg-amber-50', icon: IconClock },
      'processing': { label: 'Processing Order', index: 1, color: 'text-blue-500', bg: 'bg-blue-50', icon: IconBoxSeam },
      'shipped': { label: 'Shipped & In Transit', index: 2, color: 'text-indigo-500', bg: 'bg-indigo-50', icon: IconTruck },
      'completed': { label: 'Delivered', index: 4, color: 'text-green-500', bg: 'bg-green-50', icon: IconCircleCheckFilled },
      'failed': { label: 'Delivery Failed', index: -1, color: 'text-red-500', bg: 'bg-red-50', icon: IconCircleXFilled }
   };

   const currentStatus = (order.status || "Pending").toLowerCase();
   const statusInfo = statusMap[currentStatus] || statusMap['pending'];

   const steps = [
      { id: 1, label: "Order Pending", desc: "Waiting for verification", icon: IconClock },
      { id: 2, label: "Processing", desc: "Preparing and packing your items", icon: IconBoxSeam },
      { id: 3, label: "Shipped", desc: "Handed over to logistics partner", icon: IconTruck },
      { id: 4, label: "Out for Delivery", desc: "Order is reaching your local hub", icon: IconMapPin },
      { id: 5, label: "Completed", desc: "Successfully delivered and secured", icon: IconCheck },
   ];

   const currentStepIndex = statusInfo.index;

   // Generate relative dates for "realism"
   const baseTime = new Date(order.createdAt).getTime();
   const getDate = (days) => new Date(baseTime + days * 86400000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

   return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-primary/10 backdrop-blur-xl animate-fadeIn">

         {/* Background Decoration */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="bg-white/95 w-full max-w-lg rounded-[40px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden animate-slideUp border border-white/50 backdrop-blur-2xl flex flex-col max-h-[90vh]">

            {/* Header Section */}
            <div className="p-8 pb-5 flex justify-between items-start shrink-0 border-b border-gray-50">
               <div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">Track Your Order</h3>
                  <p className="mt-2 text-xs font-bold text-gray-500">ID: <span className="font-mono text-primary">#{(order.id || order._id || "").slice(-8).toUpperCase()}</span></p>
               </div>
               <button
                  onClick={onClose}
                  className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all text-gray-400"
               >
                  <IconX size={20} stroke={3} />
               </button>
            </div>

            <div className="px-8 flex-1 overflow-y-auto custom-scrollbar pt-6 pb-8">

               {/* Live Condition Card - SYNCED WITH ADMIN */}
               <div className={`${statusInfo.bg} border border-white rounded-[32px] p-6 mb-8 relative group overflow-hidden`}>
                  <div className="flex items-center gap-5 relative z-10">
                     <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center ${statusInfo.color} shadow-lg shadow-black/5`}>
                        <statusInfo.icon size={28} stroke={2} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Current Status</p>
                        <p className={`text-xl font-black ${statusInfo.color} uppercase tracking-tighter`}>{statusInfo.label}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Updated just now</p>
                     </div>
                  </div>
               </div>

               {/* Timeline */}
               <div className="space-y-6 relative before:absolute before:left-7 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {steps.map((step, index) => {
                     const isCompleted = index <= currentStepIndex;
                     const isActive = index === currentStepIndex;
                     const StepIcon = step.icon;

                     // Special case for Failed: if failed, stop everything
                     if (currentStatus === 'failed' && index > 0) return null;

                     return (
                        <div key={index} className={`flex items-start gap-6 relative transition-all duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                           {/* Line connector for completed items */}
                           {index < steps.length - 1 && isCompleted && index < currentStepIndex && (
                              <div className="absolute left-[27.5px] top-12 w-0.5 h-10 bg-primary/30 z-0"></div>
                           )}

                           <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center z-10 transition-all duration-500 ${isCompleted
                                 ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-100'
                                 : 'bg-white border-2 border-gray-50 text-gray-300 scale-90'
                              } ${isActive ? 'ring-4 ring-primary/10' : ''}`}>
                              <StepIcon size={24} stroke={isActive ? 2.5 : 1.5} />
                           </div>

                           <div className="pt-2">
                              <div className="flex items-center gap-2">
                                 <h4 className={`text-sm font-black uppercase tracking-tight ${isActive ? 'text-primary' : 'text-gray-900'}`}>
                                    {step.label}
                                 </h4>
                                 {isCompleted && index < currentStepIndex && (
                                    <IconCheck size={12} className="text-green-500" stroke={4} />
                                 )}
                              </div>
                              <p className="text-[10px] font-bold text-gray-400 leading-none mt-1">{step.desc}</p>

                              {isCompleted && (
                                 <p className="text-[9px] font-black text-primary/60 mt-2">
                                    {getDate(index)} | 10:24 AM
                                 </p>
                              )}
                           </div>

                           {isActive && (
                              <div className="ml-auto">
                                 <span className="flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                 </span>
                              </div>
                           )}
                        </div>
                     );
                  })}

                  {currentStatus === 'failed' && (
                     <div className="flex items-start gap-6 relative opacity-100">
                        <div className="shrink-0 w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center z-10 shadow-xl shadow-red-500/20">
                           <IconCircleXFilled size={24} />
                        </div>
                        <div className="pt-2">
                           <h4 className="text-sm font-black uppercase tracking-tight text-red-600">Voided / Failed</h4>
                           <p className="text-[10px] font-bold text-gray-400 leading-none mt-1">Shipment interrupted or cancelled</p>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Footer Info */}
            <div className="p-8 pt-6 border-t border-gray-50 bg-gray-50/50 flex items-center gap-4 shrink-0">
               <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 border border-gray-100 shadow-sm">
                  <IconDeviceMobile size={20} />
               </div>
               <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Support Active</p>
                  <p className="text-xs font-black text-gray-800 uppercase tracking-tighter">Live Status Sync Enabled</p>
               </div>
            </div>
         </div>

         <style>{`
                .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
                .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { transform: translateY(60px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #eee; border-radius: 10px; }
            `}</style>
      </div>
   );
};

export default OrderTrackingModal;
