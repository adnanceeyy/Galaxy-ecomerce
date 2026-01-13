import React, { useState } from "react";
import { IconCamera } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import DashboardLayout from "../components/DashboardLayout";
import axios from "axios";
import { API_URL } from "../config/api";
import toast from "react-hot-toast";

const Profile = () => {
   const { currentUser } = useAuth();
   const [isEditing, setIsEditing] = useState(false);
   const [formData, setFormData] = useState({
      name: currentUser?.name || currentUser?.fullName || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      address: currentUser?.address || "",
      profileImage: currentUser?.profileImage || null
   });

   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

   // Keep form in sync with loaded user
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
      try {
         const res = await axios.put(`${API_URL}/users/profile/${currentUser._id}`, formData);
         localStorage.setItem("currentUser", JSON.stringify(res.data));
         toast.success("Profile updated successfully!");
         setIsEditing(false);
         setTimeout(() => window.location.reload(), 800);
      } catch (err) {
         console.error("Failed to update profile", err);
         toast.error(err.response?.data?.message || "Failed to update profile");
      }
   };

   if (!currentUser) return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
         <p className="text-gray-500 font-medium">Please log in to view your profile.</p>
      </div>
   );

   return (
      <DashboardLayout activePage="profile">
         <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold font-serif text-gray-900 tracking-tight">My Profile</h1>
            <button
               onClick={() => isEditing ? handleSave() : setIsEditing(true)}
               className={`px-8 py-2.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${isEditing ? "bg-green-600 text-white hover:bg-green-700 shadow-green-100" : "bg-primary text-white hover:bg-secondary shadow-primary/10"}`}
            >
               {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
         </div>

         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">

            <div className="flex flex-col items-center mb-8">
               <div className="w-28 h-28 rounded-full bg-gray-50 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative group">
                  {currentUser?.profileImage || formData.profileImage ? (
                     <img
                        src={formData.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                           e.target.onerror = null;
                           e.target.style.display = 'none';
                           e.target.nextSibling.style.display = 'flex';
                        }}
                     />
                  ) : null}
                  <div
                     className="w-full h-full flex items-center justify-center"
                     style={{ display: (currentUser?.profileImage || formData.profileImage) ? 'none' : 'flex' }}
                  >
                     <span className="text-4xl font-black text-gray-300">{currentUser?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                  {isEditing && (
                     <label className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all">
                        <IconCamera className="text-white" size={28} />
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                     </label>
                  )}
               </div>
               <h2 className="mt-6 text-2xl font-black text-gray-900 tracking-tight">{formData.name}</h2>
               <p className="text-gray-500 font-medium">{currentUser.email}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     disabled={!isEditing}
                     className="w-full border border-gray-100 bg-gray-50/30 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:opacity-70 font-medium text-gray-900"
                  />
               </div>
               <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input
                     type="email"
                     name="email"
                     value={formData.email}
                     onChange={handleChange}
                     disabled
                     className="w-full border border-gray-100 rounded-xl px-5 py-4 bg-gray-50 text-gray-400 cursor-not-allowed font-medium"
                  />
               </div>
               <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Phone Number</label>
                  <input
                     type="tel"
                     name="phone"
                     value={formData.phone}
                     onChange={handleChange}
                     disabled={!isEditing}
                     placeholder="+91"
                     className="w-full border border-gray-100 bg-gray-50/30 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:opacity-70 font-medium text-gray-900"
                  />
               </div>
               <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Shipping Address</label>
                  <input
                     type="text"
                     name="address"
                     value={formData.address}
                     onChange={handleChange}
                     disabled={!isEditing}
                     placeholder="Your default shipping address"
                     className="w-full border border-gray-100 bg-gray-50/30 rounded-xl px-5 py-4 focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all disabled:opacity-70 font-medium text-gray-900"
                  />
               </div>
            </div>
         </div>
      </DashboardLayout>
   );
};

export default Profile;