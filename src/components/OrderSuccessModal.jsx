import React from "react";
import { Link } from "react-router-dom";
import { IconCheck, IconChevronRight, IconShoppingBag, IconPackage } from "@tabler/icons-react";

const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative overflow-hidden animate-slideUp">

                {/* Decorative Top */}
                <div className="h-2 bg-accent w-full"></div>

                <div className="p-8 text-center">
                    {/* Animated Success Icon */}
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 scale-up animate-pulse shadow-inner border border-green-100">
                        <IconCheck size={40} className="text-green-500" stroke={3} />
                    </div>

                    <h2 className="text-3xl font-serif font-bold text-primary mb-2">
                        Order Placed!
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Thank you for your purchase. Your order <span className="font-mono font-bold text-gray-900 bg-gray-50 px-2 py-0.5 rounded">#{orderId?.slice(-8).toUpperCase()}</span> has been placed successfully.
                    </p>

                    <div className="bg-blue-50/50 rounded-xl p-4 mb-8 border border-blue-100 flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary shadow-sm border border-blue-50">
                            <IconPackage size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Next Step</p>
                            <p className="text-xs text-blue-600">You can track your order status in the orders history page.</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            to="/orders"
                            onClick={onClose}
                            className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                        >
                            <IconPackage size={18} /> View My Orders
                        </Link>
                        <Link
                            to="/allProduct"
                            onClick={onClose}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3.5 rounded-xl transition-all border border-gray-200 flex items-center justify-center gap-2"
                        >
                            <IconShoppingBag size={18} /> Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessModal;
