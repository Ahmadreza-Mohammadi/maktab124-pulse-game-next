"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, truncateEnd, formatPrice } from "@/utils/helper";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Loading from "../../loading/Loading";
import { useRouter } from "next/navigation";

function Offers() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const maxTitleLength = 18;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  function getSingleProduct(id: number) {
    router.push(`/single-product/${id}`);
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products`, {
          headers: {
            api_key: API_KEY,
          },
        });
        setProducts(res.data.records);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  const sortedProducts = products.sort((a: any, b: any) => {
    return b.discount !== a.discount
      ? b.discount - a.discount
      : a.title.length - b.title.length;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-blue-950 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-blue-200 mb-4 animate-fade-in">
            جشنواره تخفیف پالس گیم
          </h2>
          <p className="text-blue-300 text-lg">
            بهترین پیشنهادات با بیشترین تخفیف
          </p>
        </div>

        <div className="relative group">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500/90 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] hover:scale-110 cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto hide-scrollbar"
          >
            <div className="flex gap-6 p-4">
              {products.length === 0 && (
                <div className="py-16 mr-128">
                  <Loading />
                </div>
              )}
              {sortedProducts.map((product: any, index: number) => (
                <div
                  key={product.title}
                  className="flex-none w-80 bg-blue-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-600/30 hover:border-blue-400/50 transition-all cursor-pointer duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-2 animate-slide-up group"
                  onClick={() => getSingleProduct(product.id)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      src={product.img}
                      alt={product.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full font-bold shadow-lg">
                      {digitsEnToFa(product.discount)}٪ تخفیف
                    </div>
                  </div>
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <span className="font-bold text-xl text-blue-200">
                        {product.category === "game" && "بازی"}
                        {product.category === "console" && "کنسول"}
                        {product.category === "keyboard" && "کیبورد"}
                        {product.category === "mouse" && "ماوس"}
                        {product.category === "monitor" && "مانیتور"}
                        {product.category === "headset" && "هدست"}
                        {product.category === "chair" && "صندلی"}
                      </span>
                      <span className="font-bold text-lg text-blue-200">
                        {truncateEnd(product.title, maxTitleLength)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>قیمت اصلی:</span>
                      <span className="line-through text-sm">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-blue-200 font-bold">
                      <span>قیمت با تخفیف:</span>
                      <span>
                        {formatPrice(
                          product.price * (1 - product.discount / 100)
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => getSingleProduct(product.id)}
                      className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl font-semibold cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    >
                      مشاهده محصول
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-blue-500/90 hover:bg-blue-600 text-white p-4 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.7)] hover:scale-110 cursor-pointer opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Offers;
