import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import { IconFilter, IconChevronDown, IconStarFilled, IconShoppingCart } from "@tabler/icons-react";
import { useAuth } from "../components/AuthWrapper";

const AllProducts = () => {
  const { addToCart } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter States
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [activeRating, setActiveRating] = useState(0);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  
  // Backend Base
  const backendBase = import.meta.env.VITE_BACKEND_URL
    ? import.meta.env.VITE_BACKEND_URL.replace("/api", "")
    : "http://localhost:5000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  // Search and Filter logic
  useEffect(() => {
    let result = [...products];

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (activeFilter !== "All") {
      result = result.filter(p => p.category === activeFilter);
    }

    if (activeRating > 0) {
      result = result.filter(p => (p.rating || 4.5) >= activeRating);
    }

    if (minPrice !== "") {
      result = result.filter(p => Number(p.price) >= Number(minPrice));
    }

    if (maxPrice !== "") {
      result = result.filter(p => Number(p.price) <= Number(maxPrice));
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, activeFilter, products, minPrice, maxPrice, activeRating]);

  /* Pagination Logic */
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Sorting Logic */
  const [sortOption, setSortOption] = useState("Newest Arrivals");

  const handleSort = (e) => {
     const value = e.target.value;
     setSortOption(value);

     let sorted = [...products];
     if (value === "Price: Low to High") {
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
     } else if (value === "Price: High to Low") {
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
     } else if (value === "Newest Arrivals") {
        sorted.sort((a, b) => b.id - a.id); // Assuming simple ID-based recency
     }
     // For "Best Selling", we could shuffle or use another metric
     setProducts(sorted);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans pt-8 pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Breadcrumb / Header */}
        <div className="mb-6">
           <div className="text-xs text-gray-500 mb-1">Home / Shop</div>
           <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary">All Products</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           
           {/* SIDEBAR FILTERS (Hidden on mobile for simplicity in this iteration, or stacked) */}
           <aside className="w-full lg:w-56 flex-shrink-0 space-y-6 hidden lg:block">
              {/* Categories */}
              <div>
                 <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">Categories</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    {['All', 'Headphones', 'Laptops', 'Tablets', 'Gaming', 'Cameras', 'Accessories'].map(cat => (
                       <li 
                         key={cat} 
                         onClick={() => setActiveFilter(cat)}
                         className={`hover:text-accent cursor-pointer flex items-center justify-between transition-colors ${activeFilter === cat ? "text-accent font-bold" : ""}`}
                       >
                          <span>{cat}</span>
                          <span className="text-gray-400 text-xs">
                             ({cat === "All" ? products.length : products.filter(p => p.category === cat).length})
                          </span>
                       </li>
                    ))}
                  </ul>
              </div>

              {/* Price Range */}
              <div>
                 <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">Price</h3>
                 <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                       <input 
                         type="number" 
                         placeholder="Min" 
                         value={minPrice}
                         onChange={(e) => setMinPrice(e.target.value)}
                         className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-accent" 
                       />
                       <span className="text-gray-400">-</span>
                       <input 
                         type="number" 
                         placeholder="Max" 
                         value={maxPrice}
                         onChange={(e) => setMaxPrice(e.target.value)}
                         className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-accent" 
                       />
                    </div>
                    {(minPrice || maxPrice || activeRating > 0 || activeFilter !== "All") && (
                       <button 
                         onClick={() => {
                            setMinPrice("");
                            setMaxPrice("");
                            setActiveRating(0);
                            setActiveFilter("All");
                         }}
                         className="text-xs text-accent font-bold hover:underline text-left"
                       >
                         Clear All Filters
                       </button>
                    )}
                 </div>
              </div>

                <div>
                 <h3 className="text-lg font-bold border-b border-gray-200 pb-2 mb-4">Rating</h3>
                 <ul className="space-y-2">
                    {[5, 4, 3, 2, 1].map(star => (
                       <li 
                         key={star} 
                         onClick={() => setActiveRating(star)}
                         className={`flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded p-1.5 -ml-1 transition-colors ${activeRating === star ? "bg-gray-100 ring-1 ring-gray-200" : ""}`}
                       >
                          <div className="flex text-yellow-500">
                             {[...Array(5)].map((_, i) => (
                                <IconStarFilled key={i} size={14} className={i < star ? "text-yellow-400" : "text-gray-300"} />
                             ))}
                          </div>
                          <span className={`text-xs ${activeRating === star ? "font-bold text-primary" : "text-gray-500"}`}>& Up</span>
                       </li>
                    ))}
                 </ul>
              </div>
           </aside>

           {/* MAIN PRODUCT GRID */}
           <div className="flex-1">
              {/* Sort Bar */}
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
                 <div className="text-sm text-gray-500">
                    Showing <span className="font-bold text-gray-800">{filteredProducts.length}</span> results
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Sort by:</span>
                    <select 
                       value={sortOption} 
                       onChange={handleSort} 
                       className="text-sm border-none bg-transparent font-bold focus:ring-0 cursor-pointer"
                    >
                       <option value="Newest Arrivals">Newest Arrivals</option>
                       <option value="Price: Low to High">Price: Low to High</option>
                       <option value="Price: High to Low">Price: High to Low</option>
                       <option value="Best Selling">Best Selling</option>
                    </select>
                 </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {loading ? (
                    [...Array(6)].map((_, i) => (
                       <div key={i} className="bg-white rounded-lg h-[350px] animate-pulse"></div>
                    ))
                 ) : (
                    currentProducts.map((product) => (
                       <div key={product.id} className="group bg-white rounded-lg border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                          {/* Image */}
                          <Link to={`/singleProduct/${product.id}`} className="relative h-60 p-6 flex items-center justify-center bg-white overflow-hidden">
                             <img 
                                src={`${backendBase}${product.image}`} 
                                alt={product.name} 
                                className="h-full w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/300?text=No+Image")}
                             />
                          {/* Hover Actions */}
                             <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm border-t border-gray-100 flex gap-2 justify-center">
                                <button 
                                  onClick={(e) => {
                                     e.preventDefault();
                                     e.stopPropagation();
                                     addToCart(product);
                                     // Visual feedback
                                     const btn = e.currentTarget;
                                     const originalText = btn.innerHTML;
                                     btn.innerHTML = '<span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check" width="14" height="14" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg> Added</span>';
                                     btn.classList.add("bg-green-600", "text-white");
                                     btn.classList.remove("bg-primary");
                                     
                                     setTimeout(() => {
                                        btn.innerHTML = originalText;
                                        btn.classList.remove("bg-green-600", "text-white");
                                        btn.classList.add("bg-primary");
                                     }, 2000);
                                  }}
                                  className="flex-1 bg-primary text-white py-2 rounded text-xs font-bold hover:bg-secondary transition-all flex items-center justify-center gap-1"
                                >
                                   <IconShoppingCart size={14} /> Add to Cart
                                </button>
                             </div>
                          </Link>
                          
                          {/* Info */}
                          <div className="p-4 flex-1 flex flex-col border-t border-gray-50 relative z-10 bg-white">
                             <div className="text-xs text-gray-400 mb-1">{product.category || "Electronics"}</div>
                             <Link to={`/singleProduct/${product.id}`} className="font-bold text-primary hover:text-accent transition-colors line-clamp-2 mb-2">
                                {product.name}
                             </Link>
                             <div className="mt-auto flex items-center justify-between">
                                <div className="flex flex-col">
                                   <span className="text-lg font-bold text-primary">₹{product.price}</span>
                                   {product.mrPrice && <span className="text-xs text-gray-400 line-through">₹{product.mrPrice}</span>}
                                </div>
                                <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold border border-green-100">
                                   4.5 <IconStarFilled size={10} />
                                </div>
                             </div>
                          </div>
                       </div>
                    ))
                 )}
              </div>

               {/* Pagination */}
               {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                     <button 
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className={`w-10 h-10 rounded border flex items-center justify-center transition bg-white ${currentPage === 1 ? "opacity-30 cursor-not-allowed" : "hover:border-primary text-gray-600"}`}
                     >
                        <IconChevronDown className="rotate-90" size={16} />
                     </button>
                     
                     {[...Array(totalPages)].map((_, i) => (
                        <button 
                           key={i + 1} 
                           onClick={() => paginate(i + 1)}
                           className={`w-10 h-10 rounded border flex items-center justify-center text-sm font-bold transition ${currentPage === i + 1 ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-300 hover:border-primary"}`}
                        >
                           {i + 1}
                        </button>
                     ))}

                     <button 
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className={`w-10 h-10 rounded border flex items-center justify-center transition bg-white ${currentPage === totalPages ? "opacity-30 cursor-not-allowed" : "hover:border-primary text-gray-600"}`}
                     >
                        <IconChevronDown className="-rotate-90" size={16} />
                     </button>
                  </div>
               )}
           </div>

        </div>
      </div>
    </div>
  );
};

export default AllProducts;