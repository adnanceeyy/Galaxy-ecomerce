import React, { useEffect } from "react";
import Nav from "../components/nav";
import { IconStarFilled } from "@tabler/icons-react";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import {
  ProductDetails,
  ProductDetails2,
  ProductDetails3,
} from "../data/datas.json";

export default function AllProduct() {
  const adds = [
    { id: 1, add1: "./assets/images/add1.jpg" },
    { id: 2, add2: "./assets/images/add2.jpg" },
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
  const singleproduct = () => {
    window.location.href = "/singleproduct";
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <div className="h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] md:pb-[400px] fixed top-0">
      </div>
      <div className="w-[99.5%] place-self-center h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
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
        {/* Product */} {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails.map((product) => (
            <Link
              to={`/singleProduct/${product.id}`}
              key={product.id}
              className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
            >
              <div className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300">
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
            </Link>
          ))}
        </div>
        {/* add22 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#c0d6ff] h-[480px] md:h-[400px] pb-2 mb-10 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-8 place-self-center-safe w-[250px] md:w-[480px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10 md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
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
        {/* againproducts */} {/* Product */} {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails2.map((product2) => (
            <Link
              to={`/singleProduct/${product2.id}`}
              key={product2.id}
              className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
            >
              <div className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300">
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
            </Link>
          ))}
        </div>
        {/* add222 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#f2c0ff] h-[410px] md:h-[400px] pb-10 mb-10 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-24 place-self-center w-[350px] md:w-[600px] md:-top-44 md:left-30 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10 md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
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
        {/* again and againproducts */} {/* Product */} {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails3.map((product3) => (
            <Link
              to={`/singleProduct/${product3.id}`}
              key={product3.id}
              className="snap-start flex-shrink-0 md:flex-shrink-1 md:block md:col-auto"
            >
              <div className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1 cursor-pointer hover:shadow-lg hover:shadow-gray-400 transition-all duration-300">
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
            </Link>
          ))}
        </div>
        {/* add223 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#ff7e7e] h-[410px] md:h-[400px] pb-10 md:pb-1 mb-2 md:mb-32 md:mt-32">
          <div className="leftDiv relative w-[100%] md:w-[45%] h-[50%] md:h-full">
            <img
              className="absolute -top-6 place-self-center w-[220px] md:w-[450px] md:-top-14 md:left-40 cursor-pointer transition-all duration-300 md:group-hover:scale-110 md:group-hover:-rotate-10 md:group-hover:drop-shadow-[0px_0px_0px_rgba(240,240,240,0.9)]"
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
