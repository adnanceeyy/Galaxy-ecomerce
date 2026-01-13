import React, { useState, useEffect } from "react";
import { IconCookie, IconX } from "@tabler/icons-react";

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[200] max-w-sm w-full animate-slideInUp">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-primary group-hover:bg-accent transition-colors"></div>

                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <IconX size={18} />
                </button>

                <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <IconCookie size={28} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 leading-tight">We value your privacy</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic.
                        </p>

                        <div className="flex gap-2 pt-2">
                            <button
                                onClick={handleAccept}
                                className="px-5 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-secondary transition-all shadow-md hover:shadow-primary/20"
                            >
                                Accept All
                            </button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="px-4 py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-100 transition-all"
                            >
                                Customize
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
