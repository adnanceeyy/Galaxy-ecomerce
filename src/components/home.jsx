import {
  Icon24Hours,
  IconChevronRight,
  IconHeadset,
  IconStarFilled,
  IconWorldHeart,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { newProductDetails } from "../data/datas.json";
import Footer from "./footer";
import { useEffect } from "react";
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
  const brandPartners = [
    {
    id: 1,
    name: "Boat",
    imagelogo: "/assets/images/boatlogo.webp",
    linka: "https://www.boat-lifestyle.com/"
  },
  {
    id: 2,
    name: "Salpido",
    imagelogo: "/assets/images/salpidologo.webp",
    linka: "https://salpido.com/"
  },
  {
    id: 3,
    name: "Sony",
    imagelogo: "/assets/images/Sonylogo.webp",
    linka: "https://www.sony.com/in/"
  },
  {
    id: 4,
    name: "Samsung",
    imagelogo: "/assets/images/samsunglogo.webp",
    linka: "https://www.samsung.com/in/"
  },
  {
    id: 5,
    name: "Lenovo",
    imagelogo: "/assets/images/lenovologo.webp",
    linka: "https://www.lenovo.com/in/en/"
  },
  {
    id: 1,
    name: "Boat",
    imagelogo: "/assets/images/boatlogo.webp",
    linka: "https://www.boat-lifestyle.com/"
  },
  {
    id: 2,
    name: "Salpido",
    imagelogo: "/assets/images/salpidologo.webp",
    linka: "https://salpido.com/"
  },
  {
    id: 3,
    name: "Sony",
    imagelogo: "/assets/images/Sonylogo.webp",
    linka: "https://www.sony.com/in/"
  },
  {
    id: 4,
    name: "Samsung",
    imagelogo: "/assets/images/samsunglogo.webp",
    linka: "https://www.samsung.com/in/"
  },
  {
    id: 5,
    name: "Lenovo",
    imagelogo: "/assets/images/lenovologo.webp",
    linka: "https://www.lenovo.com/in/en/"
  },
  {
    id: 1,
    name: "Boat",
    imagelogo: "/assets/images/boatlogo.webp",
    linka: "https://www.boat-lifestyle.com/"
  },
  {
    id: 2,
    name: "Salpido",
    imagelogo: "/assets/images/salpidologo.webp",
    linka: "https://salpido.com/"
  },
  {
    id: 3,
    name: "Sony",
    imagelogo: "/assets/images/Sonylogo.webp",
    linka: "https://www.sony.com/in/"
  },
  {
    id: 4,
    name: "Samsung",
    imagelogo: "/assets/images/samsunglogo.webp",
    linka: "https://www.samsung.com/in/"
  },
  {
    id: 5,
    name: "Lenovo",
    imagelogo: "/assets/images/lenovologo.webp",
    linka: "https://www.lenovo.com/in/en/"
  }
  ];

  const allProductCatogery = [
    {
      id: 1,
      productName: "Headsets",
      productimage: "./assets/images/chf.webp",
    },
    {
      id: 2,
      productName: "computers",
      productimage: "./assets/images/clap.webp",
    },
    {
      id: 3,
      productName: "Phones",
      productimage: "./assets/images/cphone.webp",
    },
    { id: 4, productName: "Watches", productimage: "./assets/images/cwh.webp" },
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
      productName: "electronics ",
      productimage: "./assets/images/projector.png",
    },
    {
      id: 8,
      productName: "Smart TV",
      productimage: "./assets/images/ctv.webp",
    },
    { id: 9, productName: "Games", productimage: "./assets/images/cc.webp" },
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
      productName: "cameras",
      productimage: "./assets/images/Ccamera.webp",
    },
  ];
  const ProductDetails = newProductDetails;

  const singleproduct = () => {
    window.location.href = "/singleproduct";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-[#7db9d1] to-[#5294ad] pt-16 md:pt-32 fixed">
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
              24 website
              <br />
              support
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

          <div className=" hidden md:flex w-[130px] h-[40px] md:w-[240px] md:h-[95px] bg-white rounded-[90px] flex items-center shadow-md hover:shadow-lg transition-all duration-300">
            <div className="h-[90%] w-[30px] px-1 md:h-[80%] md:w-[80px] bg-gray-200 rounded-full flex items-center justify-center ml-0.5 md:ml-3">
              <IconWorldHeart className="text-gray-800 size-9 md:size-12" />
            </div>
            <p className="text-left text-[9px] md:text-lg font-semibold ml-1 md:ml-3 leading-tight text-gray-800">
              99999+ <br /> customers
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-50 top-30 md:top-65 md:pb-20 mb-76 p-1 md:p-5 pb-3
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
        {/* catogarios */}
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-11 py-2 md:py-4 px-2 md:px-3">
            {allProductCatogery.map((catogery) => (
              <Link to={`/catogerypages/${catogery.id}`}>
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
              </Link>
            ))}
          </div>
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

        {/* Products Grid */}
        <div
          className="
    flex md:grid gap-3 md:gap-5 
    overflow-x-auto md:overflow-x-visible 
    snap-x snap-mandatory scrollbar-hide 
    md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6
    px-2 md:px-4 py-2
  "
        >
          {newProductDetails.map((product) => (
            <Link
              to={`/singleProduct/${product.id}`}
              key={product.id}
              className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
            >
              <div className="bg-[#f7fbff] w-[160px] md:w-full h-[170px] md:h-[365px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300">
                <div
                  className={`absolute right-1.5 md:right-4 top-1.5 md:top-3 font-semibold text-gray-200 text-[8px] md:text-[13px] ${
                    product.isNew ? "bg-[#c20000e5]" : "bg-green-500"
                  } px-1 md:px-2 rounded-[7px] md:rounded-3xl animate-pulse`}
                >
                  {product.isNew ? "New" : "Fresh"}
                </div>
                <div className="w-full h-[110px] md:h-[240px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                  <img
                    className="h-full object-contain w-full"
                    src={product.productImg}
                    alt={product.productName}
                  />
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
            </Link>
          ))}
        </div>

        {/* sections (section1) */}
        {/* section 1 */}
          <div
            key={allProductCatogery.id}
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
              <Link to={`/catogerypages/4`}>
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
              </Link>
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
             <Link to={`/catogerypages/1`}>
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
              </Link>
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
              <Link to={`/catogerypages/9`}>
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
              </Link>
            </div>
          </div>
        {/* section 2 */}
          <div
            key={allProductCatogery.id}
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
              <Link to={`/catogerypages/9`}>
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
              </Link>
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
              <Link to={`/catogerypages/6`}>
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
              </Link>
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
              <Link to={`/catogerypages/5`}>
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
              </Link>
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
                    <Link
                    to={partner.linka}>
                    <img
                      className="w-fit h-auto grayscale hover:grayscale-0 opacity-70"
                      src={partner.imagelogo}
                      alt={partner.name}
                    />
                    </Link>
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
              className="absolute -top-20 left-3 w-[320px] md:w-auto md:-top-20 md:left-30 cursor-pointer transition-all duration-300
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
              <Link to={`/allProduct`}>
                <button className="cursor-pointer text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#0065a8] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#00548b] transition-all duration-300 mt-4">
                  SHOP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
