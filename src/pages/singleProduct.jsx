import React, { useEffect, useState } from "react";
import { IconArrowRight, IconHeart, IconStarFilled } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function SingleProduct() {
  const { id } = useParams(); // This gets the custom id (1, 2, 3...) from URL
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend base for images: http://localhost:5000
  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch by custom id (number like 1, 2, 3...)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or server error");
        setLoading(false);
      }
    };

    const fetchRecommended = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        // Show 8 random recommended products
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setRecommended(shuffled.slice(0, 8));
      } catch (err) {
        console.error("Failed to load recommended products", err);
      }
    };

    fetchProduct();
    fetchRecommended();
    window.scrollTo(0, 0);
  }, [id]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((p) => p.id === product.id); // Use custom id

    if (exists) {
      exists.qty = (exists.qty || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const reco = () => {
    window.location.href = "/allProduct";
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-3xl font-bold text-gray-600 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-3xl text-red-600 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]">
        {error || "Product Not Found"}
      </div>
    );
  }

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0 -z-10" />

      <div className="w-[99.5%] mx-auto place-self-center rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative top-14 md:top-28 p-1 md:p-5 shadow-lg mb-56 md:mb-94 z-10">
        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
          {/* LEFT IMAGE */}
          <div className="bg-gray-200 w-full md:min-w-[650px] md:max-w-[700px] h-[360px] md:min-h-[670px] md:max-h-[730px] border border-[#a8a8a859] rounded-[28px] md:rounded-[70px] p-8 flex items-center justify-center">
            <img
              className="h-full object-contain"
              src={`${backendBase}${product.image}`}
              alt={product.name}
              onError={(e) => e.target.src = "https://via.placeholder.com/600?text=No+Image"}
            />
          </div>

          {/* RIGHT DETAILS */}
          <div className="mx-2 mt-2 md:mt-8 w-full">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
                {product.name}
                {product.productDetailedName && (
                  <span className="font-light text-2xl block mt-2">
                    {product.productDetailedName}
                  </span>
                )}
              </h2>

              <button className="ml-auto bg-white p-3 rounded-full shadow-sm hover:scale-105 transition">
                <IconHeart className="w-6 h-6 text-red-500" />
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2">
              <div className="flex items-center gap-2 bg-[#24a7ff] text-white px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-md">
                <span className="text-base md:text-lg font-semibold">
                  {product.productRating || 4.5}
                </span>
                <IconStarFilled color="#f1cd0c" className="h-5 w-5" />
              </div>

              <p className="text-gray-600 text-sm md:text-base">
                {product.totalSale || 1000}+ reviews
              </p>

              <span className="text-green-700 text-sm md:text-base font-semibold">
                In Stock ({product.countInStock || 0})
              </span>
            </div>

            <div className="flex items-baseline gap-3 md:gap-6 mt-1 md:mt-3">
              {product.mrPrice && (
                <h3 className="text-red-600 font-light text-lg md:text-3xl line-through">
                  ₹{product.mrPrice}
                </h3>
              )}

              <h2 className="text-4xl md:text-[3.5rem] font-extrabold text-gray-800">
                ₹{product.price}
              </h2>

              {product.off && (
                <span className="bg-yellow-100 text-yellow-800 text-sm md:text-base px-1 md:px-3 py-1 md:py-2 rounded">
                  {product.off} OFF
                </span>
              )}
            </div>

            <p className="text-gray-500 mt-1 md:mt-4 text-sm md:text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5 md:mt-8 text-gray-700">
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl">📱</div>
                <p className="text-sm md:text-lg font-semibold mt-1">Mobile-Friendly</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl">💻</div>
                <p className="text-sm md:text-lg font-semibold mt-1">Laptop Ready</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl">📺</div>
                <p className="text-sm md:text-lg font-semibold mt-1">Smart TV Support</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl">🎯</div>
                <p className="text-sm md:text-lg font-semibold mt-1">Precise Sensor</p>
              </div>
            </div>

            {/* Specialities */}
            <div className="mt-1 md:mt-3 space-y-2 md:space-y-4">
              <h3 className="text-lg md:text-3xl font-bold">Specialities:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 md:space-y-2 text-sm md:text-lg">
                <li>Ergonomic comfort grip</li>
                <li>High-precision optical sensor</li>
                <li>12-month battery backup</li>
                <li>Bluetooth + Wireless USB support</li>
                <li>Ultra-quiet buttons</li>
                <li>Compatible with Windows, Mac, Linux</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BUY BUTTONS */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 mt-4 px-2 md:px-0 md:justify-center mb-6">
          <button
            onClick={() => {
              addToCart(product);
              window.location.href = "/cart";
            }}
            className="bg-[#72c7ff] w-full rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-4 cursor-pointer hover:bg-[#1a90ff] hover:text-white transition"
          >
            Buy Now
          </button>

          <button
            onClick={() => addToCart(product)}
            className="bg-[#2dabff] w-full rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-4 cursor-pointer hover:bg-[#1a90ff] hover:text-white transition"
          >
            Add to Cart
          </button>
        </div>

        {/* Recommended Products */}
        <div className="flex justify-between px-2 mt-10">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">Recommended</h1>
          <IconArrowRight
            onClick={reco}
            className="w-5 h-5 md:w-8 md:h-8 text-gray-600 rounded-full border font-bold cursor-pointer"
          />
        </div>

        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 mb-10 md:mb-32 scroll-smooth scrollbar-hide">
          <div className="flex gap-3 md:gap-7 px-2 md:p-5 w-max">
            {recommended.map((recProduct) => (
              <Link
                to={`/singleProduct/${recProduct.id}`} // Use custom id here too!
                key={recProduct.id}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="bg-[#f7fbff] min-w-[160px] md:w-[260px] h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg transition-all">
                  <div className="w-full h-[135px] md:h-[250px] flex items-center justify-center bg-gray-200 rounded-t-[13px] md:rounded-t-[28px]">
                    <img
                      className="h-full object-contain"
                      src={`${backendBase}${recProduct.image}`}
                      alt={recProduct.name}
                      onError={(e) => e.target.src = "https://via.placeholder.com/300?text=No+Image"}
                    />
                  </div>

                  <div className="ml-2">
                    <h2 className="text-[14px] md:text-2xl font-light">
                      {recProduct.name}
                    </h2>

                    <p className="text-[10px] md:text-[13px] text-gray-600 line-clamp-1">
                      {recProduct.description}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center gap-1 bg-green-500 text-white px-1 py-[2px] md:py-[4px] rounded-md">
                        <p className="text-[8px] md:text-[13px] font-medium">
                          {recProduct.productRating || 4.5}
                        </p>
                        <IconStarFilled color="#f1cd0c" className="h-2 md:h-4 w-2 md:w-4" />
                      </div>

                      <p className="text-[8px] md:text-[13px] text-gray-600">
                        ({recProduct.totalSale || 1000})
                      </p>
                    </div>

                    <h1 className="text-[18px] md:text-[23px] font-medium">
                      ₹{recProduct.price}
                    </h1>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* OFFER CARD */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#a7f2ff] h-[480px] md:h-[400px] pb-2 mb-10 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-8 place-self-center-safe w-[300px] md:w-[480px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10"
              src="/assets/images/airobo.webp"
              alt="Offer"
            />
          </div>

          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#19899c] font-extrabold">85% OFF</p>
              <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">SUMMER</p>
              <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">SALE</p>
              <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#19899c] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#116574] transition-all duration-300 mt-4">
                SHOP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}