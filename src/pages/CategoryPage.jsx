import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { API_URL, BACKEND_BASE, getImageUrl } from "../config/api";
import { IconStarFilled, IconShoppingCart, IconFilter, IconChevronDown } from "@tabler/icons-react";

const CategoryPage = () => {
   const { id } = useParams();
   const [products, setProducts] = useState([]);
   const [category, setCategory] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchCategoryProducts = async () => {
         setLoading(true);
         try {
            let categoryNameFound = "Category";
            let categoryFound = null;

            try {
               const catRes = await axios.get(`${API_URL}/categories/${id}`);
               categoryFound = catRes.data;
               categoryNameFound = categoryFound.name;
               setCategory(categoryFound);
            } catch (e) {
               // If fetch by ID fails, maybe it's a legacy ID? 
               // We will try finding it in the product list directly as a fallback
               console.log("Category lookup failed, trying fallback...", e);
            }

            // 2. Fetch All Products
            const res = await axios.get(`${API_URL}/products`);
            const allProducts = res.data;

            // 3. Filter Logic
            const filtered = allProducts.filter(p =>
               // Match by Name (Primary for new system)
               (p.category && p.category.toLowerCase() === categoryNameFound.toLowerCase()) ||
               // Match by legacy ID (Fallback)
               (p.catogeryId && p.catogeryId == id)
            );

            setProducts(filtered);

            if (filtered.length === 0 && categoryNameFound === "Category") {
               setCategory({ name: "Category Not Found" });
            }

         } catch (err) {
            console.error(err);
         } finally {
            setLoading(false);
         }
      };

      fetchCategoryProducts();
      window.scrollTo(0, 0);
   }, [id]);

   return (
      <div className="bg-gray-50 min-h-screen font-sans pt-8 pb-16">
         <div className="max-w-[1200px] mx-auto px-4 md:px-8">

            {/* Breadcrumb / Header */}
            <div className="mb-6">
               <div className="text-xs text-gray-500 mb-2">Home / Shop / {category?.name || 'Category'}</div>

               {category?.image ? (
                  <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-8 shadow-lg">
                     <img
                        src={getImageUrl(category.image)}
                        alt={category.name}
                        className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-8">
                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">{category.name}</h1>
                        <p className="text-gray-200 mt-2 max-w-xl text-sm md:text-base font-medium">{category.description}</p>
                     </div>
                  </div>
               ) : (
                  <h1 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-2">{category?.name || 'Category'}</h1>
               )}
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

               {/* SIDEBAR FILTERS (Reused Layout) */}
               <aside className="w-full lg:w-56 flex-shrink-0 space-y-6 hidden lg:block">
                  <div>
                     <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">Filters</h3>
                     <p className="text-sm text-gray-500">Filters active for {categoryName}</p>
                     {/* ... reusable filter components... */}
                     <div className="mt-4 space-y-3">
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                           <input type="checkbox" checked className="accent-primary" /> In Stock
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-600">
                           <input type="checkbox" className="accent-primary" /> On Sale
                        </label>
                     </div>
                  </div>
               </aside>

               {/* MAIN PRODUCT GRID */}
               <div className="flex-1">

                  {/* Sort Bar */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                     <div className="text-sm text-gray-500">
                        Found <span className="font-bold text-gray-800">{products.length}</span> items in {categoryName}
                     </div>
                     {/* Sort Select */}
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Sort:</span>
                        <select className="text-sm border-none bg-transparent font-bold focus:ring-0">
                           <option>Featured</option>
                           <option>Price: Low-High</option>
                        </select>
                     </div>
                  </div>

                  {/* Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {loading ? (
                        [...Array(4)].map((_, i) => (
                           <div key={i} className="bg-white rounded-lg h-[350px] animate-pulse"></div>
                        ))
                     ) : (
                        products.map((product) => (
                           <div key={product.id} className="group bg-white rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                              {/* Image */}
                              <Link to={`/singleProduct/${product.id}`} className="relative h-60 p-6 flex items-center justify-center bg-white overflow-hidden">
                                 <img
                                    src={getImageUrl(product.image)}
                                    alt={product.name}
                                    className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                                 />
                                 {/* Hover Actions */}
                                 <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm border-t border-gray-100 flex gap-2 justify-center">
                                    <button className="flex-1 bg-primary text-white py-2 rounded text-xs font-bold hover:bg-secondary transition flex items-center justify-center gap-1">
                                       <IconShoppingCart size={14} /> Buy Now
                                    </button>
                                 </div>
                              </Link>

                              {/* Info */}
                              <div className="p-4 flex-1 flex flex-col border-t border-gray-50 relative z-10 bg-white">
                                 <div className="text-xs text-gray-400 mb-1">{category?.name || 'Category'}</div>
                                 <Link to={`/singleProduct/${product.id}`} className="font-bold text-primary hover:text-accent transition-colors line-clamp-2 mb-2">
                                    {product.name}
                                 </Link>
                                 <div className="mt-auto flex items-center justify-between">
                                    <div className="flex flex-col">
                                       <span className="text-lg font-bold text-primary">₹{product.price}</span>
                                    </div>
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold border border-green-100">
                                       4.2 <IconStarFilled size={10} />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
};

export default CategoryPage;