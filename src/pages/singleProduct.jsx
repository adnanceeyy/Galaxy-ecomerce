import React, { useEffect } from "react";
import { IconArrowRight, IconHeart, IconStarFilled } from "@tabler/icons-react";
import Nav from "../components/nav";
import { useParams } from "react-router-dom";
import AllProduct from "./allProduct";
import data from "../data/datas.json";
import Footer from "../components/footer";

export default function SingleProduct() {
  const { id } = useParams();
  const newproductdetails = data.newProductDetails;
  const ProductDetails = data.ProductDetails;
  const ProductD2 = data.ProductDetails2;
  const ProductD3 = data.ProductDetails3;
  console.log(newproductdetails, "abbas");

  const ProductDetails3 = [
    {
      id: 1,
      productName: "AI Robot",
      productDescription: "Immersive 3D, Adjustable Strap, Lightweight",
      productRating: 4.2,
      totalSale: 670,
      offerPrice: 4999,
      mrPrice: 6499,
      productImg: "/assets/images/airobo.webp",
    },
    {
      id: 2,
      productName: "Smart Lamp",
      productDescription: "RGB, Touch Control, Voice Command",
      productRating: 4.3,
      totalSale: 870,
      offerPrice: 1499,
      mrPrice: 2299,
      productImg: "/assets/images/lamb.webp",
    },
    {
      id: 3,
      productName: "Portable Fan",
      productDescription: "Rechargeable, Compact, 3 Speed Modes",
      productRating: 4.4,
      totalSale: 1450,
      offerPrice: 799,
      mrPrice: 1299,
      productImg: "/assets/images/pfan.webp",
    },
    {
      id: 4,
      productName: "Car Charger",
      productDescription: "Dual USB, Fast Charging, LED Indicator",
      productRating: 4.5,
      totalSale: 1100,
      offerPrice: 699,
      mrPrice: 999,
      productImg: "/assets/images/cargharger.png",
    },
    {
      id: 5,
      productName: "Soundbar",
      productDescription: "120W Output, Bluetooth, Deep Bass",
      productRating: 4.6,
      totalSale: 940,
      offerPrice: 9999,
      mrPrice: 12999,
      productImg: "/assets/images/psondbar.webp",
    },
    {
      id: 6,
      productName: "Wireless Charger",
      productDescription: "15W Fast Charge, Magnetic Pad",
      productRating: 4.4,
      totalSale: 860,
      offerPrice: 1499,
      mrPrice: 1999,
      productImg: "/assets/images/wireless.webp",
    },
    {
      id: 7,
      productName: "RC Car",
      productDescription: "High Speed Remote Car",
      productRating: 4.3,
      totalSale: 770,
      offerPrice: 1899,
      mrPrice: 2499,
      productImg: "/assets/images/rccar.webp",
    },
    {
      id: 8,
      productName: "Mini Speaker",
      productDescription: "Portable, 10H Battery, Deep Bass",
      productRating: 4.5,
      totalSale: 1580,
      offerPrice: 1899,
      mrPrice: 2499,
      productImg: "/assets/images/minispeaker.webp",
    },
    {
      id: 9,
      productName: "Smartphone Gimbal",
      productDescription: "3-Axis Stabilizer, Compact, Rechargeable",
      productRating: 4.6,
      totalSale: 910,
      offerPrice: 5899,
      mrPrice: 7999,
      productImg: "/assets/images/pgimbel.png",
    },
    {
      id: 10,
      productName: "Gaming Controller",
      productDescription: "PS4, PS5, PC, Android",
      productRating: 4.4,
      totalSale: 1140,
      offerPrice: 1799,
      mrPrice: 2499,
      productImg: "/assets/images/condroller.webp",
    },
  ];
  const newproductProducts = newproductdetails?.find(
    (p) => p.id.toString() === id
  );
  const productProducts = ProductDetails?.find(
    (p) => p.id.toString() === id
  );
  const productProducts2 = ProductD2?.find(
    (p) => p.id.toString() === id
  );
  const productProducts3 = ProductD3?.find(
    (p) => p.id.toString() === id
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const reco = () => {
    window.location.href = "/allProduct";
  };
  return (
    <>
      <Nav />

      {/* Background */}
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0 -z-10" />

      {/* FOOTER BAR */}
      <Footer />

      {/* MAIN PRODUCT CARD */}
      <div className="w-[99.5%] mx-auto place-self-center rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative top-14 md:top-28 p-1 md:p-5 shadow-lg mb-60 md:mb-96 z-10">
        {/* Top Section */}
        {newproductProducts ? (
          <div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              {/* IMAGE */}

              <div className="bg-gray-200 w-full md:w-[700px] h-[360px] md:h-[650px] border border-[#a8a8a859] rounded-[28px] md:rounded-[70px] p-8 flex items-center justify-center">
                <img
                  className="h-full object-contain"
                  src={newproductProducts.productImg}
                  alt="product"
                />
              </div>
              <div className="mx-2 mt-2 md:mt-8">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                    {newproductProducts.productDetailedName}
                  </h2>

                  <button className="ml-auto bg-white p-3 rounded-full shadow-sm hover:scale-105 transition">
                    <IconHeart className="w-6 h-6 text-red-500" />
                  </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2 bg-[#24a7ff] text-white px-3 py-1.5 rounded-md">
                    <span className="text-lg font-semibold">{newproductProducts.productRating}</span>
                    <IconStarFilled color="#f1cd0c" className="h-5 w-5" />
                  </div>
                  <p className="text-gray-600 text-base">{newproductProducts.totalSale}+ reviews</p>
                  <span className="text-green-700 text-base font-semibold">
                    In Stock
                  </span>
                </div>

                {/* PRICE */}
                <div className="flex items-baseline gap-6 mt-3">
                  <h3 className="text-red-600 font-light text-3xl line-through">
                    {`₹${newproductProducts.mrPrice}`}
                  </h3>
                  <h2 className="text-5xl md:text-[3.5rem] font-extrabold text-gray-800">
                    {`₹${newproductProducts.offerPrice}`}
                  </h2>
                  <span className="bg-yellow-100 text-yellow-800 text-base px-3 py-2 rounded">
                    {`${newproductProducts.off} OFF`}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-500 mt-4 text-lg leading-relaxed">
                  {newproductProducts.productDescription}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 text-gray-700">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl">📱</div>
                    <p className="text-lg font-semibold mt-1">
                      Mobile-Friendly
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-4xl">💻</div>
                    <p className="text-lg font-semibold mt-1">Laptop Ready</p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-4xl">📺</div>
                    <p className="text-lg font-semibold mt-1">
                      Smart TV Support
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-4xl">🎯</div>
                    <p className="text-lg font-semibold mt-1">Precise Sensor</p>
                  </div>
                </div>

                {/* SPECIALITIES */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Specialities:
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
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
              <button className="bg-[#72c7ff] w-full rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-4">
                Buy Now
              </button>
              <button className="bg-[#2dabff] w-full rounded-[80px] py-2 font-bold text-lg md:text-2xl md:py-4">
                Add to Cart
              </button>
            </div>
          </div>
        ) : (
          <h1 className="text-3xl font-bold text-center py-20">
            Product Not Found
          </h1>
        )}

        {/* Recommended Header */}
        <div className="flex justify-between px-2">
          <h1 className="text-xl md:text-3xl font-bold text-gray-800">
            Recommended
          </h1>
          <IconArrowRight
            onClick={reco}
            className="w-5 h-5 md:w-8 md:h-8 text-gray-600 rounded-full border font-bold cursor-pointer"
          />
        </div>

        {/* Horizontal Recommended Products */}
        <div className="overflow-x-auto overflow-y-hidden w-full mt-3 mb-10 md:mb-32 scroll-smooth scrollbar-hide">
          <div className="flex gap-3 md:gap-7 px-2 md:p-5 w-max">
            {ProductDetails3.map((product) => (
              <div
                key={product.id}
                className="bg-[#f7fbff] min-w-[160px] md:w-[260px] h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl 
                border border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg transition-all"
              >
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
            ))}
          </div>
        </div>

        {/* BIG OFFER BANNER */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] place-self-center md:w-[80%] bg-[#92d5f0] h-[480px] md:h-[400px] pb-2 mb-20 mt-28">
          <div className="relative w-full md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-8 md:-top-20 w-[250px] md:w-[480px] left-1/2 -translate-x-1/2 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              src="/assets/images/airobo.webp"
              alt=""
            />
          </div>

          <div className="w-full md:w-[55%] flex flex-col justify-center items-start pl-6">
            <p className="text-3xl md:text-5xl text-[#00638a] font-extrabold">
              85% OFF
            </p>
            <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">
              SUMMER
            </p>
            <p className="text-[83px] md:text-9xl text-[#ffffffc9] font-extrabold">
              SALE
            </p>
            <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#00638a] bg-[#ffffffea] hover:bg-[#00638a] hover:text-white transition-all mt-4">
              SHOP
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
