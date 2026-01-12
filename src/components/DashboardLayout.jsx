import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconPackage, IconUserCircle, IconLogout } from "@tabler/icons-react";
import { useAuth } from "./AuthWrapper";

const DashboardLayout = ({ children, activePage }) => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
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
                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50">
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
    </div>
  );
};

export default DashboardLayout;
