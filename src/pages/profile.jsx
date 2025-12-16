import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthWrapper";

export default function Profile() {
  const { handleLogout } = useAuth();

  const [user, setUser] = useState(null);

  // Load logged-in user (with profile image)
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <>
      {/* BACKGROUND */}
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] fixed top-0 left-0 -z-10"></div>

      {/* MAIN CONTAINER */}
      <div className="w-[99.5%] min-h-screen mx-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-16 md:top-32 p-3 md:p-6 overflow-y-auto shadow-lg mb-60 md:mb-96">

        {/* PROFILE HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl p-4 md:p-6 shadow-sm border-b border-gray-100 mb-4">
          <img
            src={user?.profileImage || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-blue-400 object-cover"
          />

          <div className="text-center md:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              {user?.fullName || "User"}
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              {user?.email || ""}
            </p>
            <p className="text-xs md:text-sm text-green-600">
              ✔ Verified Account
            </p>
          </div>

          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition-colors">
            Edit Profile
          </button>
        </div>

        {/* ACCOUNT STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            ["42", "Orders"],
            ["18", "Wishlist"],
            ["₹1,750", "Wallet"],
            ["2,400", "Reward Points"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
            >
              <h3 className="text-lg md:text-xl font-bold text-gray-800">
                {value}
              </h3>
              <p className="text-xs md:text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>

        {/* COUPONS */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-4 border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold mb-3">
            Available Coupons
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>🎉 SAVE10 – Flat 10% OFF</p>
            <p>🎉 FREESHIP – Free Delivery</p>
            <p>🎉 WELCOME20 – 20% OFF</p>
            <p>🎉 FLASH30 – 30% OFF</p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-4 border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold mb-3">
            Recent Orders
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Boat Smart Watch</span>
              <span>₹4,999</span>
              <span className="text-green-600 font-medium">Shipped</span>
            </div>
            <div className="flex justify-between">
              <span>Nike Shoes</span>
              <span>₹2,999</span>
              <span className="text-blue-600 font-medium">Delivered</span>
            </div>
          </div>
        </div>

        {/* WISHLIST */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-4 border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold mb-3">Wishlist</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>❤️ Noise Smart Watch</p>
            <p>❤️ Sony Headphones</p>
            <p>❤️ Apple AirPods</p>
          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm mb-4 border border-gray-100">
          <h3 className="text-base md:text-lg font-semibold mb-3">
            Security
          </h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p>🔐 Two-factor authentication: Enabled</p>
            <p>📧 Email verified</p>
            <p>📱 Mobile verified</p>
          </div>
        </div>

        {/* LOGOUT */}
        <div className="bg-white rounded-2xl p-4 md:p-6 text-center border border-gray-100">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-10 py-3 rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
}
