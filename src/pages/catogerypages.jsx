import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { IconStarFilled, IconSortAscending, IconSortDescending } from "@tabler/icons-react";

export default function CatogeryPages() {
  const { id } = useParams();
  const categoryId = Number(id);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default"); // default, low, high, rating

  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";

  // Category names (you can expand this)
  const categoryNames = {
    1: "Headsets",
    2: "Computers",
    3: "Phones",
    4: "Watches",
    5: "Speakers",
    6: "Mouses",
    7: "Electronics",
    8: "Smart TV",
    9: "Games",
    10: "RC Car",
    11: "Keyboards",
    12: "Tablets",
    13: "Cameras",
  };

  const currentCategoryName = categoryNames[categoryId] || "Category";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        const filtered = res.data.filter(
          (item) => Number(item.catogeryId) === categoryId
        );
        setProducts(filtered);
        setFilteredProducts(filtered);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [categoryId]);

  // Sort products
  useEffect(() => {
    let sorted = [...products];

    if (sortBy === "low") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "high") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      sorted.sort((a, b) => (b.productRating || 0) - (a.productRating || 0));
    }

    setFilteredProducts(sorted);
  }, [sortBy, products]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-2xl font-bold text-gray-600 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]">
        Loading {currentCategoryName}...
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] pt-20 pb-20">
      
      <div className="w-[99.5%] place-self-center min-h-screen rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 p-3 md:p-6 overflow-hidden shadow-2xl mb-10">
        {/* Banner */}
        <div className="w-full h-[110px] md:h-[350px] rounded-[28px] md:rounded-[60px] overflow-hidden mb-4">
          <img
            src="/assets/images/add2.jpg"
            className="w-full h-full object-cover"
            alt={currentCategoryName}
          />
        </div>

        {/* Category Header */}
        <div className="px-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-[#2b5f72]">
                {currentCategoryName}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                {filteredProducts.length} products available
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#2b5f72]"
              >
                <option value="default">Default</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">
              No products in this category yet.
            </p>
            <Link to="/allProduct" className="inline-block mt-6 text-[#2b5f72] hover:underline font-semibold text-lg">
              Browse All Products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 px-2 md:px-4">
            {filteredProducts.map((product) => (
              <Link to={`/singleProduct/${product.id}`} key={product.id}>
                <div className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300">
                  <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                    <img 
                      className="h-full object-contain max-w-full" 
                      src={`${backendBase}${product.image}`} 
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="ml-2 mt-1">
                    <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight line-clamp-2">
                      {product.name}
                    </h2>
                    <p className="text-[10px] md:text-[13px] leading-tight line-clamp-1 text-gray-600 mt-0 md:mt-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-1 mt-0 md:mt-1 leading-none">
                      <div className="flex items-center gap-0.5 md:gap-1 bg-green-500 text-white px-0.5 md:px-1 py-[2px] md:py-[4px] rounded-[3px] md:rounded-md">
                        <p className="text-[8px] md:text-[13px] font-medium">
                          {product.productRating || 4.5}
                        </p>
                        <IconStarFilled color="#f1cd0c" className="h-2 md:h-4 w-2 md:w-4" />
                      </div>
                      <p className="text-[8px] md:text-[13px] text-gray-600">
                        ({product.totalSale || 1000})
                      </p>
                    </div>
                    <h1 className="text-[18px] md:text-[23px] font-medium leading-tight mt-1">
                      ₹{product.price}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}