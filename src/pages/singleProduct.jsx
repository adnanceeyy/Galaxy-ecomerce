import React, { useEffect } from "react";
import { IconArrowRight, IconHeart, IconStarFilled } from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import AllProduct from "./allProduct";
import data from "../data/datas.json";

export default function SingleProduct() {
  const { id } = useParams();

  const newproductdetails = data.newProductDetails;
  const ProductDetails = data.ProductDetails;
  const ProductD2 = data.ProductDetails2;
  const ProductD3 = data.ProductDetails3;

  const allproduct = [
    ...newproductdetails,
    ...ProductDetails,
    ...ProductD2,
    ...ProductD3,
  ];

  // FINAL product finder
  const product = allproduct.find((p) => p.id.toString() === id);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reco = () => {
    window.location.href = "/allProduct";
  };

  // ✅ UPDATED Add To Cart (Includes Qty + Navbar Update)
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = cart.find((p) => p.id === product.id);

    if (exists) {
      exists.qty = (exists.qty || 1) + 1;
    } else {
      cart.push({
        ...product,
        qty: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // 🔥 Notify Navbar to update count
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0 -z-10" />

      <div className="w-[99.5%] mx-auto place-self-center rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative top-14 md:top-28 p-1 md:p-5 shadow-lg mb-56 md:mb-94 z-10">
        {product ? (
          <Link
            to={`/singleProduct/${product.id}`}
            key={product.id}
            className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
          >
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8">
              {/* LEFT IMAGE */}
              <div className="bg-gray-200 w-full md:min-w-[650px] md:max-w-[700px] h-[360px] md:min-h-[670px] md:max-h-[730px] border border-[#a8a8a859] rounded-[28px] md:rounded-[70px] p-8 flex items-center justify-center">
                <img
                  className="h-full object-contain"
                  src={product.productImg}
                  alt="product"
                />
              </div>

              {/* RIGHT DETAILS */}
              <div className="mx-2 mt-2 md:mt-8">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
                    {product.productName}
                    <span className="font-light text-2xl">
                      {product.productDetailedName}
                    </span>
                  </h2>

                  <button className="ml-auto bg-white p-3 rounded-full shadow-sm hover:scale-105 transition">
                    <IconHeart className="w-6 h-6 text-red-500" />
                  </button>
                </div>

                <div className="flex items-center gap-2 md:gap-4 mt-1 md:mt-2">
                  <div className="flex items-center gap-2 bg-[#24a7ff] text-white px-1.5 md:px-3 py-0.5 md:py-1.5 rounded-md">
                    <span className="text-base md:text-lg font-semibold">
                      {product.productRating}
                    </span>
                    <IconStarFilled color="#f1cd0c" className="h-5 w-5" />
                  </div>

                  <p className="text-gray-600 text-sm md:text-base">
                    {product.totalSale}+ reviews
                  </p>

                  <span className="text-green-700 text-sm md:text-base font-semibold">
                    In Stock
                  </span>
                </div>

                <div className="flex items-baseline gap-3 md:gap-6 mt-1 md:mt-3">
                  <h3 className="text-red-600 font-light text-lg md:text-3xl line-through">
                    {`₹${product.mrPrice}`}
                  </h3>

                  <h2 className="text-4xl md:text-[3.5rem] font-extrabold text-gray-800">
                    {`₹${product.offerPrice}`}
                  </h2>

                  <span className="bg-yellow-100 text-yellow-800 text-sm md:text-base px-1 md:px-3 py-1 md:py-2 rounded">
                    {`${product.off} OFF`}
                  </span>
                </div>

                <p className="text-gray-500 mt-1 md:mt-4 text-sm md:text-lg leading-relaxed">
                  {product.productDescription}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5 md:mt-8 text-gray-700">
                  <div className="flex flex-col items-center">
                    <div className="text-3xl md:text-4xl">📱</div>
                    <p className="text-sm md:text-lg font-semibold mt-1">
                      Mobile-Friendly
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl md:text-4xl">💻</div>
                    <p className="text-sm md:text-lg font-semibold mt-1">
                      Laptop Ready
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl md:text-4xl">📺</div>
                    <p className="text-sm md:text-lg font-semibold mt-1">
                      Smart TV Support
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-3xl md:text-4xl">🎯</div>
                    <p className="text-sm md:text-lg font-semibold mt-1">
                      Precise Sensor
                    </p>
                  </div>
                </div>
                <div className="mt-1 md:mt-3 space-y-2 md:space-y-4">
                  <h3 className="text-lg md:text-3xl font-bold">
                    Specialities:
                  </h3>
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
                  window.location.href = "/cart"; // ✅ Redirect to cart page
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
          </Link>
        ) : (
          <h1 className="text-3xl font-bold text-center py-20">
            Product Not Found
          </h1>
        )}

        {/* Recommended Products */}
        <div className="flex justify-between px-2">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Recommended
          </h1>

          <IconArrowRight
            onClick={reco}
            className="w-5 h-5 md:w-8 md:h-8 text-gray-600 rounded-full border font-bold cursor-pointer"
          />
        </div>

        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 mb-10 md:mb-32 scroll-smooth scrollbar-hide">
          <div className="flex gap-3 md:gap-7 px-2 md:p-5 w-max">
            {ProductD3.map((product) => (
              <Link
                to={`/singleProduct/${product.id}`}
                key={product.id}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
              >
                <div className="bg-[#f7fbff] min-w-[160px] md:w-[260px] h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg transition-all">
                  <div className="w-full h-[135px] md:h-[250px] flex items-center justify-center bg-gray-200 rounded-t-[13px] md:rounded-t-[28px]">
                    <img
                      className="h-full object-contain"
                      src={product.productImg}
                      alt=""
                    />
                  </div>

                  <div className="ml-2">
                    <h2 className="text-[14px] md:text-2xl font-light">
                      {product.productName}
                    </h2>

                    <p className="text-[10px] md:text-[13px] text-gray-600 line-clamp-1">
                      {product.productDescription}
                    </p>

                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex items-center gap-1 bg-green-500 text-white px-1 py-[2px] md:py-[4px] rounded-md">
                        <p className="text-[8px] md:text-[13px] font-medium">
                          {product.productRating}
                        </p>
                        <IconStarFilled
                          color="#f1cd0c"
                          className="h-2 md:h-4 w-2 md:w-4"
                        />
                      </div>

                      <p className="text-[8px] md:text-[13px] text-gray-600">
                        ({product.totalSale})
                      </p>
                    </div>

                    <h1 className="text-[18px] md:text-[23px] font-medium">
                      ₹{product.offerPrice}
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
              className="absolute -top-8 place-self-center-safe w-[300px] md:w-[480px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10 md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
              src="/assets/images/airobo.webp"
              alt=""
            />
          </div>

          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center ">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#19899c] font-extrabold">
                85% OFF
              </p>
              <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">
                SUMMER
              </p>
              <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">
                SALE
              </p>

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
