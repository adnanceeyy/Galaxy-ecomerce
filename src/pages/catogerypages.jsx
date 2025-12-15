import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  newProductDetails,
  ProductDetails,
  ProductDetails2,
  ProductDetails3,
} from "../data/datas.json";
import { IconStarFilled } from "@tabler/icons-react";

export default function CatogeryPages() {
  const { id } = useParams(); // category id from URL
  const categoryId = Number(id);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const allProducts = [
      ...newProductDetails,
      ...ProductDetails,
      ...ProductDetails2,
      ...ProductDetails3,
    ];

    const filter = allProducts.filter(
      (item) => Number(item.catogeryId) === categoryId
    );

    setFilteredProducts(filter);
  }, [categoryId]);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#7db9d1] to-[#5294ad]" />
      <div className="w-[99.5%] place-self-center min-h-screen h-auto rounded-[30px] md:rounded-[80px] bg-[#f7fbff] relative z-10 top-15 md:top-30 p-1 md:p-5 overflow-hidden shadow-[gray] shadow-lg shadow-black mb-60 md:mb-96">
        {/* bigimg */}
        <div className="w-full place-self-center h-[110px] md:h-[400px] rounded-[28px] md:rounded-[60px] overflow-hidden">
          <img
            src="/assets/images/add2.jpg"
            className="w-full h-full"
            alt="img vannitilla"
          />
        </div>
        <div className="w-full min-h-screen p-1 md:p-5 mt-1 md:px-10">
          {filteredProducts.length === 0 ? (
            <p className="text-lg text-red-500">No Products in this Category</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-4">
              {filteredProducts.map((product) => (
                <Link to={`/singleProduct/${product.id}`} key={product.id}>
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
          )}
        </div>
      </div>
    </>
  );
}
