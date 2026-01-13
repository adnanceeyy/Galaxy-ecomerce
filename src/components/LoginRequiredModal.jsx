import React from "react";
import { useNavigate } from "react-router-dom";
import { IconLock, IconX, IconArrowRight } from "@tabler/icons-react";
import { useAuth } from "./AuthWrapper";

const LoginRequiredModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { setModalTitle } = useAuth();

    if (!isOpen) return null;

    const handleLoginRedirect = () => {
        onClose();
        setModalTitle("Welcome Back");
        navigate("/login");
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl relative overflow-hidden animate-slideInUp">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-primary transition-colors"
                >
                    <IconX size={24} />
                </button>

                <div className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
                        <IconLock size={32} />
                    </div>

                    <h2 className="text-2xl font-serif font-bold text-primary mb-3">
                        Login Required
                    </h2>
                    <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                        Please sign in to your account to add products to your cart and enjoy a personalized shopping experience.
                    </p>

                    <button
                        onClick={handleLoginRedirect}
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                        Sign In Now <IconArrowRight size={18} />
                    </button>

                    <button
                        onClick={onClose}
                        className="mt-4 text-xs text-gray-400 font-bold hover:text-primary uppercase tracking-widest transition-colors"
                    >
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredModal;
