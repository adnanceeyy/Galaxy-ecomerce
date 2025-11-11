import React from "react";
import Nav from "../components/nav";
import { IconStarFilled } from "@tabler/icons-react";

export default function AllProduct() {
  const adds = [
    {
      id: 1,
      add1: "./assets/images/add1.jpg"
    },
    {
      id: 2,
      add1: "./assets/images/add2.jpg"
    },
  ];
  const allProductCatogery = [
    {
      id: 1,
      productName: "Headsets",
      productimage: "https://imgs.search.brave.com/hwhINl7lrU4aN3K1z6cJskxCEIPrh46VA7gnYbsatp8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NDM2LzkyNS9zbWFs/bC9kcmFtYXRpYy1t/b2Rlcm4tZ2FtaW5n/LWhlYWRwaG9uZXMt/d2lyZWxlc3MtYmxh/Y2staXNvbGF0ZWQt/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1hdXRoZW50aWMt/cG5nLnBuZw",
    },
    {
      id: 2,
      productName: "Laptops",
      productimage: "https://imgs.search.brave.com/2UKaIGpUao5JPaG6iKQyOswRa5qcSN8wlTDKfh_DCPQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMTgv/NzQyLzk2Ny9zbWFs/bC9sYXB0b3AtY29t/cHV0ZXItd2l0aC1i/bGFuay10cmFuc3Bh/cmVudC1zY3JlZW4t/YW5kLWJhY2tncm91/bmQtZm9ybWF0LXBu/Zy5wbmc",
    },   
    {
      id: 3,
      productName: "Phones",
      productimage:"https://imgs.search.brave.com/dJ_B2SbaiRYylc27G_vnbUbV5vDykPY-xIv53D1zSL4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTUvQXBw/bGUtaVBob25lLTEy/LUJhY2tncm91bmQt/UE5HLnBuZw",
    },
     {
      id: 4,
      productName: "Watches",
      productimage: "https://imgs.search.brave.com/D6xhUkSadl6ANMY5EQ4LFE_f3i8bPikmGcec-1vBTiY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTEv/MzQwLzMxOC9zbWFs/bC9ibHVldG9vdGgt/c21hcnQtd2F0Y2gt/b24tdHJhbnNwYXJl/bnQtYmFja2dyb3Vu/ZC1wbmcucG5n",
    },
    {
      id: 5,
      productName: "Speakers",
      productimage:"https://imgs.search.brave.com/FTBIDT-D6Mu3kCfMyfXQeWZ_lQPouf9jOCQazd7FjhA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvNy9CbGFj/ay1CbHVldG9vdGgt/U3BlYWtlci1CYWNr/Z3JvdW5kLVBORy5w/bmc",
    },
    {
      id: 6,
      productName: "Mouses",
      productimage:"https://imgs.search.brave.com/6dbnvBUhRro_Ty1u6iCznIu5JeLO590C3FBxYoLTDRQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMzYv/MTEyLzY5MS9zbWFs/bC9haS1nZW5lcmF0/ZWQtY29tcHV0ZXIt/bW91c2UtaXNvbGF0/ZWQtb24tdHJhbnNw/YXJlbnQtYmFja2dy/b3VuZC1mcmVlLXBu/Zy5wbmc",
    },
    {
      id: 7,
      productName: "Air Pods",
      productimage: "https://imgs.search.brave.com/EL-KpxbN4zudnJKiR5TLPUjxztr5SaJjIu3WiA13sNg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDgv/NDE0LzMwMi9zbWFs/bC9haXJwb2RzLWlj/b24tYWdhaW5zdC10/cmFuc3BhcmVudC1i/YWNrZ3JvdW5kLWdl/bmVyYXRlZC1ieS1h/aS1mcmVlLXBuZy5w/bmc",
    },
    {
      id: 8,
      productName: "Smart TV",
      productimage: "https://imgs.search.brave.com/RSNgwnC-F6RJlrL1wZKj14GGfezT0XC5skHI8wEMvY0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjYv/Njc2LzMyNS9zbWFs/bC8zZC1yZW5kZXJp/bmctb2YtZmxhdC1z/Y3JlZW4tdHYtcG5n/LnBuZw",
    },   
    {
      id: 9,
      productName: "Phones",
      productimage:"https://imgs.search.brave.com/dJ_B2SbaiRYylc27G_vnbUbV5vDykPY-xIv53D1zSL4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMTUvQXBw/bGUtaVBob25lLTEy/LUJhY2tncm91bmQt/UE5HLnBuZw",
    },
     {
      id: 10,
      productName: "RC Car",
      productimage: "https://imgs.search.brave.com/fODU1QJqhyqnBxLjJeaeT4FyO8tYsbJUYZKnNKR8Mkc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZWNv/LWZyaWVuZGx5LXJj/LWNhci1wbmctMDYy/NTIwMjQtdGY4NWpk/N3BpMndtYjQwMi5w/bmc",
    },
    {
      id: 11,
      productName: "Keybords",
      productimage: "https://imgs.search.brave.com/X9QbEwh3UAsBW-LAidT5MaEyR7Ad5vfsi7hpnC4OusE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NTMwLzg3OC9zbWFs/bC9tZWNoYW5pY2Fs/LWtleWJvYXJkLXdp/dGgtcmdiLWxpZ2h0/aW5nLWFuZC1jdXN0/b20ta2V5Y2Fwcy1m/b3ItZ2FtaW5nLXBu/Zy5wbmc",
    },   
    {
      id: 12,
      productName: "Tablets",
      productimage:"https://imgs.search.brave.com/gphHr-V3EDCARKWBO8fI7ntepxLDdW0Mz36QPtrqQsI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/NDQ5LzI2Ni9zbWFs/bC9tb2Rlcm4tZGln/aXRhbC10YWJsZXQt/ZmVhdHVyaW5nLWEt/Y2xlYW4td2hpdGUt/c2NyZWVuLWZvci12/ZXJzYXRpbGUtdXNl/LWZyZWUtcG5nLnBu/Zw",
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
      mrPrice: 999,
      productImg: "/assets/images/stv.png",
    },
    {
      id: 2,
      productName: "Mac Book",
      productDescription: "Multicolor, With Glass, Standard",
      productRating: 4.6,
      totalSale: 2130,
      offerPrice: 159999,
      mrPrice: 1799,
      productImg: "/assets/images/plaptop.png",
    },
    {
      id: 3,
      productName: "iphone 11",
      productDescription: "Multicolor, With Glass, Standard",
      productRating: 4.4,
      totalSale: 1985,
      offerPrice: 44999,
      mrPrice: 2199,
      productImg: "/assets/images/pmobile.png",
    },
    {
      id: 4,
      productName: "Nickon Cam",
      productDescription: "Portable, 4K, 1800HD",
      productRating: 4.3,
      totalSale: 1670,
      offerPrice: 19999,
      mrPrice: 1399,
      productImg: "/assets/images/pcamera.png",
    },
    {
      id: 5,
      productName: "Drone",
      productDescription: "1km distance, wide viwe, 4K",
      productRating: 4.5,
      totalSale: 1320,
      offerPrice: 3799,
      mrPrice: 1199,
      productImg: "/assets/images/pdron.png",
    },
    {
      id: 6,
      productName: "HP Monitor",
      productDescription: "HDR, 12 inch, multiple colors",
      productRating: 4.7,
      totalSale: 1048,
      offerPrice: 11899,
      mrPrice: 2499,
      productImg: "/assets/images/phpmonitor.png",
    },
    {
      id: 7,
      productName: "Drimmer",
      productDescription: "Multicolor, portable, Standard",
      productRating: 4.2,
      totalSale: 1244,
      offerPrice: 899,
      mrPrice: 999,
      productImg: "/assets/images/pdrimmer.png",
    },
    {
      id: 8,
      productName: "Projector",
      productDescription: "10 inch, 4K, HDR, Compact Case",
      productRating: 4.6,
      totalSale: 2130,
      offerPrice: 12099,
      mrPrice: 1799,
      productImg: "/assets/images/projector.png",
    },
    {
      id: 9,
      productName: "Gaming CPU",
      productDescription: "RGB Lighting, Tech Accessories, Custom Cooling",
      productRating: 4.4,
      totalSale: 1985,
      offerPrice: 150000,
      mrPrice: 2199,
      productImg: "/assets/images/pcpu.png",
    },
    {
      id: 10,
      productName: "Party Speaker",
      productDescription: "Portable, 100W, 10H Playtime",
      productRating: 4.3,
      totalSale: 1670,
      offerPrice: 3999,
      mrPrice: 1399,
      productImg: "/assets/images/pparty.webp",
    },
    {
      id: 11,
      productName: "Protection Case",
      productDescription: "ultra protection, transparent",
      productRating: 4.5,
      totalSale: 1320,
      offerPrice: 399,
      mrPrice: 1199,
      productImg: "/assets/images/pcase.png",
    },
    {
      id: 13,
      productName: "iphone 12",
      productDescription: "512 GB, Multicolor, 23 MP",
      productRating: 4.7,
      totalSale: 1048,
      offerPrice: 77899,
      mrPrice: 2499,
      productImg: "/assets/images/pip12.png",
    },
  ];
  return (
    <>
      <div className="relative h-screen w-full bg-gradient-to-br from-[#7db9d1] to-[#5294ad] overflow-x-hidden px-1.5 md:px-5">
        <div className="fixed top-0 left-0 w-full z-100">
          <Nav />
        </div>
        <div className="w-[99.5%] place-self-center h-auto rounded-t-[30px] md:rounded-t-[80px] bg-[#f7fbff] relative z-50 top-15 md:top-30 p-1 md:p-5 overflow-hidden">
          {/* bigimg */}
          <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
            {adds.map((ad) => (
            <img
            key={ad.id}
              src={ad.add1}
              className="w-full h-full"
              alt="img vannitilla"
            />
            ))}
          </div>
          {/* catogarios */}
          <div className="flex gap-4 md:gap-11 py-2 md:py-5 place-self-center">
            {allProductCatogery.map((catogery) => (
            <div key={catogery.id} className="place-self-center">
              <div className="bg-blue-200 rounded-full w-11 md:w-25 h-11 md:h-25 border border-gray-400 place-self-center overflow-hidden">
                <img
                  src={catogery.productimage}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-[10px] md:text-[20px] place-self-center font-medium md:font-semibold">{catogery.productName}</p>
            </div>
            ))}
          </div>
          {/* Product */}
                  {/* products grid */}
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-2 md:px-2 mt-3 mb-10">
          {ProductDetails.map((product) => (
            <div
              key={product.id}
              className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1"
            >
              <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product.productImg} alt="" />
              </div>
              <div>
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

                <h1 className="text-[18px] md:text-[25px] font-medium leading-tight">
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
              className="absolute -top-8 left-1 w-[300px] md:w-[550px] md:-top-26 md:left-30 cursor-pointer transition-all duration-300
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
        <div className="grid gap-2 md:gap-7 md:w-[97%] place-self-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-2 md:px-2 mt-3 mb-10 md:mb-32">
          {ProductDetails.map((product) => (
            <div
              key={product.id}
              className="bg-[#f7fbff] w-full h-[200px] md:h-[370px] rounded-2xl md:rounded-4xl border relative border-gray-200 p-0.5 md:p-1"
            >
              <div className="w-full h-[135px] md:h-[250px] rounded-t-[13px] md:rounded-t-[28px] flex items-center justify-center bg-gray-200">
                <img className="h-full" src={product.productImg} alt="" />
              </div>
              <div>
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

                <h1 className="text-[18px] md:text-[25px] font-medium leading-tight">
                  ₹{product.offerPrice}
                </h1>
              </div>
            </div>
          ))}
        </div>

                {/* add222 */}
        <div className="flex flex-col md:flex-row mx-10 rounded-[30px] group w-[96%] md:w-[80%] place-self-center bg-[#f2c0ff] h-[400px] md:h-[400px] pb-2 mb-10 md:mb-32 md:mt-32">
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
              <button className="text-3xl md:text-4xl font-extrabold px-6 py-2 rounded-full text-[#672f74] bg-[#ffffffea] hover:text-[#ffffffea] hover:bg-[#00548b] transition-all duration-300 mt-4">
                SHOP
              </button>
            </div>
          </div>
        </div>

        </div>
      </div>
    </>
  );
}
