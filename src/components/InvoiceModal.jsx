import React, { useRef, useState } from "react";
import { IconPrinter, IconX, IconBrandWhatsapp } from "@tabler/icons-react";

const InvoiceModal = ({ order, onClose }) => {
   const printRef = useRef();
   const [printSize, setPrintSize] = useState("80mm"); // Default to 80mm

   const handlePrint = () => {
      const isThermal = printSize === "80mm";
      const printContent = printRef.current.innerHTML;

      const printWindow = window.open('', '', 'height=800,width=800');
      printWindow.document.write('<html><head><title>Invoice</title>');
      printWindow.document.write('<script src="https://cdn.tailwindcss.com"></script>');
      printWindow.document.write(`
         <style>
            @page { 
               size: ${isThermal ? '80mm auto' : 'auto'}; 
               margin: 0; 
            }
            body { 
               margin: 0; 
               padding: ${isThermal ? '0' : '20px'}; 
               font-family: sans-serif; 
            }
            @media print {
               .no-print { display: none; }
               ${isThermal ? `
                  body { width: 80mm; }
                  .thermal-container { 
                     width: 80mm; 
                     padding: 5mm;
                     box-sizing: border-box;
                  }
               ` : ''}
            }
         </style>
      `);
      printWindow.document.write('</head><body>');
      printWindow.document.write(`<div class="${isThermal ? 'thermal-container' : ''}">`);
      printWindow.document.write(printContent);
      printWindow.document.write('</div>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      setTimeout(() => {
         printWindow.print();
         printWindow.close();
      }, 1000);
   };

   if (!order) return null;

   const totalAmount = order.paymentSummary?.total || order.totalAmount || 0;
   const subtotal = order.paymentSummary?.subtotal || (order.orderedItems?.reduce((acc, item) => acc + item.totalPrice, 0) || 0);
   const shipping = order.paymentSummary?.shipping || 0;

   // Render functions for different parts to keep it clean
   const StandardLayout = () => (
      <div className="p-8">
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
            <p className="text-xs text-gray-400">For support, contact us at support@eleckyo.com</p>
         </div>
      </div>
   );

   const ThermalLayout = () => (
      <div className="p-4 bg-white" style={{ width: '80mm', margin: '0 auto', color: '#000' }}>
         <div className="text-center border-b border-dashed border-black pb-3 mb-3">
            <h1 className="text-lg font-bold">ELECKYO</h1>
            <p className="text-[10px]">Premium Electronics Store</p>
            <p className="text-[10px]">123 Tech Park, Digital City</p>
            <p className="text-[10px] font-bold">INV: #{String(order.id || order._id || "").slice(-8).toUpperCase()}</p>
         </div>

         <div className="text-[10px] mb-3 border-b border-dashed border-black pb-2">
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
            <p><strong>Customer:</strong> {order.customerDetails?.name}</p>
            <p><strong>Phone:</strong> {order.customerDetails?.phone}</p>
         </div>

         <table className="w-full text-[10px] mb-3">
            <thead className="border-b border-black">
               <tr>
                  <th className="text-left py-1">Item</th>
                  <th className="text-center py-1">Qty</th>
                  <th className="text-right py-1">Total</th>
               </tr>
            </thead>
            <tbody>
               {order.orderedItems.map((item, index) => (
                  <tr key={index}>
                     <td className="py-1 break-words">{item.itemName}</td>
                     <td className="text-center py-1">{item.quantity}</td>
                     <td className="text-right py-1">₹{item.totalPrice}</td>
                  </tr>
               ))}
            </tbody>
         </table>

         <div className="text-[10px] border-t border-dashed border-black pt-2 space-y-1">
            <div className="flex justify-between">
               <span>Subtotal:</span>
               <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
               <span>Shipping:</span>
               <span>{shipping === 0 ? "0" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-bold text-xs pt-1">
               <span>TOTAL:</span>
               <span>₹{totalAmount.toLocaleString()}</span>
            </div>
         </div>

         <div className="mt-4 text-center text-[9px]">
            <p className="font-bold">Thank You for Shopping!</p>
            <p>Visit again @ eleckyo.com</p>
         </div>
      </div>
   );

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

         <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50/50 rounded-t-2xl">
               <div className="flex items-center gap-4">
                  <h3 className="font-bold text-lg text-gray-800">Invoice</h3>
                  <div className="flex bg-gray-200 rounded-lg p-1">
                     <button
                        onClick={() => setPrintSize("80mm")}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${printSize === "80mm" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                     >80mm (Thermal)</button>
                     <button
                        onClick={() => setPrintSize("Standard")}
                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${printSize === "Standard" ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                     >Standard (A4)</button>
                  </div>
               </div>
               <div className="flex gap-3">
                  <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-secondary transition">
                     <IconPrinter size={18} /> Print {printSize}
                  </button>
                  <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-500">
                     <IconX size={20} />
                  </button>
               </div>
            </div>

            <div className="overflow-y-auto p-4 md:p-8 custom-scrollbar bg-gray-100/30 flex justify-center">
               <div className={`bg-white shadow-lg border border-gray-100 ${printSize === "80mm" ? "w-[80mm]" : "w-full"}`} ref={printRef}>
                  {printSize === "80mm" ? <ThermalLayout /> : <StandardLayout />}
               </div>
            </div>
         </div>
      </div>
   );
};

export default InvoiceModal;

