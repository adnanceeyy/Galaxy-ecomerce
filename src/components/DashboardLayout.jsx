import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconPackage, IconUserCircle, IconLogout, IconAlertTriangle } from "@tabler/icons-react";
import { useAuth } from "./AuthWrapper";

const DashboardLayout = ({ children, activePage }) => {
   const { logout, currentUser } = useAuth();
   const navigate = useNavigate();
   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

   const confirmLogout = () => {
      logout();
      navigate("/login");
   };

   return (
      <div className="bg-gray-50 min-h-[70vh] pt-6 pb-12 font-sans">
         <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-8">

               {/* Sidebar */}
               <aside className="w-full lg:w-60 flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
                     <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg overflow-hidden shadow-inner">
                           {currentUser?.profileImage ? (
                              <img src={currentUser.profileImage} alt="Profile" className="w-full h-full object-cover" />
                           ) : (
                              currentUser?.name?.charAt(0).toUpperCase() || "U"
                           )}
                        </div>
                        <div className="min-w-0">
                           <p className="font-bold text-gray-900 truncate">{currentUser?.name || "User"}</p>
                           <p className="text-xs text-gray-500 truncate">{currentUser?.email}</p>
                        </div>
                     </div>
                     <nav className="p-2 space-y-1">
                        <Link to="/profile" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === 'profile' ? "bg-primary text-white shadow-md font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-primary"}`}>
                           <IconUserCircle size={20} /> <span className="text-sm tracking-wide">My Profile</span>
                        </Link>
                        <Link to="/orders" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${activePage === 'orders' ? "bg-primary text-white shadow-md font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-primary"}`}>
                           <IconPackage size={20} /> <span className="text-sm tracking-wide">My Orders</span>
                        </Link>
                        <div className="pt-2 mt-2 border-t border-gray-100">
                           <button onClick={() => setShowLogoutConfirm(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50">
                              <IconLogout size={20} /> <span className="text-sm font-bold tracking-wide">Logout</span>
                           </button>
                        </div>
                     </nav>
                  </div>
               </aside>

               {/* Content */}
               <main className="flex-1">
                  {children}
               </main>
            </div>
         </div>

         {/* Logout Confirmation Modal */}
         {showLogoutConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
               <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full animate-scaleIn text-center border border-gray-100">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
                     <IconAlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Logout</h3>
                  <p className="text-gray-500 mb-8 text-sm">Are you sure you want to log out of your account?</p>

                  <div className="flex gap-3">
                     <button
                        onClick={() => setShowLogoutConfirm(false)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-bold hover:bg-gray-50 transition"
                     >
                        Cancel
                     </button>
                     <button
                        onClick={confirmLogout}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition shadow-lg shadow-red-200"
                     >
                        Logout
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default DashboardLayout;
