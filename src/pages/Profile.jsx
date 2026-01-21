import React, { useState } from "react";
import { IconCamera, IconUser, IconPhone, IconMapPin, IconMail, IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

const Profile = () => {
   const { currentUser, updateUser } = useAuth();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState({
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      profileImage: currentUser?.profileImage || null
   });

   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Keep form in sync when currentUser loads
   React.useEffect(() => {
      if (currentUser) {
         setFormData({
            name: currentUser?.name || "",
            email: currentUser?.email || "",
            phone: currentUser?.phone || "",
            address: currentUser?.address || "",
            profileImage: currentUser?.profileImage || null
         });
      }
   }, [currentUser]);

   const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onloadend = () => {
            setFormData(prev => ({ ...prev, profileImage: reader.result }));
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSave = async () => {
      const pendingToast = toast.loading("Syncing profile data...");
      try {
         const res = await axios.put(`${API_URL}/users/profile/${currentUser._id}`, formData);
         updateUser(res.data); // Update global state
         toast.dismiss(pendingToast);
         toast.success("Profile synchronized successfully! ✨");
         setIsEditing(false);
      } catch (err) {
         console.error("Failed to update profile", err);
         toast.dismiss(pendingToast);
         toast.error(err.response?.data?.message || "Failed to update profile");
      }
   };

   if (!currentUser) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
         <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
         <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Awaiting User Identity...</p>
      </div>
   );

   return (
      <DashboardLayout activePage="profile">
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
               <h1 className="text-3xl font-black text-gray-900 tracking-tight">Identity Management</h1>
               <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">Control your digital presence and delivery data</p>
            </div>
            <button
               onClick={() => isEditing ? handleSave() : setIsEditing(true)}
               className={`group flex items-center gap-3 px-8 py-3.5 rounded-[20px] font-black transition-all duration-300 shadow-xl ${isEditing
                  ? "bg-green-600 text-white hover:bg-green-700 shadow-green-100"
                  : "bg-primary text-white hover:bg-secondary shadow-primary/20"}`}
            >
               {isEditing ? (
                  <><IconDeviceFloppy size={20} /> Deploy Changes</>
               ) : (
                  <><IconEdit size={20} className="group-hover:rotate-12 transition-transform" /> Modify Profile</>
               )}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Avatar & Summary */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-primary/10 to-blue-50"></div>

                  <div className="relative z-10">
                     <div className="w-32 h-32 mx-auto rounded-[40px] bg-white p-1 shadow-2xl relative group/avatar">
                        <div className="w-full h-full rounded-[36px] bg-gray-50 overflow-hidden flex items-center justify-center">
                           {formData.profileImage ? (
                              <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                           ) : (
                              <span className="text-5xl font-black text-primary/20">{formData.name?.charAt(0).toUpperCase()}</span>
                           )}
                        </div>
                        {isEditing && (
                           <label className="absolute inset-1 bg-black/40 backdrop-blur-sm rounded-[36px] flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 animate-fadeIn">
                              <IconCamera className="text-white" size={24} stroke={2.5} />
                              <span className="text-[10px] text-white font-black uppercase mt-1">Update</span>
                              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                           </label>
                        )}
                     </div>

                     <h2 className="mt-6 text-2xl font-black text-gray-900 leading-tight truncate">{formData.name}</h2>
                     <div className="flex items-center justify-center gap-2 mt-2 text-gray-500 font-bold text-sm">
                        <IconMail size={16} />
                        {formData.email}
                     </div>

                     <div className="mt-8 pt-8 border-t border-gray-50 flex justify-center gap-4">
                        <div className="bg-blue-50 px-4 py-2 rounded-2xl">
                           <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Status</p>
                           <p className="text-xs font-black text-blue-600">Verified User</p>
                        </div>
                        <div className="bg-gray-50 px-4 py-2 rounded-2xl">
                           <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Account</p>
                           <p className="text-xs font-black text-gray-600 capitalize">{currentUser.googleId ? 'Google Sync' : 'Direct Sign'}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Detailed Fields */}
            <div className="lg:col-span-8">
               <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-10">
                     <div className="p-3 bg-primary/5 text-primary rounded-2xl">
                        <IconUser size={24} />
                     </div>
                     <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-500">Universal Profile Hub</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                     <div className="space-y-3 group">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">
                           <IconUser size={12} stroke={3} /> Registered Full Name
                        </label>
                        <input
                           type="text"
                           name="name"
                           value={formData.name}
                           onChange={handleChange}
                           disabled={!isEditing}
                           className="w-full border-2 border-gray-50 bg-gray-50/20 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all disabled:opacity-50"
                           placeholder="Enter your full name"
                        />
                     </div>

                     <div className="space-y-3 group">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
                           <IconMail size={12} stroke={3} /> Identity Email (Protected)
                        </label>
                        <input
                           type="email"
                           name="email"
                           value={formData.email}
                           disabled
                           className="w-full border-2 border-gray-50 bg-gray-50 text-gray-400 rounded-[20px] px-6 py-4 font-bold cursor-not-allowed"
                        />
                     </div>

                     <div className="space-y-3 group">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">
                           <IconPhone size={12} stroke={3} /> Communication Uplink
                        </label>
                        <input
                           type="tel"
                           name="phone"
                           value={formData.phone}
                           onChange={handleChange}
                           disabled={!isEditing}
                           placeholder="+91 00000 00000"
                           className="w-full border-2 border-gray-50 bg-gray-50/20 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all disabled:opacity-50"
                        />
                     </div>

                     <div className="space-y-3 group">
                        <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1 group-focus-within:text-primary transition-colors">
                           <IconMapPin size={12} stroke={3} /> Default Logistics Hub
                        </label>
                        <input
                           type="text"
                           name="address"
                           value={formData.address}
                           onChange={handleChange}
                           disabled={!isEditing}
                           placeholder="Full residence or office address"
                           className="w-full border-2 border-gray-100 bg-gray-50/20 rounded-[20px] px-6 py-4 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all disabled:opacity-50"
                        />
                     </div>
                  </div>

                  {isEditing && (
                     <div className="mt-12 p-6 rounded-[28px] bg-blue-50/50 border border-blue-100 animate-scaleIn">
                        <div className="flex gap-4">
                           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shrink-0">
                              <IconEdit size={20} />
                           </div>
                           <p className="text-sm font-medium text-blue-900 leading-relaxed">
                              You are currently in <strong>Modification Mode</strong>. All metadata changes will be synchronized across the cloud infrastructure upon deployment.
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;