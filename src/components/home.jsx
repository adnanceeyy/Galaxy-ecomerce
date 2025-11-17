import {
  Icon24Hours,
  IconChevronRight,
  IconHeadset,
  IconStarFilled,
  IconWorldHeart,
} from "@tabler/icons-react";

export default function Home() {
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
  const newProductDetails = [
    {
      id: 1,
      productName: "Over Headset",
      productDescription: "Multicolor, With Glass, Standard",
      productRating: 4.2,
      totalSale: 1244,
      offerPrice: 899,
      mrPrice: 999,
      isNew: true,
      productImg: "/assets/images/headset.png",
    },
    {
      id: 2,
      productName: "Mouse",
      productDescription: "Bluetooth 5.3, Noise Canceling, Compact Case",
      productRating: 4.6,
      totalSale: 2130,
      offerPrice: 1299,
      mrPrice: 1799,
      isNew: true,
      productImg: "/assets/images/mouse.webp",
    },
    {
      id: 3,
      productName: "Smart Watch",
      productDescription: "1.8-inch Display, Heart Rate Monitor, Waterproof",
      productRating: 4.4,
      totalSale: 1985,
      offerPrice: 1499,
      mrPrice: 2199,
      isNew: false,
      productImg: "/assets/images/swhatch.webp",
    },
    {
      id: 4,
      productName: "Wireless Speaker",
      productDescription: "Portable, Deep Bass, 10H Playtime",
      productRating: 4.3,
      totalSale: 1670,
      offerPrice: 999,
      mrPrice: 1399,
      isNew: true,
      productImg: "/assets/images/btspeaker.png",
    },
    {
      id: 5,
      productName: "Air pods",
      productDescription: "RGB Lighting, 6 Buttons, 16000 DPI",
      productRating: 4.5,
      totalSale: 1320,
      offerPrice: 799,
      mrPrice: 1199,
      isNew: false,
      productImg: "/assets/images/airpods.png",
    },
    {
      id: 6,
      productName: "Keyboard",
      productDescription: "RGB Backlight, Blue Switch, Wired",
      productRating: 4.7,
      totalSale: 1048,
      offerPrice: 1899,
      mrPrice: 2499,
      isNew: true,
      productImg: "/assets/images/keybord.png",
    },
  ];

  const brandPartners = [
    {
      id: 1,
      name: "Boat",
      imagelogo: "/assets/images/boatlogo.webp",
    },
    {
      id: 2,
      name: "Salpido",
      imagelogo: "/assets/images/salpidologo.webp",
    },
    {
      id: 3,
      name: "Sony",
      imagelogo: "/assets/images/Sonylogo.webp",
    },
    {
      id: 4,
      name: "Samsung",
      imagelogo: "/assets/images/samsunglogo.webp",
    },
    {
      id: 5,
      name: "Lenovo",
      imagelogo: "/assets/images/lenovologo.webp",
    },
    {
      id: 1,
      name: "Boat",
      imagelogo: "/assets/images/boatlogo.webp",
    },
    {
      id: 2,
      name: "Salpido",
      imagelogo: "/assets/images/salpidologo.webp",
    },
    {
      id: 3,
      name: "Sony",
      imagelogo: "/assets/images/Sonylogo.webp",
    },
    {
      id: 4,
      name: "Samsung",
      imagelogo: "/assets/images/samsunglogo.webp",
    },
    {
      id: 5,
      name: "Lenovo",
      imagelogo: "/assets/images/lenovologo.webp",
    },
    {
      id: 1,
      name: "Boat",
      imagelogo: "/assets/images/boatlogo.webp",
    },
    {
      id: 2,
      name: "Salpido",
      imagelogo: "/assets/images/salpidologo.webp",
    },
    {
      id: 3,
      name: "Sony",
      imagelogo: "/assets/images/Sonylogo.webp",
    },
    {
      id: 4,
      name: "Samsung",
      imagelogo: "/assets/images/samsunglogo.webp",
    },
    {
      id: 5,
      name: "Lenovo",
      imagelogo: "/assets/images/lenovologo.webp",
    },
    {
      id: 1,
      name: "Boat",
      imagelogo: "/assets/images/boatlogo.webp",
    },
    {
      id: 2,
      name: "Salpido",
      imagelogo: "/assets/images/salpidologo.webp",
    },
    {
      id: 3,
      name: "Sony",
      imagelogo: "/assets/images/Sonylogo.webp",
    },
    {
      id: 4,
      name: "Samsung",
      imagelogo: "/assets/images/samsunglogo.webp",
    },
    {
      id: 5,
      name: "Lenovo",
      imagelogo: "/assets/images/lenovologo.webp",
    },
  ];

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] pt-16 md:pt-32 fixed z-40">
        <div className="flex  justify-center gap-2 md:gap-20 px-4 md:px-8">
          {/* Card 1 */}
          <div className="w-[130px] h-[40px] md:w-[240px] md:h-[95px] bg-white rounded-[90px] flex items-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-[90%] w-[35px] px-1 md:h-[80%] md:w-[80px] bg-gray-200 rounded-full flex items-center justify-center ml-0.5 md:ml-3">
              <IconHeadset className="text-gray-800 size-9 md:size-12" />
            </div>
            <p className="text-left text-[9px] md:text-lg font-semibold ml-1 md:ml-3 leading-tight text-gray-800">
              Free customer <br /> care support
            </p>
          </div>

          {/* Card 2 */}
          <div className="w-[130px] h-[40px] md:w-[240px] md:h-[95px] bg-white rounded-[90px] flex items-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-[90%] w-[35px] px-1 md:h-[80%] md:w-[80px] bg-gray-200 rounded-full flex items-center justify-center ml-0.5 md:ml-3">
              <Icon24Hours className="text-gray-800 size-9 md:size-12" />
            </div>
            <p className="text-left text-[9px] md:text-lg font-semibold ml-1 md:ml-3 leading-tight text-gray-800">
              24 h open <br /> website support
            </p>
          </div>

          {/* Card 3 */}
          <div className="w-[130px] h-[40px] md:w-[240px] md:h-[95px] bg-white rounded-[90px] flex items-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-[90%] w-[35px] px-1 md:h-[80%] md:w-[80px] bg-gray-200 rounded-full flex items-center justify-center ml-0.5 md:ml-3">
              <IconWorldHeart className="text-gray-800 size-9 md:size-12" />
            </div>
            <p className="text-left text-[9px] md:text-lg font-semibold ml-1 md:ml-3 leading-tight text-gray-800">
              99999+ <br /> customers
            </p>
          </div>

          {/* Card 4 (duplicate content — keep if you want) */}
          <div className=" hidden md:flex w-[130px] h-[40px] md:w-[240px] md:h-[95px] bg-white rounded-[90px] flex items-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-[90%] w-[30px] px-1 md:h-[80%] md:w-[80px] bg-gray-200 rounded-full flex items-center justify-center ml-0.5 md:ml-3">
              <IconWorldHeart className="text-gray-800 size-9 md:size-12" />
            </div>
            <p className="text-left text-[9px] md:text-lg font-semibold ml-1 md:ml-3 leading-tight text-gray-800">
              99999+ <br /> customers
            </p>
          </div>
        </div>
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

      <div
        className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-50 top-30 md:top-70 md:pb-20 mb-76 p-1 md:p-5 pb-3
        md:mb-[550px] shadow-[gray] shadow-lg shadow-black"
      >
        {/* bigimg */}
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
          <img
            src={adds[0].add1}
            className="w-full h-full"
            alt="img vannitilla"
          />
        </div>

        {/* newitms */}
        <div className="w-full flex justify-between px-3 md:px-12 pt-1 md:pt-5 pb-0.5 md:pb-3">
          <h3 className="font-extrabold  font-Montserrat text-[13px] md:text-2xl">
            New items
          </h3>
          <IconChevronRight
            className="text-[#3d3d3d] font-bold bg-[#eeeeee36] border rounded-full stroke-3 stroke-[#3a3a3a]
             w-[16px] h-[16px] md:w-[35px] md:h-[35px]
             transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* products grid */}
        <div className="grid gap-1 md:gap-5 md:w-[97%] place-self-center grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-2 md:px-4">
          {newProductDetails.map((product) => (
            <div
              key={product.id}
              className="bg-[#f7fbff] w-full h-[170px] md:h-[365px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1"
            >
              <div
                className={`absolute right-1.5 md:right-4 top-1.5 md:top-3 font-semibold text-gray-200 text-[8px] md:text-[13px] ${
                  product.isNew ? "bg-[#c20000e5]" : "bg-green-500"
                } px-1 md:px-2 rounded-[7px] md:rounded-3xl animate-pulse`}
              >
                {product.isNew ? "New" : "Fresh"}
              </div>
              <div className="w-full h-[110px] md:h-[240px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product.productImg} alt="" />
              </div>
              <div>
                <h2 className="text-[14px] md:text-2xl font-light leading-3.5 md:leading-tight">
                  {product.productName}
                </h2>
                <p className="text-[6px] md:text-[13px] leading-tight line-clamp-1 text-gray-600 mt-0 md:mt-1">
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

                <h1 className="text-[16px] md:text-2xl font-medium leading-tight">
                  ₹{product.offerPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>

        {/* sections (section1) */}
        {/* section 1 */}
        <div
          className="flex flex-row w-full md:w-[97%] place-self-center px-2 md:px-4 pt-4 md:pt-10 gap-2 md:gap-3
  overflow-x-auto md:overflow-x-visible
  snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {/* CARD 1 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 overflow-hidden relative 
    w-[80%] md:w-[35%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[60px]
    bg-[radial-gradient(circle_at_center,#ffff_-90%,#7eaebd_80%,#85afbf_99%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardwhatch.png"
              className="absolute z-10 -bottom-2 w-[190px] h-[190px] md:w-[300px] md:h-[300px]
      hover:scale-110 transition-all duration-300"
              alt=""
            />
            <p
              className="absolute z-0 text-[140px] md:text-[200px] font-extrabold text-[#ffffff56]
      -right-17 md:-right-20 top-1 md:top-8 -rotate-90"
            >
              SW
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl
      text-[#294955] cursor-pointer
      hover:bg-gray-200 hover:text-[#5496ad]
      transition-all duration-300"
            >
              BROWSE
            </button>
          </div>

          {/* CARD 2 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 relative overflow-hidden 
    w-[80%] md:w-[35%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[60px]
    bg-[radial-gradient(circle_at_center,#ffff_-90%,#7eaebd_80%,#85afbf_99%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardhf.png"
              className="absolute z-10 md:bottom-8 w-[190px] h-[190px] md:w-[280px] md:h-[300px]
      hover:scale-110 transition-all duration-300"
              alt=""
            />
            <p
              className="absolute z-0 text-[230px] md:text-[300px] font-extrabold text-[#ffffff56]
      -right-5 md:-right-5 -top-20 md:-top-30"
            >
              HF
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl
      text-[#294955] cursor-pointer
      hover:bg-gray-200 hover:text-[#5496ad]
      transition-all duration-300"
            >
              BROWSE
            </button>
          </div>

          {/* CARD 3 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 overflow-hidden relative 
    w-[80%] md:w-[50%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[50px]
    bg-[linear-gradient(135deg,#355C6A_-50%,#7eaebd_40%,#85afbf_100%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardlap.webp"
              className="absolute z-10 bottom-10 md:bottom-8 left-2 md:left-10
      w-[200px] h-[150px] md:w-[400px] md:h-[280px]
      hover:scale-110 transition-all duration-300"
              alt=""
            />
            <p
              className="absolute z-0 text-[100px] md:text-[165px] font-extrabold text-[#ffffff56]
      left-1 md:left-2 -top-10 md:-top-15"
            >
              LAPTOP
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl
      text-[#294955] cursor-pointer
      hover:bg-gray-200 hover:text-[#5496ad]
      transition-all duration-300"
            >
              BROWSE
            </button>
          </div>
        </div>

        {/* section 2 */}
        <div
          className="flex flex-row w-full md:w-[97%] place-self-center px-2 pt-2 md:px-4 md:pt-10 gap-2 md:gap-3
  overflow-x-auto md:overflow-x-visible
  snap-x snap-mandatory scrollbar-hide scroll-smooth"
        >
          {/* CARD 1 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 overflow-hidden relative 
    w-[80%] md:w-[50%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[50px]
    bg-[linear-gradient(135deg,#355C6A_-50%,#7eaebd_40%,#85afbf_100%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardps3.png"
              className="absolute z-10 -left-12 bottom-2 md:-bottom-2 md:-left-20 w-[320px] h-[180px] md:w-[650px] md:h-[330px] hover:scale-110 transition-all duration-300"
              alt=""
            />
            <p className="absolute -top-6 md:-top-9 right-4 md:right-8 text-[70px] md:text-[130px] text-[#ffffff56] font-extrabold">
              PLAY
            </p>
            <p className="absolute top-14 md:top-20 right-1 text-[50px] md:text-[80px] font-extrabold text-[#ffffff56]">
              STATION
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl text-[#294955]
      cursor-pointer hover:scale-99 transition-all duration-300
      hover:bg-gray-200 hover:text-[#5496ad]"
            >
              BROWSE
            </button>
          </div>

          {/* CARD 2 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 overflow-hidden relative
    w-[80%] md:w-[35%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[60px]
    bg-[radial-gradient(circle_at_center,#ffff_-90%,#7eaebd_80%,#85afbf_99%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardmouse.png"
              className="absolute z-11 top-0 -right-10 md:-right-20 w-[200px] h-[200px] md:w-[400px] md:h-[370px] hover:scale-110 transition-all duration-300"
              alt=""
            />
            <p className="absolute text-[90px] md:text-[120px] text-[#ffffff56] font-extrabold -top-5 md:-top-8 -left-2 md:left-4 z-10">
              MOUSE
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl text-[#294955]
      cursor-pointer hover:scale-99 transition-all duration-300
      hover:bg-gray-200 hover:text-[#5496ad]"
            >
              BROWSE
            </button>
          </div>

          {/* CARD 3 */}
          <div
            className="snap-center flex-shrink-0 md:flex-shrink-1 overflow-hidden relative
    w-[80%] md:w-[35%] h-[200px] md:h-[360px]
    rounded-[30px] md:rounded-[60px]
    bg-[radial-gradient(circle_at_center,#ffff_-90%,#7eaebd_80%,#85afbf_99%)]
    transition-all duration-300 hover:scale-99 md:hover:scale-99"
          >
            <img
              src="./assets/images/cardbt.png"
              className="absolute z-10 bottom-0 right-0 w-[200px] h-[160px] md:w-[350px] md:h-[330px]
      hover:scale-115 transition-all duration-300"
              alt=""
            />
            <p className="absolute z-0 text-[150px] md:text-[230px] font-extrabold text-[#ffffff56] md:bottom-1 -bottom-3 -left-20 -rotate-90">
              BS
            </p>
            <button
              className="absolute z-30 bottom-3 right-3 md:bottom-5 md:right-5 font-extrabold
      text-2xl md:text-3xl bg-[#ffffff]
      px-3 py-1.5 md:px-4 md:py-2.5
      rounded-3xl md:rounded-4xl text-[#294955]
      cursor-pointer hover:scale-99 transition-all duration-300
      hover:bg-gray-200 hover:text-[#5496ad]"
            >
              BROWSE
            </button>
          </div>
        </div>

        {/* ---------------------------
            BRAND MARQUEE (working)
           --------------------------- */}
        <div className="w-[97%] place-self-center py-15 md:py-40 px-5 md:px-10 overflow-hidden">
          <h1 className="place-self-center md:text-3xl font-bold opacity-90 font-mono underline text-[#1f3844] text-center">
            OUR BRAND PARTNERS
          </h1>

          <div className="relative w-full overflow-hidden md:mt-10">
            {/* marquee: the .marquee contains two identical groups for seamless looping */}
            <div className="marquee animate-marquee">
              {brandPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="marquee__group flex items-center gap-10 md:gap-20"
                >
                  <div className="w-[80px] h-[50px] md:w-[150px] md:h-[90px] flex justify-center items-center">
                    <img
                      className="w-fit h-auto grayscale hover:grayscale-0 opacity-70"
                      src={partner.imagelogo}
                      alt={partner.name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* add2 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[90%] place-self-center bg-[#000000] h-[480px] md:h-[450px] pb-2 md:pb-0">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-20 left-6 w-[320px] md:w-auto md:-top-20 md:left-30 cursor-pointer transition-all duration-300
             md:group-hover:scale-110 md:group-hover:-rotate-10
             md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
              src="./assets/images/shf.png"
              alt=""
            />
          </div>
          <div className="rightDiv w-full md:w-[55%] h-[50%] md:h-[70%] flex flex-col justify-center items-center border-[#ffffff1a] self-center ">
            <div className="flex flex-col items-start">
              <p className="text-3xl md:text-5xl text-[#0070bb] font-extrabold">
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
      </div>
    </>
  );
}
