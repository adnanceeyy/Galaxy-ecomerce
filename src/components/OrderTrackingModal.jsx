import React from "react";
import { IconTruck, IconPackage, IconCheck, IconCircle, IconMapPin, IconX } from "@tabler/icons-react";

const OrderTrackingModal = ({ order, onClose }) => {
  if (!order) return null;

  // Fake status logic
  const steps = [
    { id: 1, label: "Order Placed", date: order.createdAt, active: true, completed: true },
    { id: 2, label: "Processing", date: new Date(new Date(order.createdAt).getTime() + 86400000).toISOString(), active: true, completed: true }, // +1 day
    { id: 3, label: "Shipped", date: new Date(new Date(order.createdAt).getTime() + 172800000).toISOString(), active: false, completed: false }, // +2 days
    { id: 4, label: "Out for Delivery", date: null, active: false, completed: false },
    { id: 5, label: "Delivered", date: null, active: false, completed: false },
  ];

  // Determine current step based on order status string from backend
  const status = (order.status || "Processing").toLowerCase();
  let currentStepIndex = 1; // Default to Processing

  if (status.includes("ship")) currentStepIndex = 2;
  if (status.includes("deliver")) currentStepIndex = 4;

  // Update steps based on derived index
  const trackingSteps = steps.map((step, index) => ({
    ...step,
    completed: index <= currentStepIndex,
    active: index === currentStepIndex
  }));

  const estimatedDelivery = new Date(new Date(order.createdAt).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
         className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
         onClick={onClose}
      ></div>
      
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
         {/* Decoration */}
         <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
         
         <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
               <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Track Order</h3>
                  <p className="text-sm text-gray-500 font-medium">Order ID: #{ (order.id || order._id || "").slice(-8).toUpperCase() }</p>
               </div>
               <button 
                  onClick={onClose}
                  className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition text-gray-500"
               >
                  <IconX size={20} />
               </button>
            </div>

            {/* Estimated Delivery */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex items-center gap-4">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary shadow-sm">
                  <IconTruck size={24} />
               </div>
               <div>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-0.5">Estimated Delivery</p>
                  <p className="text-base md:text-lg font-bold text-gray-900">{estimatedDelivery}</p>
               </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-4 border-l-2 border-gray-100 space-y-8 ml-3">
               {trackingSteps.map((step, index) => (
                  <div key={step.id} className="relative">
                     {/* Bullet Point */}
                     <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        step.completed 
                           ? "bg-primary border-primary" 
                           : step.active 
                              ? "bg-white border-primary animate-pulse" 
                              : "bg-gray-100 border-gray-300"
                     }`}>
                        {step.completed && <IconCheck size={10} className="text-white" stroke={4} />}
                     </div>

                     <div className={`${step.completed || step.active ? "opacity-100" : "opacity-50"}`}>
                        <h4 className={`text-sm font-bold ${step.active ? "text-primary text-base" : "text-gray-900"}`}>
                           {step.label}
                        </h4>
                        {step.date && (
                           <p className="text-xs text-gray-500 mt-1">
                              {new Date(step.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                           </p>
                        )}
                        {step.active && (
                           <p className="text-xs text-primary font-medium mt-1 animate-pulse">
                              In Progress...
                           </p>
                        )}
                     </div>
                  </div>
               ))}
            </div>

            {/* Courier Info */}
            <div className="mt-8 pt-6 border-t border-gray-100">
               <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Courier Details</h5>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                     <IconPackage size={20} className="text-gray-500" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-gray-900">Eleckyo Logistics</p>
                     <p className="text-xs text-gray-500">Tracking ID: 1234-5678-9012</p>
                  </div>
               </div>
            </div>

         </div>
      </div>
    </div>
  );
};

export default OrderTrackingModal;
