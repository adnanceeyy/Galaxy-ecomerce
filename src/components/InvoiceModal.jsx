import React, { useRef } from "react";
import { IconPrinter, IconX, IconBrandWhatsapp } from "@tabler/icons-react";

const InvoiceModal = ({ order, onClose }) => {
   const printRef = useRef();

   const handlePrint = () => {
      const printContent = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;

      // Create a temporary container for printing to preserve styles
      const printWindow = window.open('', '', 'height=800,width=800');
      printWindow.document.write('<html><head><title>Invoice</title>');
      // Add Tailwind CDN for styling in print window (or copy styles)
      printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      printWindow.document.write('</head><body >');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      // Wait for resources to load then print
      setTimeout(() => {
         printWindow.print();
         printWindow.close();
      }, 1000);
   };

   if (!order) return null;

   const totalAmount = order.paymentSummary?.total || order.totalAmount || 0;
   const subtotal = order.paymentSummary?.subtotal || order.orderedItems.reduce((acc, item) => acc + item.totalPrice, 0);
   const shipping = order.paymentSummary?.shipping || 0;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
         ></div>

         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
            {/* Header Actions */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
               <h3 className="font-bold text-lg text-gray-800">Invoice Details</h3>
               <div className="flex gap-3">
                  <button
                     onClick={handlePrint}
                     className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition"
                  >
                     <IconPrinter size={18} /> Print Invoice
                  </button>
                  <button
                     onClick={onClose}
                     className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500"
                  >
                     <IconX size={20} />
                  </button>
               </div>
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto p-8 custom-scrollbar bg-white" ref={printRef}>
               {/* Invoice Header */}
               <div className="flex justify-between items-start mb-8 border-b border-gray-100 pb-8">
                  <div>
                     <h1 className="text-3xl font-serif font-bold text-primary mb-2">ELECKYO</h1>
                     <p className="text-xs text-gray-500 max-w-[200px]">
                        Premium Electronics Store<br />
                        123 Tech Park, Digital City,<br />
                        India - 676317
                     </p>
                  </div>
                  <div className="text-right">
                     <h2 className="text-2xl font-bold text-gray-200 uppercase tracking-widest mb-4">Invoice</h2>
                     <div className="space-y-1">
                        <p className="text-sm font-bold text-gray-800">#{String(order.id || order._id || "").slice(-8).toUpperCase()}</p>
                        <p className="text-xs text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500">Status: <span className="font-bold text-primary uppercase">{order.status}</span></p>
                     </div>
                  </div>
               </div>

               {/* Bill To */}
               <div className="mb-8 flex justify-between">
                  <div>
                     <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Bill To</p>
                     <h4 className="font-bold text-gray-900">{order.customerDetails?.name}</h4>
                     <p className="text-sm text-gray-600">{order.customerDetails?.email}</p>
                     <p className="text-sm text-gray-600">{order.customerDetails?.phone}</p>
                     <p className="text-sm text-gray-600 mt-1 max-w-[250px]">{order.customerDetails?.address?.street}, {order.customerDetails?.address?.city}</p>
                     <p className="text-sm text-gray-600">{order.customerDetails?.address?.postalCode}, {order.customerDetails?.address?.country}</p>
                  </div>
                  <div className="text-right">
                     {/* Optional QR Code placeholder or extra details */}
                  </div>
               </div>

               {/* Tables */}
               <table className="w-full mb-8">
                  <thead>
                     <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Item</th>
                        <th className="text-center py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Qty</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                        <th className="text-right py-3 px-4 text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                     {order.orderedItems.map((item, index) => (
                        <tr key={index}>
                           <td className="py-4 px-4">
                              <p className="font-bold text-sm text-gray-800">{item.itemName}</p>
                              <p className="text-[10px] text-gray-400">ID: {String(item.productId || "").slice(-6)}</p>
                           </td>
                           <td className="py-4 px-4 text-center text-sm font-medium text-gray-600">{item.quantity}</td>
                           <td className="py-4 px-4 text-right text-sm font-medium text-gray-600">₹{item.unitPrice?.toLocaleString()}</td>
                           <td className="py-4 px-4 text-right text-sm font-bold text-gray-900">₹{item.totalPrice?.toLocaleString()}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               {/* Totals */}
               <div className="flex justify-end">
                  <div className="w-64 space-y-3">
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal</span>
                        <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                     </div>
                     <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                     </div>
                     <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                        <span className="font-bold text-gray-900">Total Amount</span>
                        <span className="text-xl font-bold text-primary">₹{totalAmount.toLocaleString()}</span>
                     </div>
                  </div>
               </div>

               {/* Footer */}
               <div className="mt-12 pt-8 border-t border-gray-100 text-center">
                  <p className="text-xl font-serif font-bold text-primary mb-2">Thank you for your business!</p>
                  <p className="text-xs text-gray-400">
                     For support, contact us at support@eleckyo.com or call +91 98765 43210
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default InvoiceModal;
