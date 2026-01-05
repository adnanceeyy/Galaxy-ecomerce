import React, { useEffect, useState } from "react";
import { IconStarFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Backend base for images: http://localhost:5000
  const backendBase = import.meta.env.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL.replace('/api', '') 
    : "http://localhost:5000";

  const adds = [
    { id: 1, add1: "./assets/images/add1.jpg" },
  ];

  const allProductCatogery = [
    { id: 1, productName: "Headsets", productimage: "./assets/images/chf.webp" },
    { id: 2, productName: "computers", productimage: "./assets/images/clap.webp" },
    { id: 3, productName: "Phones", productimage: "./assets/images/cphone.webp" },
    { id: 4, productName: "Watches", productimage: "./assets/images/cwh.webp" },
    { id: 5, productName: "Speakers", productimage: "./assets/images/cspeaker.webp" },
    { id: 6, productName: "Mouses", productimage: "./assets/images/cmouse.webp" },
    { id: 7, productName: "electronics", productimage: "./assets/images/projector.png" },
    { id: 8, productName: "Smart TV", productimage: "./assets/images/ctv.webp" },
    { id: 9, productName: "Games", productimage: "./assets/images/cc.webp" },
    { id: 10, productName: "RC Car", productimage: "./assets/images/ccar.webp" },
    { id: 11, productName: "Keybords", productimage: "./assets/images/ckey.webp" },
    { id: 12, productName: "Tablets", productimage: "./assets/images/ctab.webp" },
    { id: 13, productName: "cameras", productimage: "./assets/images/Ccamera.webp" },
  ];

  // Your 3 ad banners
  const adBanners = [
    {
      bg: "bg-[#c0d6ff]",
      textColor: "#005186",
      image: "./assets/images/pcpu.png",
      title: "85% OFF",
      subtitle1: "SUMMER",
      subtitle2: "SALE",
    },
    {
      bg: "bg-[#f2c0ff]",
      textColor: "#672f74",
      image: "./assets/images/gamingcondroller.png",
      title: "69% OFF",
      subtitle1: "SUPER",
      subtitle2: "SALE",
    },
    {
      bg: "bg-[#ff7e7e]",
      textColor: "#7c0000",
      image: "./assets/images/pvr.webp",
      title: "59% OFF",
      subtitle1: "SPECIAL",
      subtitle2: "SALE",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/products`);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Is backend running?");
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-3xl font-bold text-gray-600">
        Loading products...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center text-2xl text-red-600">
        {error}
      </div>
    );
  }

  // Render single ad banner
  const renderAdBanner = (ad) => (
    <div className={`flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center ${ad.bg} h-[480px] md:h-[400px] pb-2 mb-10 md:mb-32 md:mt-32`}>
      <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
        <img
          className="absolute -top-8 place-self-center-safe w-[250px] md:w-[480px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10 md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
          src={ad.image}
          alt="Sale"
        />
      </div>
      <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center self-center">
        <div className="flex flex-col items-start">
          <p className={`text-3xl md:text-5xl font-extrabold text-[${ad.textColor}]`}>{ad.title}</p>
          <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">{ad.subtitle1}</p>
          <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">{ad.subtitle2}</p>
          <button className={`text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full bg-[#ffffffea] hover:opacity-90 transition-all duration-300 mt-4 text-[${ad.textColor}]`}>
            SHOP
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0"></div>

      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-lg shadow-black mb-60 md:mb-96">
        {/* Banner */}
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
          <img src={adds[0].add1} className="w-full h-full object-cover" alt="Banner" />
        </div>

        {/* Categories */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-11 py-2 md:py-5 px-2 md:px-4">
            {allProductCatogery.map((catogery) => (
              <Link to={`/catogerypages/${catogery.id}`} key={catogery.id}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="bg-blue-200 rounded-full w-11 md:w-25 h-11 md:h-25 border border-gray-400 overflow-hidden cursor-pointer">
                    <img src={catogery.productimage} alt={catogery.productName} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] md:text-[20px] font-medium md:font-semibold mt-1 text-center">
                    {catogery.productName}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Products Grid + Ads after every 10 products */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {products.length === 0 ? (
            <p className="col-span-full text-center text-xl text-gray-600">No products available yet.</p>
          ) : (
            products.map((product, index) => (
              <React.Fragment key={product.id}>
                {/* FIXED: Use product.id instead of product._id */}
                <Link to={`/singleProduct/${product.id}`}>
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
                    <div className="ml-2">
                      <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight">
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
                      <h1 className="text-[18px] md:text-[23px] font-medium leading-tight">
                        ₹{product.price}
                      </h1>
                    </div>
                  </div>
                </Link>

                {/* Insert ad banner after every 10 products */}
                {(index + 1) % 10 === 0 && index < products.length - 1 && (
                  <div className="col-span-full">
                    {renderAdBanner(adBanners[Math.floor(index / 10) % adBanners.length])}
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </div>
    </>
  );
}