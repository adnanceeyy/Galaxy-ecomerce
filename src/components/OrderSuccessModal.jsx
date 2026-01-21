import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconCheck, IconPackage, IconArrowRight, IconShoppingBag, IconReceipt2, IconCircleCheckFilled } from "@tabler/icons-react";

const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 6000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6 bg-primary/10 backdrop-blur-[12px] animate-fadeIn overflow-hidden">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>

            {/* Confetti Particles */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full animate-confetti`}
                            style={{
                                backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
                                left: `${Math.random() * 100}%`,
                                top: `-5%`,
                                animationDelay: `${Math.random() * 4}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="bg-white/90 w-full max-w-lg rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] relative overflow-hidden animate-slideUp border border-white/50 backdrop-blur-xl">

                {/* Cyberpunk Style Header */}
                <div className="h-40 bg-linear-to-br from-primary via-blue-600 to-indigo-700 relative flex items-center justify-center overflow-hidden">
                    {/* Animated Circuit Pattern Background */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.4)_1px,_transparent_0)] bg-[size:24px_24px]"></div>

                    {/* Floating Glow */}
                    <div className="absolute w-40 h-40 bg-white/30 rounded-full blur-3xl animate-pulse"></div>

                    <div className="relative transform -translate-y-2">
                        <div className="w-24 h-24 bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center justify-center animate-bounce-premium relative z-10">
                            <IconCircleCheckFilled size={56} className="text-primary" />
                        </div>
                        {/* Shadow element for the bounce effect */}
                        <div className="w-16 h-4 bg-black/10 rounded-full mx-auto mt-4 blur-md animate-shadowScale"></div>
                    </div>
                </div>

                <div className="px-8 md:px-12 pb-14 pt-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-50 text-green-600 border border-green-100 mb-6 animate-fadeIn">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                        <span className="text-[10px] font-black uppercase tracking-widest">System Sync Complete</span>
                    </div>

                    <h2 className="text-4xl font-black text-gray-900 mb-3 tracking-tighter leading-none">
                        Order Confirmed
                    </h2>

                    <p className="text-gray-500 font-bold mb-10 max-w-sm mx-auto leading-relaxed">
                        Your transaction has been processed. Reference ID for tracking:
                        <span className="block mt-2 font-black text-primary bg-primary/5 px-4 py-2 rounded-2xl text-base border border-primary/5">
                            #{orderId?.slice(-8).toUpperCase() || 'E-LCK-8924'}
                        </span>
                    </p>

                    {/* Order Condition Display */}
                    <div className="bg-gray-50/50 rounded-[32px] p-6 mb-10 border border-gray-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                            <IconReceipt2 size={48} />
                        </div>

                        <div className="flex items-center gap-5 relative z-10">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg border border-gray-50">
                                <IconPackage size={28} stroke={1.5} />
                            </div>
                            <div className="text-left">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Current Condition</p>
                                <p className="text-lg font-black text-gray-800 leading-none">Awaiting Logistic Dispatch</p>
                                <p className="text-[10px] text-primary font-bold mt-1 uppercase tracking-wider">Scheduled for priority processing</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Hub */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/orders"
                            onClick={onClose}
                            className="flex-[1.2] bg-primary hover:bg-secondary text-white font-black py-5 rounded-[24px] transition-all duration-300 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-95 group relative overflow-hidden"
                        >
                            <span className="relative z-10">View My Orders</span>
                            <IconArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </Link>

                        <Link
                            to="/allProduct"
                            onClick={onClose}
                            className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-black py-5 rounded-[24px] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 border-2 border-gray-100 hover:border-gray-200 group"
                        >
                            <IconShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
                            <span>Shop More</span>
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti linear infinite;
                }
                .animate-bounce-premium {
                    animation: bouncePremium 2s infinite ease-in-out;
                }
                @keyframes bouncePremium {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                .animate-shadowScale {
                    animation: shadowScale 2s infinite ease-in-out;
                }
                @keyframes shadowScale {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.3); opacity: 0.05; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .animate-slideUp {
                    animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(60px) scale(0.9); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccessModal;
