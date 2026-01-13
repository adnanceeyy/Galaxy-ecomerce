import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE } from "../config/api";
import { IconTrash, IconShoppingCart, IconHeartFilled } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";

const WishlistPage = () => {
   const { wishlist, addToWishlist, addToCart } = useAuth();

   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <div className="bg-gray-50 min-h-screen font-sans py-12">
         <div className="max-w-[1200px] mx-auto px-4 md:px-8">

            <div className="flex items-center gap-2 mb-6">
               <IconHeartFilled size={24} className="text-red-500" />
               <h1 className="text-2xl font-serif font-bold text-primary">My Wishlist</h1>
            </div>

            {wishlist.length === 0 ? (
               <div className="bg-white rounded-2xl p-16 text-center shadow-sm border border-gray-100">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                     <IconHeartFilled size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-primary mb-2">Your wishlist is empty</h2>
                  <p className="text-gray-500 mb-8">Seems like you haven't liked any products yet.</p>
                  <Link to="/allProduct" className="px-8 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition">
                     Start Shopping
                  </Link>
               </div>
            ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {wishlist.map((product) => (
                     <div key={product.id} className="bg-white rounded-lg border border-gray-100 overflow-hidden group hover:shadow-lg transition-all duration-300">
                        <div className="relative h-60 p-6 flex items-center justify-center bg-white overflow-hidden">
                           <img
                              src={`${BACKEND_BASE}${product.image}`}
                              alt={product.name}
                              className="h-full w-full object-contain"
                              onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                           />
                           <button
                              onClick={() => addToWishlist(product)}
                              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                              title="Remove from Wishlist"
                           >
                              <IconTrash size={16} />
                           </button>
                        </div>

                        <div className="p-4 border-t border-gray-50">
                           <div className="text-xs text-gray-400 mb-1">{product.category || "Electronics"}</div>
                           <Link to={`/singleProduct/${product.id}`} className="block font-bold text-primary text-lg mb-2 line-clamp-1 hover:text-accent transition-colors">
                              {product.name}
                           </Link>
                           <div className="flex items-center justify-between mt-4">
                              <span className="text-lg font-bold text-primary">₹{product.price}</span>
                              <button
                                 onClick={() => {
                                    addToCart(product);
                                    // Optional: Remove from wishlist after adding to cart?
                                    // addToWishlist(product); 
                                    alert("Moved to cart!"); // Keeping alert simple here or use toast
                                 }}
                                 className="px-3 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded text-xs font-bold transition flex items-center gap-1"
                              >
                                 <IconShoppingCart size={14} /> Add Pattern
                              </button>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            )}

         </div>
      </div>
   );
};

export default WishlistPage;
