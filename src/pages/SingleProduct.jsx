import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
   IconStarFilled,
   IconShoppingCart,
   IconHeart,
   IconTruckDelivery,
   IconShieldCheck,
   IconMinus,
   IconPlus,
   IconArrowRight,
   IconUser
} from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";
import { API_URL, BACKEND_BASE, getImageUrl } from "../config/api";
import toast from "react-hot-toast";

const SingleProduct = () => {
   const { id } = useParams();
   const [product, setProduct] = useState(null);
   const [relatedProducts, setRelatedProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [qty, setQty] = useState(1);
   const [activeTab, setActiveTab] = useState("description"); // description, specs, reviews

   const { addToCart, isLoggedIn, addToWishlist, isInWishlist } = useAuth();


   useEffect(() => {
      const fetchProduct = async () => {
         setLoading(true);
         try {
            const res = await axios.get(`${API_URL}/products`);
            // Simulate single item fetch by finding in array since filtering happens client side in previous logic
            // In a real app we'd fetch /products/:id
            const found = res.data.find((p) => p.id == id);
            setProduct(found);

            // Get Related Products (Random)
            if (res.data.length > 0) {
               const others = res.data.filter(p => p.id != id);
               const shuffled = others.sort(() => 0.5 - Math.random());
               setRelatedProducts(shuffled.slice(0, 4));
            }
         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };
      fetchProduct();
      window.scrollTo(0, 0);
   }, [id]);

   const [isAdded, setIsAdded] = useState(false);

   const handleAddToCart = () => {
      if (product) {
         addToCart({ ...product, qty });
         setIsAdded(true);
         setTimeout(() => setIsAdded(false), 2000);
      }
   };

   // Image Gallery Logic
   const [activeImage, setActiveImage] = useState(null);
   const [zoomStyles, setZoomStyles] = useState({ display: "none", transformOrigin: "center" });

   const handleMouseMove = (e) => {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.pageX - left - window.scrollX) / width) * 100;
      const y = ((e.pageY - top - window.scrollY) / height) * 100;
      setZoomStyles({
         display: "block",
         transformOrigin: `${x}% ${y}%`,
         transform: "scale(2)"
      });
   };

   const handleMouseLeave = () => {
      setZoomStyles({ display: "none", transformOrigin: "center", transform: "scale(1)" });
   };

   useEffect(() => {
      if (product) {
         setActiveImage(product.image);
      }
   }, [product]);

   // Image Gallery Construction:
   const images = product
      ? (product.images && product.images.length > 0 ? product.images : [product.image])
      : [];

   if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400">Loading details...</div>;
   if (!product) return <div className="min-h-screen bg-gray-50 flex items-center justify-center font-bold text-gray-400">Product Not Found</div>;

   return (
      <div className="bg-white min-h-screen font-sans pt-8 pb-16">
         <div className="max-w-[1200px] mx-auto px-4 md:px-8">

            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6">
               <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/allProduct" className="hover:text-primary">Shop</Link> / <span className="text-gray-900">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

               {/* LEFT: GALLERY */}
               <div className="space-y-4">
                  <div
                     className="w-full h-[400px] md:h-[550px] bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden cursor-zoom-in"
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseLeave}
                  >
                     <img
                        src={getImageUrl(activeImage || product.image)}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-150 ease-out pointer-events-none"
                        style={{
                           transform: zoomStyles.transform,
                           transformOrigin: zoomStyles.transformOrigin
                        }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                     />
                     {product.isNew && (
                        <span className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded z-10">New Arrival</span>
                     )}
                  </div>

                  {/* Thumbnails */}
                  {images.length > 1 && (
                     <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {images.map((img, index) => (
                           <button
                              key={index}
                              onClick={() => setActiveImage(img)}
                              className={`shrink-0 w-20 h-20 rounded-xl border-2 transition-all overflow-hidden p-2 bg-gray-50 ${activeImage === img ? "border-primary bg-white shadow-md shadow-primary/10" : "border-gray-100 hover:border-gray-300"}`}
                           >
                              <img
                                 src={getImageUrl(img)}
                                 alt={`${product.name} ${index + 1}`}
                                 className="w-full h-full object-contain mix-blend-multiply"
                                 onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                              />
                           </button>
                        ))}
                     </div>
                  )}

               </div>

               {/* RIGHT: DETAILS */}
               <div>
                  <div className="mb-4">
                     <h1 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-1 leading-tight">{product.name}</h1>
                     <div className="flex items-center gap-4">
                        <div className="flex items-center text-yellow-500">
                           <IconStarFilled size={18} />
                           <IconStarFilled size={18} />
                           <IconStarFilled size={18} />
                           <IconStarFilled size={18} />
                           <IconStarFilled size={18} className="text-gray-300" />
                        </div>
                        <span className="text-sm text-gray-500">(124 Reviews)</span>
                        <span className="text-sm text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded">In Stock</span>
                     </div>
                  </div>

                  <div className="text-2xl md:text-3xl font-bold text-primary mb-4 flex items-end gap-3">
                     ₹{Number(product.price).toLocaleString()}
                     {product.mrPrice && <span className="text-lg text-gray-400 line-through font-normal mb-1">₹{Number(product.mrPrice).toLocaleString()}</span>}
                  </div>

                  <p className="text-gray-600 leading-relaxed max-w-lg mb-8">
                     {product.description || "Experience premium quality with our flagship product. Designed for performance and built to last. Perfect for professionals and enthusiasts alike."}
                  </p>

                  {/* Actions */}
                  <div className="border-t border-b border-gray-100 py-8 mb-8 space-y-6">

                     {/* Qty & Add to Cart */}
                     <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center border border-gray-300 rounded-lg h-12 w-32">
                           <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><IconMinus size={16} /></button>
                           <input type="text" value={qty} readOnly className="w-full text-center font-bold text-primary border-none focus:ring-0" />
                           <button onClick={() => setQty(qty + 1)} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-primary"><IconPlus size={16} /></button>
                        </div>
                        <button
                           onClick={handleAddToCart}
                           className={`p-3 flex-1 h-12 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${isAdded ? "bg-green-600 hover:bg-green-700 text-white" : "bg-accent hover:bg-accent-hover text-white hover:shadow-accent/40"}`}
                        >
                           {isAdded ? (
                              <>
                                 <IconShieldCheck size={20} /> Added to Cart
                              </>
                           ) : (
                              <>
                                 <IconShoppingCart size={20} /> Add to Cart
                              </>
                           )}
                        </button>
                        <button
                           onClick={() => addToWishlist(product)}
                           className={`h-12 w-12 border rounded-lg flex items-center justify-center transition-colors ${isInWishlist(product.id) ? "border-red-500 text-red-500 bg-red-50" : "border-gray-300 text-gray-500 hover:border-red-500 hover:text-red-500"}`}
                        >
                           <IconHeart size={20} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                        </button>
                     </div>

                     {/* Badges */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                           <div className="p-2 bg-gray-100 rounded-full text-primary"><IconTruckDelivery size={20} /></div>
                           <div>
                              <p className="font-bold text-gray-900">Free Delivery</p>
                              <p className="text-xs">For orders over ₹10k</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                           <div className="p-2 bg-gray-100 rounded-full text-primary"><IconShieldCheck size={20} /></div>
                           <div>
                              <p className="font-bold text-gray-900">2 Year Warranty</p>
                              <p className="text-xs">Full coverage included</p>
                           </div>
                        </div>
                     </div>

                  </div>

                  {/* TABS */}
                  <div>
                     <div className="flex border-b border-gray-200 gap-8 mb-6">
                        {['description', 'specs', 'reviews'].map(tab => (
                           <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`pb-4 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"}`}
                           >
                              {tab}
                           </button>
                        ))}
                     </div>

                     <div className="text-gray-600 leading-relaxed text-sm">
                        {activeTab === 'description' && (
                           <p>{product.productDetailedName || product.description || "No detailed description available."}</p>
                        )}
                        {activeTab === 'specs' && (
                           <ul className="grid grid-cols-1 gap-2">
                              <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="font-bold">Brand</span> <span>Eleckyo</span></li>
                              <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="font-bold">Model</span> <span>{product.name}</span></li>
                              <li className="grid grid-cols-3 border-b border-gray-50 pb-2"><span className="font-bold">Color</span> <span>Black / Silver</span></li>
                           </ul>
                        )}
                        {activeTab === 'reviews' && (
                           <ReviewsSection productId={product.id} />
                        )}
                     </div>
                  </div>
               </div>
            </div>

            {/* RELATED PRODUCTS */}
            {relatedProducts.length > 0 && (
               <div className="mt-20 border-t border-gray-100 pt-16">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8">You Might Also Like</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                     {relatedProducts.map((item) => (
                        <Link to={`/singleProduct/${item.id}`} key={item.id} className="group bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                           <div className="relative h-36 md:h-56 p-4 md:p-6 flex items-center justify-center bg-white overflow-hidden">
                              <img
                                 src={getImageUrl(item.image)}
                                 alt={item.name}
                                 className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                 onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                              />
                              {item.isNew && (
                                 <span className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded">New</span>
                              )}
                           </div>
                           <div className="p-4 border-t border-gray-50">
                              <div className="text-xs text-gray-400 mb-1">{item.category || "Electronics"}</div>
                              <h3 className="font-bold text-primary mb-2 line-clamp-1 group-hover:text-accent transition-colors">{item.name}</h3>
                              <div className="flex items-center justify-between">
                                 <span className="font-bold text-primary">₹{item.price}</span>
                                 <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors">
                                    <IconArrowRight size={16} />
                                 </button>
                              </div>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>
            )}

         </div>
      </div>
   );
};

// Sub-component for Reviews to keep main component clean
const ReviewsSection = ({ productId }) => {
   const [reviews, setReviews] = useState([]);
   const [visibleCount, setVisibleCount] = useState(3);

   // Form State
   const [rating, setRating] = useState(5);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [comment, setComment] = useState("");

   // Load reviews from local storage on mount
   useEffect(() => {
      const stored = localStorage.getItem(`reviews_${productId}`);
      if (stored) {
         setReviews(JSON.parse(stored));
      } else {
         // Default dummy reviews if none exist
         setReviews([
            { id: 1, name: "John Doe", rating: 5, date: "2 days ago", comment: "Excellent product! Highly recommended." },
            { id: 2, name: "Sarah Smith", rating: 4, date: "1 week ago", comment: "Good quality but delivery was a bit slow." },
            { id: 3, name: "Mike Ross", rating: 5, date: "2 weeks ago", comment: "Value for money. Will buy again." },
            { id: 4, name: "Emily Blunt", rating: 3, date: "3 weeks ago", comment: "Average performance. Expected better." },
            { id: 5, name: "David Kim", rating: 5, date: "1 month ago", comment: "Perfect for my needs!" }
         ]);
      }
   }, [productId]);

   const handleSubmit = (e) => {
      e.preventDefault();
      const newReview = {
         id: Date.now(),
         name,
         email,
         rating,
         comment,
         date: "Just now"
      };

      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));

      // Reset form
      setName("");
      setEmail("");
      setComment("");
      setRating(5);
      toast.success("Review submitted successfully!");
   };

   return (
      <div className="space-y-6">
         {/* Review List */}
         <div className="space-y-6">
            {reviews.slice(0, visibleCount).map((rev, i) => (
               <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                     <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold uppercase">
                        {rev.name.charAt(0)}
                     </div>
                     <div>
                        <h4 className="font-bold text-primary text-sm">{rev.name}</h4>
                        <div className="flex text-yellow-500">
                           {[...Array(5)].map((_, j) => (
                              <IconStarFilled key={j} size={12} className={j < rev.rating ? "text-yellow-500" : "text-gray-300"} />
                           ))}
                        </div>
                     </div>
                     <span className="ml-auto text-xs text-gray-400">{rev.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{rev.comment}</p>
               </div>
            ))}
         </div>

         {/* Show More Button */}
         {visibleCount < reviews.length && (
            <div className="text-center pt-2">
               <button
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className="text-primary font-bold text-sm hover:underline"
               >
                  Show More Reviews ({reviews.length - visibleCount} remaining)
               </button>
            </div>
         )}

         {/* Write Review Form */}
         <div className="mt-8 pt-8 border-t border-gray-100">
            <h4 className="font-bold text-lg text-primary mb-4">Write a Review</h4>
            <form className="space-y-4" onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                     type="text"
                     placeholder="Your Name"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-primary"
                     required
                  />
                  <input
                     type="email"
                     placeholder="Your Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-primary"
                     required
                  />
               </div>

               {/* Star Rating Input */}
               <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">Your Rating:</span>
                  <div className="flex gap-1 cursor-pointer">
                     {[1, 2, 3, 4, 5].map(star => (
                        <button
                           key={star}
                           type="button"
                           onClick={() => setRating(star)}
                           className="focus:outline-none transition-transform hover:scale-110"
                        >
                           <IconStarFilled size={20} className={star <= rating ? "text-yellow-500" : "text-gray-300"} />
                        </button>
                     ))}
                  </div>
               </div>

               <div>
                  <textarea
                     placeholder="Your Valuable Review..."
                     rows="4"
                     value={comment}
                     onChange={(e) => setComment(e.target.value)}
                     className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:border-primary"
                     required
                  ></textarea>
               </div>
               <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg font-bold text-sm hover:bg-secondary transition-all">
                  Submit Review
               </button>
            </form>
         </div>
      </div>
   );
};

export default SingleProduct;