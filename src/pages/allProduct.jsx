import React from "react";
import Nav from "../components/nav";
import { IconStarFilled } from "@tabler/icons-react";

export default function AllProduct() {
  const adds = [
    {
      id: 1,
      add1: "./assets/images/add1.jpg",
    },
    {
      id: 2,
      add2: "./assets/images/add2.jpg",
    },
  ];
  const allProductCatogery = [
    {
      id: 1,
      productName: "Headsets",
      productimage: "./assets/images/chf.webp",
    },
    {
      id: 2,
      productName: "Laptops",
      productimage: "./assets/images/clap.webp",
    },
    {
      id: 3,
      productName: "Phones",
      productimage: "./assets/images/cphone.webp",
    },
    {
      id: 4,
      productName: "Watches",
      productimage: "./assets/images/cwh.webp",
    },
    {
      id: 5,
      productName: "Speakers",
      productimage: "./assets/images/cspeaker.webp",
    },
    {
      id: 6,
      productName: "Mouses",
      productimage: "./assets/images/cmouse.webp",
    },
    {
      id: 7,
      productName: "Air Pods",
      productimage: "./assets/images/cairpods.webp",
    },
    {
      id: 8,
      productName: "Smart TV",
      productimage: "./assets/images/ctv.webp",
    },
    {
      id: 9,
      productName: "Games",
      productimage: "./assets/images/cc.webp",
    },
    {
      id: 10,
      productName: "RC Car",
      productimage: "./assets/images/ccar.webp",
    },
    {
      id: 11,
      productName: "Keybords",
      productimage: "./assets/images/ckey.webp",
    },
    {
      id: 12,
      productName: "Tablets",
      productimage: "./assets/images/ctab.webp",
    },
    {
      id: 13,
      productName: "Chargers",
      productimage: "./assets/images/ccharger.webp",
    },
  ];

  const ProductDetails = [
    {
      id: 1,
      productName: "Smart TV",
      productDescription: "1.8-inch Display, Heart Rate Monitor, Waterproof",
      productRating: 4.2,
      totalSale: 1244,
      offerPrice: 8999,
      mrPrice: 9999,
      productImg: "/assets/images/stv.png",
    },
    {
      id: 2,
      productName: "Mac Book",
      productDescription: "Multicolor, With Glass, Standard",
      productRating: 4.6,
      totalSale: 2130,
      offerPrice: 159999,
      mrPrice: 179999,
      productImg: "/assets/images/plaptop.png",
    },
    {
      id: 3,
      productName: "Nikon Cam",
      productDescription: "Portable, 4K, 1800HD",
      productRating: 4.3,
      totalSale: 1670,
      offerPrice: 19999,
      mrPrice: 23999,
      productImg: "/assets/images/pcamera.png",
    },
    {
      id: 4,
      productName: "Drone",
      productDescription: "1km distance, wide view, 4K",
      productRating: 4.5,
      totalSale: 1320,
      offerPrice: 3799,
      mrPrice: 4999,
      productImg: "/assets/images/pdron.png",
    },
    {
      id: 5,
      productName: "Drimmer",
      productDescription: "Multicolor, portable, Standard",
      productRating: 4.2,
      totalSale: 1244,
      offerPrice: 899,
      mrPrice: 999,
      productImg: "/assets/images/pdrimmer.png",
    },
    {
      id: 6,
      productName: "Projector",
      productDescription: "10 inch, 4K, HDR, Compact Case",
      productRating: 4.6,
      totalSale: 2130,
      offerPrice: 12099,
      mrPrice: 14999,
      productImg: "/assets/images/projector.png",
    },
    {
      id: 7,
      productName: "Gaming CPU",
      productDescription: "RGB Lighting, Tech Accessories, Custom Cooling",
      productRating: 4.4,
      totalSale: 1985,
      offerPrice: 150000,
      mrPrice: 179999,
      productImg: "/assets/images/pcpu.png",
    },
    {
      id: 8,
      productName: "Party Speaker",
      productDescription: "Portable, 100W, 10H Playtime",
      productRating: 4.3,
      totalSale: 1670,
      offerPrice: 3999,
      mrPrice: 4999,
      productImg: "/assets/images/pparty.webp",
    },
    {
      id: 9,
      productName: "Protection Case",
      productDescription: "Ultra protection, transparent",
      productRating: 4.5,
      totalSale: 1320,
      offerPrice: 399,
      mrPrice: 799,
      productImg: "/assets/images/pcase.png",
    },
    {
      id: 10,
      productName: "iPhone 12",
      productDescription: "512 GB, Multicolor, 23 MP",
      productRating: 4.7,
      totalSale: 1048,
      offerPrice: 77899,
      mrPrice: 82999,
      productImg: "/assets/images/pip12.png",
    },
  ];

  const ProductDetails2 = [
    {
      id: 11,
      productName: "VR",
      productDescription: "Bluetooth 5.3, 4K, 40H Battery",
      productRating: 4.6,
      totalSale: 2560,
      offerPrice: 2499,
      mrPrice: 3499,
      productImg: "/assets/images/vr.webp",
    },
    {
      id: 12,
      productName: "Smart Ring",
      productDescription: "Lite weight, Waterproof, Sleep Tracker",
      productRating: 4.4,
      totalSale: 2100,
      offerPrice: 999,
      mrPrice: 4299,
      productImg: "/assets/images/sr.png",
    },
    {
      id: 13,
      productName: "Bluetooth Headphones",
      productDescription: "Over-Ear, 60H Battery, Noise Reduction",
      productRating: 4.5,
      totalSale: 1850,
      offerPrice: 4599,
      mrPrice: 5999,
      productImg: "/assets/images/bthf.webp",
    },
    {
      id: 14,
      productName: "Mechanical Keyboard",
      productDescription: "RGB, Wired, Blue Switches",
      productRating: 4.3,
      totalSale: 970,
      offerPrice: 3499,
      mrPrice: 4999,
      productImg: "/assets/images/mckey.webp",
    },
    {
      id: 15,
      productName: "Wireless Mouse",
      productDescription: "Ergonomic, Rechargeable, Silent Clicks",
      productRating: 4.4,
      totalSale: 1890,
      offerPrice: 699,
      mrPrice: 1499,
      productImg: "/assets/images/wirkessmouse.webp",
    },
    {
      id: 16,
      productName: "Power Bank",
      productDescription: "20000mAh, Fast Charging, Dual Port",
      productRating: 4.5,
      totalSale: 2250,
      offerPrice: 1199,
      mrPrice: 2499,
      productImg: "/assets/images/powerbbank.webp",
    },
    {
      id: 17,
      productName: "Smart Home Plug",
      productDescription: "Wi-Fi Control, Alexa Support, Compact Design",
      productRating: 4.3,
      totalSale: 860,
      offerPrice: 1299,
      mrPrice: 1899,
      productImg: "/assets/images/3pin.webp",
    },
    {
      id: 18,
      productName: "WiFi Router",
      productDescription: "Dual Band, 1200 Mbps, 4 Antennas",
      productRating: 4.5,
      totalSale: 1410,
      offerPrice: 2999,
      mrPrice: 3999,
      productImg: "/assets/images/wifiruter.webp",
    },
    {
      id: 19,
      productName: "Security Camera",
      productDescription: "1080p HD, Motion Detection, Night Vision",
      productRating: 4.4,
      totalSale: 1875,
      offerPrice: 2499,
      mrPrice: 3199,
      productImg: "/assets/images/cctv.webp",
    },
    {
      id: 20,
      productName: "Tablet",
      productDescription: "10-inch Display, 64GB Storage, WiFi+4G",
      productRating: 4.6,
      totalSale: 990,
      offerPrice: 12999,
      mrPrice: 15999,
      productImg: "/assets/images/ptablet.webp",
    },
  ];

  const ProductDetails3 = [
    {
      id: 21,
      productName: "AI Robot",
      productDescription: "Immersive 3D, Adjustable Strap, Lightweight",
      productRating: 4.2,
      totalSale: 670,
      offerPrice: 4999,
      mrPrice: 6499,
      productImg: "/assets/images/airobo.webp",
    },
    {
      id: 22,
      productName: "Smart Lamp",
      productDescription: "RGB, Touch Control, Voice Command",
      productRating: 4.3,
      totalSale: 870,
      offerPrice: 1499,
      mrPrice: 2299,
      productImg: "/assets/images/lamb.webp",
    },
    {
      id: 23,
      productName: "Portable Fan",
      productDescription: "Rechargeable, Compact, 3 Speed Modes",
      productRating: 4.4,
      totalSale: 1450,
      offerPrice: 799,
      mrPrice: 1299,
      productImg: "/assets/images/pfan.webp",
    },
    {
      id: 24,
      productName: "Car Charger",
      productDescription: "Dual USB, Fast Charging, LED Indicator",
      productRating: 4.5,
      totalSale: 1100,
      offerPrice: 699,
      mrPrice: 999,
      productImg: "/assets/images/cargharger.png",
    },
    {
      id: 25,
      productName: "Soundbar",
      productDescription: "120W Output, Bluetooth, Deep Bass",
      productRating: 4.6,
      totalSale: 940,
      offerPrice: 9999,
      mrPrice: 12999,
      productImg: "/assets/images/psondbar.webp",
    },
    {
      id: 26,
      productName: "Wireless Charger",
      productDescription: "15W Fast Charge, Magnetic Pad",
      productRating: 4.4,
      totalSale: 860,
      offerPrice: 1499,
      mrPrice: 1999,
      productImg: "/assets/images/wireless.webp",
    },
    {
      id: 27,
      productName: "RC Car",
      productDescription: "BMI, Body Fat, Bluetooth App Sync",
      productRating: 4.3,
      totalSale: 770,
      offerPrice: 1899,
      mrPrice: 2499,
      productImg: "/assets/images/rccar.webp",
    },
    {
      id: 28,
      productName: "Mini Speaker",
      productDescription: "Portable, 10H Battery, Deep Bass",
      productRating: 4.5,
      totalSale: 1580,
      offerPrice: 1899,
      mrPrice: 2499,
      productImg: "/assets/images/minispeaker.webp",
    },
    {
      id: 29,
      productName: "Smartphone Gimbal",
      productDescription: "3-Axis Stabilizer, Compact, Rechargeable",
      productRating: 4.6,
      totalSale: 910,
      offerPrice: 5899,
      mrPrice: 7999,
      productImg: "/assets/images/pgimbel.png",
    },
    {
      id: 30,
      productName: "Gaming Condroller",
      productDescription: "PS4,5, PC, Android",
      productRating: 4.4,
      totalSale: 1140,
      offerPrice: 1799,
      mrPrice: 2499,
      productImg: "/assets/images/condroller.webp",
    },
  ];

  const singleproduct = () => {
    window.location.href = "/singleproduct";
  };
  return (
    <>
      <Nav />

      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">
        {/* footbar */}
        <div
          className="
  fixed bottom-0 w-full md:w-[90.5%] 
  bg-[#f7fbff] border border-[#3f3f3f50] 
  rounded-t-[30px] md:rounded-t-[80px]
  place-self-center transition-all duration-300
  md:hover:w-[99.5%] md:hover:h-[240px]
  h-[160px] md:h-[230px] flex flex-col justify-end
  px-3 md:px-8 pb-3 md:pb-8 group
"
        >
          {/* Top divider line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

          {/* Footer Content */}
          <div
            className="
    grid grid-cols-2 md:grid-cols-3 
    gap-4 md:gap-8 text-gray-700 w-full
    max-w-7xl mx-auto
  "
          >
            {/* Column 1 - Logo & tagline */}
            <div className="space-y-1 md:space-y-4 col-span-2 md:col-span-1">
              <h2 className="text-lg md:text-4xl font-extrabold text-gray-700 group-hover:text-gray-900 transition-all duration-300">
                Galaxy Ecommerce
              </h2>
              <p className="text-[10px] md:text-sm leading-tight">
                Shop the stars. Best deals on fashion, tech & more.
              </p>

              {/* Social icons (visible only on md and above) */}
              <div className="hidden md:flex gap-4 pt-2">
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-6h-2v-2h2V9c0-1.1.9-2 2-2h2v2h-2c-.55 0-1 .45-1 1v1.5h3l-.5 2H13v6h-2z" />
                </svg>
                <svg
                  className="w-6 h-6 hover:text-gray-900 cursor-pointer"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" />
                </svg>
              </div>
            </div>

            {/* Column 2 - Shop Links */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Shop
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Best Sellers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Sale
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Brands
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Support */}
            <div className="space-y-1 md:space-y-3">
              <h3 className="text-xs md:text-lg font-semibold text-gray-900">
                Support
              </h3>
              <ul className="space-y-1 md:space-y-2 text-[10px] md:text-sm">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z- top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        {/* bigimg */}
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
          <img
            src={adds[0].add1}
            className="w-full h-full"
            alt="img vannitilla"
          />
        </div>
        {/* catogarios */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-11 py-2 md:py-5 px-2 md:px-4">
            {allProductCatogery.map((catogery) => (
              <div
                key={catogery.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="bg-blue-200 rounded-full w-11 md:w-25 h-11 md:h-25 border border-gray-400 overflow-hidden cursor-pointer">
                  <img
                    src={catogery.productimage}
                    alt={catogery.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] md:text-[20px] font-medium md:font-semibold mt-1 text-center">
                  {catogery.productName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Product */}
        {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails.map((product) => (
            <div
              onClick={singleproduct}
              key={product.id}
              className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300"
            >
              <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product.productImg} alt="" />
              </div>
              <div className="ml-2">
                <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight">
                  {product.productName}
                </h2>
                <p className="text-[10px] md:text-[13px] leading-tight line-clamp-1 text-gray-600 mt-0 md:mt-1">
                  {product.productDescription}
                </p>

                <div className="flex items-center gap-1 mt-0 md:mt-1 leading-none">
                  <div className="flex items-center gap-0.5 md:gap-1 bg-green-500 text-white px-0.5 md:px-1 py-[2px] md:py-[4px] rounded-[3px] md:rounded-md">
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

                <h1 className="text-[18px] md:text-[23px] font-medium leading-tight">
                  ₹{product.offerPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* add22 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#c0d6ff] h-[480px] md:h-[400px] pb-2 mb-10 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-8 place-self-center-safe w-[250px] md:w-[480px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300
              md:group-hover:scale-110 md:group-hover:-rotate-10
              md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
              src="./assets/images/pcpu.png"
              alt=""
            />
          </div>
          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center ">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#005186] font-extrabold">
                85% OFF
              </p>
              <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">
                SUMMER
              </p>
              <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">
                SALE
              </p>
              <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#0065a8] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#00548b] transition-all duration-300 mt-4">
                SHOP
              </button>
            </div>
          </div>
        </div>

        {/* againproducts */}
        {/* Product */}
        {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails2.map((product2) => (
            <div
              key={product2.id}
              onClick={singleproduct}
              className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300"
            >
              <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product2.productImg} alt="" />
              </div>
              <div className="ml-2">
                <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight">
                  {product2.productName}
                </h2>
                <p className="text-[10px] md:text-[13px] leading-tight line-clamp-1 text-gray-600 mt-0 md:mt-1">
                  {product2.productDescription}
                </p>

                <div className="flex items-center gap-1 mt-0 md:mt-1 leading-none">
                  <div className="flex items-center gap-0.5 md:gap-1 bg-green-500 text-white px-0.5 md:px-1 py-[2px] md:py-[4px] rounded-[3px] md:rounded-md">
                    <p className="text-[8px] md:text-[13px] font-medium">
                      {product2.productRating}
                    </p>
                    <IconStarFilled
                      color="#f1cd0c"
                      className="h-2 md:h-4 w-2 md:w-4"
                    />
                  </div>
                  <p className="text-[8px] md:text-[13px] text-gray-600">
                    ({product2.totalSale})
                  </p>
                </div>

                <h1 className="text-[18px] md:text-[23px] font-medium leading-tight">
                  ₹{product2.offerPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* add222 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#f2c0ff] h-[410px] md:h-[400px] pb-10 mb-10 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-24 place-self-center w-[350px] md:w-[600px] md:-top-44 md:left-30 cursor-pointer transition-all duration-300
              md:group-hover:scale-110 md:group-hover:-rotate-10
              md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
              src="./assets/images/gamingcondroller.png"
              alt=""
            />
          </div>
          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center ">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#672f74] font-extrabold">
                69% OFF
              </p>
              <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">
                SUPER
              </p>
              <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">
                SALE
              </p>
              <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#672f74] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#672f74] transition-all duration-300 mt-4">
                SHOP
              </button>
            </div>
          </div>
        </div>
        {/* again and againproducts */}
        {/* Product */}
        {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails3.map((product3) => (
            <div
              key={product3.id}
              onClick={singleproduct}
              className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300"
            >
              <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product3.productImg} alt="" />
              </div>
              <div className="ml-2">
                <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight">
                  {product3.productName}
                </h2>
                <p className="text-[10px] md:text-[13px] leading-tight line-clamp-1 text-gray-600 mt-0 md:mt-1">
                  {product3.productDescription}
                </p>

                <div className="flex items-center gap-1 mt-0 md:mt-1 leading-none">
                  <div className="flex items-center gap-0.5 md:gap-1 bg-green-500 text-white px-0.5 md:px-1 py-[2px] md:py-[4px] rounded-[3px] md:rounded-md">
                    <p className="text-[8px] md:text-[13px] font-medium">
                      {product3.productRating}
                    </p>
                    <IconStarFilled
                      color="#f1cd0c"
                      className="h-2 md:h-4 w-2 md:w-4"
                    />
                  </div>
                  <p className="text-[8px] md:text-[13px] text-gray-600">
                    ({product3.totalSale})
                  </p>
                </div>
                <h1 className="text-[18px] md:text-[23px] font-medium leading-tight">
                  ₹{product3.offerPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* add223 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#ff7e7e] h-[410px] md:h-[400px] pb-10 md:pb-1 mb-2 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-6 place-self-center w-[220px] md:w-[450px] md:-top-14 md:left-40 cursor-pointer transition-all duration-300
              md:group-hover:scale-110 md:group-hover:-rotate-10
              md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
              src="./assets/images/pvr.webp"
              alt=""
            />
          </div>
          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center ">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#7c0000] font-extrabold">
                59% OFF
              </p>
              <p className="text-5xl md:text-7xl text-[#ffffffc9] font-extrabold">
                SPECIAL
              </p>
              <p className="text-[83px] leading-14 md:text-9xl md:leading-23 text-[#ffffffc9] font-extrabold">
                SALE
              </p>
              <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#8a0000] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#8a0000] transition-all duration-300 mt-4">
                SHOP
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
