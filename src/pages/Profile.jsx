import React, { useState, useEffect } from "react";
import { IconCamera, IconUser, IconPhone, IconMapPin, IconMail, IconDeviceFloppy, IconEdit, IconShieldCheck, IconLink } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { API_URL, getImageUrl } from "../config/api";
import toast from "react-hot-toast";

const Profile = () => {
   const { currentUser, updateUser } = useAuth();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      profileImage: null
   });

   // Sync form in sync when currentUser loads or updates
   useEffect(() => {
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

   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
         // Limit size to 2MB for safety
         if (file.size > 2 * 1024 * 1024) {
            toast.error("Image too large. Please select a file under 2MB.");
            return;
         }
         const reader = new FileReader();
         reader.onloadend = () => {
            setFormData(prev => ({ ...prev, profileImage: reader.result }));
         };
         reader.readAsDataURL(file);
      }
   };

   const handleSave = async () => {
      if (!currentUser?._id) {
         toast.error("User identity missing. Please re-login.");
         return;
      }

      const pendingToast = toast.loading("Deploying changes to cloud...");
      try {
         // Use the exact ID from current user
         const res = await axios.put(`${API_URL}/users/profile/${currentUser._id}`, formData);

         // The res.data now contains full user object + fresh token
         updateUser(res.data);

         toast.dismiss(pendingToast);
         toast.success("Profile synchronized successfully! ✨");
         setIsEditing(false);
      } catch (err) {
         console.error("Profile Sync Error:", err);
         toast.dismiss(pendingToast);
         const errorMsg = err.response?.data?.message || "Cloud synchronization failed";
         toast.error(errorMsg);
      }
   };

   if (!currentUser) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-6">
         <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-2xl animate-spin"></div>
         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Verifying Identity...</p>
      </div>
   );

   return (
      <DashboardLayout activePage="profile">
         {/* Premium Header */}
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Security Level: High</span>
               </div>
               <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase leading-none">Identity Matrix</h1>
               <p className="text-gray-400 text-[11px] font-bold uppercase tracking-widest mt-2 px-1">Manage your global profile and logistics telemetry</p>
            </div>

            <button
               onClick={() => isEditing ? handleSave() : setIsEditing(true)}
               className={`group flex items-center gap-3 px-10 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all duration-500 shadow-2xl active:scale-95 ${isEditing
                  ? "bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20"
                  : "bg-primary text-white hover:bg-secondary shadow-primary/20"}`}
            >
               {isEditing ? (
                  <><IconDeviceFloppy size={18} stroke={3} /> Deploy Changes</>
               ) : (
                  <><IconEdit size={18} stroke={3} className="group-hover:rotate-12 transition-transform" /> Modify Profile</>
               )}
            </button>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Profile Avatar Card */}
            <div className="lg:col-span-4 space-y-6">
               <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 border border-white p-10 text-center relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-br from-primary/5 via-blue-50/10 to-transparent"></div>

                  <div className="relative z-10">
                     <div className="w-40 h-40 mx-auto rounded-[48px] bg-white p-1.5 shadow-2xl relative group/avatar ring-1 ring-gray-100">
                        <div className="w-full h-full rounded-[42px] bg-gray-50 overflow-hidden flex items-center justify-center">
                           {formData.profileImage ? (
                              <img src={getImageUrl(formData.profileImage)} alt="Profile" className="w-full h-full object-cover" />
                           ) : (
                              <div className="flex flex-col items-center gap-2 opacity-20">
                                 <IconUser size={64} stroke={1} />
                                 <span className="text-xs font-black uppercase tracking-widest">No Bio ID</span>
                              </div>
                           )}
                        </div>
                        {isEditing && (
                           <label className="absolute inset-1.5 bg-black/60 backdrop-blur-md rounded-[42px] flex flex-col items-center justify-center cursor-pointer opacity-0 group-hover/avatar:opacity-100 transition-all duration-500 border-2 border-dashed border-white/30">
                              <IconCamera className="text-white mb-2" size={28} stroke={2.5} />
                              <span className="text-[9px] text-white font-black uppercase tracking-widest">Update Bio-ID</span>
                              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                           </label>
                        )}
                     </div>

                     <h2 className="mt-8 text-2xl font-black text-gray-900 tracking-tight uppercase">{formData.name || 'Anonymous User'}</h2>
                     <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mt-3 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
                        <IconMail size={12} />
                        {formData.email}
                     </div>

                     <div className="mt-10 pt-10 border-t border-gray-100 grid grid-cols-2 gap-4">
                        <div className="bg-emerald-50/50 border border-emerald-100 px-4 py-3 rounded-2xl">
                           <IconShieldCheck size={16} className="text-emerald-500 mb-2 mx-auto" />
                           <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest leading-none">Status</p>
                           <p className="text-[11px] font-black text-emerald-900 mt-1">Verified</p>
                        </div>
                        <div className="bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-2xl">
                           <IconLink size={16} className="text-blue-500 mb-2 mx-auto" />
                           <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest leading-none">Uplink</p>
                           <p className="text-[11px] font-black text-blue-900 mt-1 capitalize">{currentUser.googleId ? 'Google' : 'Direct'}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {/* Profile Fields Card */}
            <div className="lg:col-span-8">
               <div className="bg-white rounded-[48px] shadow-2xl shadow-gray-200/50 border border-white p-10 md:p-12">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                        <IconUser size={24} stroke={2.5} />
                     </div>
                     <div>
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-gray-900 leading-none">Core Identity Matrix</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1.5">Universal data synchronization encrypted</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                     {/* Name */}
                     <div className="space-y-4 group">
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 transition-colors ${isEditing ? 'text-primary' : 'text-gray-400'}`}>
                           Full Identity Name
                        </label>
                        <div className="relative">
                           <IconUser size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                           <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              disabled={!isEditing}
                              className={`w-full border-2 pl-16 pr-8 py-5 rounded-[24px] font-black text-sm tracking-tight transition-all focus:outline-none focus:ring-8 focus:ring-primary/5 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-primary`}
                              placeholder="User Entity Name"
                           />
                        </div>
                     </div>

                     {/* Email */}
                     <div className="space-y-4">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] pl-1">
                           Protected Uplink (Email)
                        </label>
                        <div className="relative">
                           <IconMail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                           <input
                              type="email"
                              value={formData.email}
                              disabled
                              className="w-full border-2 border-gray-100 bg-gray-100/30 text-gray-400 rounded-[24px] pl-16 pr-8 py-5 font-black text-sm cursor-not-allowed uppercase tracking-tighter"
                           />
                        </div>
                     </div>

                     {/* Phone */}
                     <div className="space-y-4 group">
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 transition-colors ${isEditing ? 'text-primary' : 'text-gray-400'}`}>
                           Communication Link
                        </label>
                        <div className="relative">
                           <IconPhone size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                           <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={!isEditing}
                              placeholder="+91 00000 00000"
                              className={`w-full border-2 pl-16 pr-8 py-5 rounded-[24px] font-black text-sm tracking-tight transition-all focus:outline-none focus:ring-8 focus:ring-primary/5 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-primary`}
                           />
                        </div>
                     </div>

                     {/* Address */}
                     <div className="space-y-4 group">
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] pl-1 transition-colors ${isEditing ? 'text-primary' : 'text-gray-400'}`}>
                           Logistics Destination Hub
                        </label>
                        <div className="relative">
                           <IconMapPin size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" />
                           <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              disabled={!isEditing}
                              placeholder="Full Logistics Address"
                              className={`w-full border-2 pl-16 pr-8 py-5 rounded-[24px] font-black text-sm tracking-tight transition-all focus:outline-none focus:ring-8 focus:ring-primary/5 bg-gray-50/50 border-gray-100 focus:bg-white focus:border-primary`}
                           />
                        </div>
                     </div>
                  </div>

                  {isEditing && (
                     <div className="mt-12 p-8 rounded-[32px] bg-primary/5 border border-primary/10 animate-slideUp relative overflow-hidden group/alert">
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover/alert:opacity-[0.1] transition-opacity">
                           <IconShieldCheck size={120} stroke={1} />
                        </div>
                        <div className="flex gap-6 relative z-10">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl shrink-0">
                              <IconEdit size={24} stroke={2.5} />
                           </div>
                           <div>
                              <h4 className="text-sm font-black uppercase tracking-tight text-primary">Modification Mode Active</h4>
                              <p className="text-[11px] font-bold text-gray-500 leading-relaxed mt-1">
                                 You are altering your global identity markers. Once you click <strong>Deploy Changes</strong>, your metadata will be synchronized across our distributed cloud infrastructure instantly.
                              </p>
                           </div>
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