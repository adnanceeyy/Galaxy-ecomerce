import React from "react";

export default function Profile() {
  return (
    <>
      {/* BACKGROUND */}
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] fixed top-0"></div>

      {/* MAIN CONTAINER */}
      <div className="w-[99.5%] place-self-center h-screen rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-16 md:top-32 p-3 md:p-6 overflow-y-auto shadow-lg mb-60 md:mb-96">

        {/* PROFILE HEADER */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-3xl p-6 shadow">
          <img
            src="https://i.pravatar.cc/150"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold">Adnan Cholayil</h2>
            <p className="text-gray-500">adnan@gmail.com</p>
            <p className="text-sm text-gray-400">Member since 2024</p>
          </div>
          <button className="md:ml-auto bg-black text-white px-6 py-2 rounded-full">
            Edit Profile
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-4 shadow text-center">
            <h3 className="text-2xl font-bold">24</h3>
            <p className="text-gray-500">Orders</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow text-center">
            <h3 className="text-2xl font-bold">12</h3>
            <p className="text-gray-500">Wishlist</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow text-center">
            <h3 className="text-2xl font-bold">5</h3>
            <p className="text-gray-500">Cart Items</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow text-center">
            <h3 className="text-2xl font-bold">9</h3>
            <p className="text-gray-500">Reviews</p>
          </div>
        </div>

        {/* RECENT ORDERS */}
        <div className="bg-white rounded-3xl p-6 shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="flex justify-between border-b py-3 text-sm">
            <span>Running Shoes</span>
            <span>₹2,999</span>
            <span className="font-medium">Delivered</span>
          </div>
          <div className="flex justify-between border-b py-3 text-sm">
            <span>Smart Watch</span>
            <span>₹4,999</span>
            <span className="font-medium">Shipped</span>
          </div>
          <div className="flex justify-between py-3 text-sm">
            <span>T-Shirt</span>
            <span>₹599</span>
            <span className="font-medium">Delivered</span>
          </div>
        </div>

        {/* SAVED ADDRESS */}
        <div className="bg-white rounded-3xl p-6 shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">Saved Address</h3>
          <p className="text-gray-600 leading-relaxed">
            Adnan Cholayil <br />
            Kozhikode, Kerala <br />
            PIN: 673001
          </p>
          <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-full">
            Add New Address
          </button>
        </div>

        {/* ACCOUNT SETTINGS */}
        <div className="bg-white rounded-3xl p-6 shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <p className="py-3 cursor-pointer text-gray-700 hover:font-semibold">
            Change Password
          </p>
          <p className="py-3 cursor-pointer text-gray-700 hover:font-semibold">
            Notification Preferences
          </p>
          <p className="py-3 cursor-pointer text-gray-700 hover:font-semibold">
            Privacy & Security
          </p>
          <p className="py-3 cursor-pointer text-red-500 hover:font-semibold">
            Logout
          </p>
        </div>

      </div>
    </>
  );
}
