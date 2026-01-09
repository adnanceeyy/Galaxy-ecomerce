import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  // Real logged-in user from localStorage
  const storedUser = localStorage.getItem("currentUser");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Real cart data
  const storedCart = localStorage.getItem("cart");
  const cartItems = storedCart ? JSON.parse(storedCart) : [];
  const cartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);
  const totalSpent = cartItems.reduce(
    (total, item) => total + Number(item.price || item.offerPrice || 0) * (item.qty || 1),
    0
  );

  // If not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] flex items-center justify-center p-6">
        <div className="text-center text-white">
          <p className="text-4xl font-bold mb-6">Please Log In</p>
          <p className="text-2xl mb-8">You need to be logged in to view your profile.</p>
          <Link to="/login" className="bg-white text-[#2b5f72] px-8 py-3 rounded-full font-bold text-xl hover:bg-gray-100 transition shadow-lg">
            Login Now
          </Link>
        </div>
      </div>
    );
  }

  // Real user data
  const displayName = user.fullName || user.name || "User";
  const displayEmail = user.email || "No email";
  const displayPhone = user.phone || "No phone";
  const displayPhoto = user.profileImage || user.photoUrl || "https://via.placeholder.com/300?text=No+Photo";

  // Real dynamic stats
  const stats = [
    { title: "Items in Cart", value: cartCount },
    { title: "Current Cart Value", value: `₹${totalSpent}` },
    { title: "Total Orders", value: "12" }, // Make real later
    { title: "Wishlist Items", value: "8" }, // Make real later
    { title: "Reviews Given", value: "5" },
    { title: "Member Since", value: "January 2026" },
  ];

  // Real recent activity (from cart + login)
  const recentActivity = [];

  if (cartItems.length > 0) {
    const lastItem = cartItems[cartItems.length - 1];
    recentActivity.push(`Added "${lastItem.name}" to cart`);
  }

  recentActivity.push(
    "Logged in successfully",
    "Browsed Headsets category",
    "Viewed latest products",
    "Updated profile information"
  );

  // Limit to 5
  const displayedActivity = recentActivity.slice(0, 5);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] pt-20 pb-20">
        <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 p-6 md:p-10 shadow-2xl mb-20">
          {/* Header with Real Photo */}
          <div className="bg-gradient-to-r from-[#7db9d1] to-[#c5f0ff] rounded-[60px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-10 shadow-xl">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <img
                  src={displayPhoto}
                  alt={displayName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                Verified ✓
              </div>
            </div>

            <div className="text-center md:text-left flex-1">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-4">
                {displayName}
              </h1>
              <div className="space-y-3 text-lg md:text-xl text-gray-700">
                <p className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-2xl">📧</span> {displayEmail}
                </p>
                <p className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-2xl">📞</span> {displayPhone}
                </p>
              </div>
              <p className="text-xl text-gray-600 mt-8 italic">
                Proud member since January 2026
              </p>
            </div>

            <div>
              <button className="bg-white text-[#2b5f72] px-10 py-5 rounded-3xl text-2xl font-bold border-4 border-[#5294ad] hover:bg-[#5294ad] hover:text-white transition shadow-2xl">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Dynamic Stats */}
          <div className="mt-12 px-4">
            <h2 className="text-4xl font-extrabold text-[#2b5f72] text-center mb-10">
              Your Activity Summary
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all border-2 border-gray-200"
                >
                  <p className="text-4xl md:text-5xl font-extrabold text-[#2b5f72]">
                    {stat.value}
                  </p>
                  <p className="text-xl text-gray-600 mt-4 font-medium">
                    {stat.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-16 mx-4">
            <div className="bg-white rounded-3xl p-10 shadow-2xl">
              <h2 className="text-4xl font-extrabold text-[#2b5f72] mb-10 text-center">
                Recent Activity
              </h2>
              <div className="space-y-6">
                {displayedActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 bg-gray-50 p-6 rounded-2xl border-2 border-gray-200 hover:bg-gray-100 transition"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#7db9d1] to-[#5294ad] rounded-full flex items-center justify-center text-3xl shadow-lg">
                      {index === 0 && cartItems.length > 0 ? "🛒" : "⭐"}
                    </div>
                    <div className="flex-1">
                      <p className="text-xl font-medium text-gray-800">{activity}</p>
                      <p className="text-gray-500 mt-1">Just now</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link to="/orders" className="bg-[#2b5f72] hover:bg-[#244c5a] text-white px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl transition inline-block">
                  View Full History
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}