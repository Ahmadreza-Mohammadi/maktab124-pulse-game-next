"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { formatPrice, truncateEnd } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryTranslations } from "@/components/constants/Constants";
import Loading from "@/components/loading/Loading";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const router = useRouter();

  const maxTitleLength = 24;
  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products`, {
          headers: {
            api_key: API_KEY,
          },
        });
        setProducts(res.data.records);

        // Shuffle and pick 8 random products
        const shuffled = res.data.records.sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 8));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  function getSingleProduct(id: number) {
    router.push(`/single-product/${id}`);
  }

  return (
    <section
      className="py-12 bg-gradient-to-b from-blue-950 to-blue-800"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-200 mb-8 animate-fade-in">
          محصولات
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomProducts.length === 0 && (
            <div className="py-16 mr-134">
              <Loading />
            </div>
          )}
          {randomProducts.map((product: any, index: number) => (
            <div
              onClick={() => getSingleProduct(product.id)}
              key={product.id}
              className="relative cursor-pointer bg-blue-900 rounded-3xl overflow-hidden flex flex-col border border-blue-600/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 hover:rotate-3"
                  src={product.img}
                  alt={product.title || "Product Image"}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                {/* Category Label */}
                <span className="absolute bottom-3 left-3 bg-blue-500 text-white text-s font-semibold px-2.5 py-1 rounded-full">
                  {categoryTranslations[product.category] || "نامشخص"}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col gap-4 flex-grow">
                <h1
                  className="text-lg font-bold text-blue-200 text-center truncate"
                  title={product.title}
                >
                  {truncateEnd(product.title, maxTitleLength)}
                </h1>

                {/* Info Section */}
                <div className="flex flex-col gap-2 text-[16px] text-gray-400">
                  <div className="flex justify-between items-center">
                    <span>
                      امتیاز:{" "}
                      <span className="text-yellow-400">
                        {product.rating || "بدون امتیاز"}
                      </span>
                    </span>
                    <span>
                      وضعیت:{" "}
                      <span
                        className={
                          product.stock ? "text-green-400" : "text-red-400"
                        }
                      >
                        {product.stock ? "موجود" : "ناموجود"}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>قیمت:</span>
                    <span className="text-blue-200 font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="flex justify-between w-full">
                      <span>سازنده:</span>
                      <span className="text-blue-200">
                        {product.creator || "نامشخص"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getSingleProduct(product.id);
                  }}
                  className="mt-auto bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push("/products")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-1 cursor-pointer"
        >
          مشاهده همه محصولات
        </button>
      </div>
    </section>
  );
}

export default ProductsSection;
