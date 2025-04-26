"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, truncateEnd, formatPrice } from "@/utils/helper";
import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../loading/Loading";

function Offers() {
  const [products, setProducts] = useState<any[]>([]);
  const maxTitleLength = 18;

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
    <section
      className="py-12 bg-gradient-to-b from-blue-950 to-blue-800"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-blue-200 mb-8 animate-fade-in">
          جشنواره تخفیف پالس گیم
        </h2>
        <div className="w-full overflow-x-auto hide-scrollbar">
          <div className="flex justify-center gap-8 p-8 snap-x">
            {products.length === 0 && (
              <div className="py-16 mr-56">
                <Loading />
              </div>
            )}
            {sortedProducts.map((product: any, index: number) => (
              <div
                key={product.title}
                className="snap-center flex-none w-72 bg-blue-900 rounded-3xl overflow-hidden border border-blue-600/50 hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 hover:rotate-3"
                    src={product.img}
                    alt={product.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full font-bold shadow-lg">
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
                  <button className="mt-4 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200">
                    مشاهده محصول
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Offers;
