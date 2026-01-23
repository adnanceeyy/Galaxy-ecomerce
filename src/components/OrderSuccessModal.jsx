import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    IconCheck,
    IconPackage,
    IconArrowRight,
    IconShoppingBag,
    IconCircleCheckFilled,
    IconCopy,
    IconCopyCheck,
    IconReceipt,
    IconTruckDelivery
} from "@tabler/icons-react";
import toast from "react-hot-toast";

const OrderSuccessModal = ({ isOpen, onClose, orderId }) => {
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShowConfetti(true);
            const timer = setTimeout(() => setShowConfetti(false), 8000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleCopyId = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!orderId) return;
        navigator.clipboard.writeText(orderId);
        setCopied(true);
        toast.success("Order ID copied!");
        setTimeout(() => setCopied(false), 2000);
    };

    const handleNavigation = (path) => {
        // CLOSE FIRST to ensure a clean transition
        if (onClose) onClose();

        // Use a tiny timeout to let the modal closing animation begin if any,
        // then navigate to the new page.
        setTimeout(() => {
            navigate(path);
            window.scrollTo({ top: 0, behavior: 'instant' });
        }, 50);
    };

    if (!isOpen) return null;

    const displayId = orderId?.slice(-10).toUpperCase() || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Elegant Background Overlay */}
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-[16px] animate-fadeIn" onClick={onClose} />

            {/* Confetti Particles */}
            {showConfetti && (
                <div className="absolute inset-0 pointer-events-none z-10">
                    {[...Array(50)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2.5 h-2.5 rounded-full animate-confetti"
                            style={{
                                backgroundColor: ['#3eb8d4', '#0d4f5f', '#1a7a92', '#f59e0b', '#10b981', '#ffffff'][i % 6],
                                left: `${Math.random() * 100}%`,
                                top: `-5%`,
                                animationDelay: `${Math.random() * 4}s`,
                                animationDuration: `${3 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            )}

            <div
                className="bg-white w-full max-w-sm rounded-[40px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.3)] relative overflow-hidden animate-modalEntrance z-20 border border-white/20"
                onClick={(e) => e.stopPropagation()}
            >

                {/* Compact Modern Header */}
                <div className="h-32 bg-gradient-to-br from-primary via-secondary to-accent relative flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,_rgba(255,255,255,0.4)_1px,_transparent_0)] bg-[size:20px_20px]"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center animate-trophyFloat ring-4 ring-white/10">
                            <IconCircleCheckFilled size={40} className="text-secondary" />
                        </div>
                        <div className="w-12 h-3 bg-black/10 rounded-full mx-auto mt-3 blur-md animate-shadowScale"></div>
                    </div>
                </div>

                <div className="px-6 pb-10 pt-8 text-center">
                    {/* Compact Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100 mb-5 animate-fadeIn">
                        <IconCheck size={12} className="stroke-[3]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.15em] font-sans">Verified</span>
                    </div>

                    <h2 className="text-2xl font-black text-primary mb-2 tracking-tight font-sans">
                        Order Successful!
                    </h2>

                    <p className="text-gray-500 font-medium mb-8 max-w-[240px] mx-auto text-xs leading-relaxed">
                        We're processing your order. A confirmation email has been sent to your inbox.
                    </p>

                    {/* Compact Order Reference Card */}
                    <div className="bg-gray-50/80 rounded-[32px] p-4 mb-8 border border-gray-100 transition-all hover:bg-white hover:shadow-xl group">
                        <div className="flex flex-col items-center gap-3">
                            <div className="flex items-center justify-between w-full text-gray-400 px-1">
                                <span className="text-[8px] font-black uppercase tracking-wider font-sans">Reference</span>
                                <IconReceipt size={12} stroke={1.5} />
                            </div>

                            <div className="flex items-center gap-3 py-0.5">
                                <span className="text-xl font-black text-primary tracking-tight font-sans">#{displayId}</span>
                                <button
                                    onClick={handleCopyId}
                                    className={`p-2 rounded-xl transition-all ${copied ? 'bg-green-500 text-white scale-110' : 'bg-white shadow-sm text-gray-400 hover:text-primary'}`}
                                >
                                    {copied ? <IconCopyCheck size={14} /> : <IconCopy size={14} />}
                                </button>
                            </div>

                            <div className="w-full h-px bg-gray-100/50 mt-1" />

                            <div className="w-full flex items-center justify-between px-2 pt-1 text-[9px] font-bold text-gray-400">
                                <div className="flex items-center gap-1">
                                    <IconTruckDelivery size={12} className="text-blue-500" /> Transit
                                </div>
                                <div className="flex items-center gap-1">
                                    <IconPackage size={12} className="text-orange-500" /> Secure
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Hub - Compact Stack */}
                    <div className="space-y-3">
                        <button
                            onClick={() => handleNavigation('/orders')}
                            className="w-full bg-primary hover:bg-secondary text-white font-black py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/10 flex items-center justify-center gap-2 active:scale-95 group relative overflow-hidden"
                        >
                            <span className="text-[11px] uppercase tracking-wider relative z-10">Track My Order</span>
                            <IconArrowRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform" />
                        </button>

                        <button
                            onClick={() => handleNavigation('/allProduct')}
                            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 border-2 border-gray-100 group"
                        >
                            <IconShoppingBag size={18} className="text-primary" />
                            <span className="text-[11px] uppercase tracking-wider">Keep Shopping</span>
                        </button>
                    </div>

                    <button
                        onClick={onClose}
                        className="mt-6 text-[8px] font-black text-gray-300 uppercase tracking-[0.3em] hover:text-primary transition-colors py-2"
                    >
                        Dismiss
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(115vh) rotate(720deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti linear infinite;
                }
                .animate-trophyFloat {
                    animation: trophyFloat 3s infinite ease-in-out;
                }
                @keyframes trophyFloat {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(2deg); }
                }
                .animate-shadowScale {
                    animation: shadowScale 3s infinite ease-in-out;
                }
                @keyframes shadowScale {
                    0%, 100% { transform: scale(1); opacity: 0.15; }
                    50% { transform: scale(1.4); opacity: 0.05; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }
                .animate-modalEntrance {
                    animation: modalEntrance 0.7s cubic-bezier(0.23, 1, 0.32, 1);
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalEntrance {
                    from { transform: translateY(60px) scale(0.92); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccessModal;
