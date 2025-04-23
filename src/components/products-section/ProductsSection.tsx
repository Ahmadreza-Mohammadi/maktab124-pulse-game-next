"use client";

import { ACCESS_TOKEN, API_KEY, BASE_URL } from "@/api/API";
import { formatPrice, truncateEnd } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";

function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  const maxTitleLength = 24;

  // Category translations
  const categoryTranslations: { [key: string]: string } = {
    game: "بازی",
    keyboard: "کیبورد",
    console: "کنسول",
    mouse: "ماوس",
    headset: "هدست",
    monitor: "مانیتور",
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products`, {
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${ACCESS_TOKEN}`,
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

  return (
    <div className="mt-12 bg-gray-950 py-12">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8 animate-fade-in">
        محصولات
      </h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {randomProducts.length === 0 && (
          <div className="col-span-full text-center">
            <span className="text-gray-400 text-lg animate-pulse">
              در حال بارگذاری...
            </span>
          </div>
        )}
        {randomProducts.map((product: any, index: number) => (
          <div
            key={product.id}
            className="relative bg-gray-900 rounded-3xl overflow-hidden flex flex-col border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Image Section */}
            <div className="relative h-52 w-full overflow-hidden">
              <img
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                src={product.img}
                alt={product.name || product.title || "Product Image"}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              {/* Category Label */}
              <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {categoryTranslations[product.category] || "نامشخص"}
              </span>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-4 flex-grow bg-gray-900">
              <h1
                className="text-lg font-bold text-white text-center truncate"
                title={product.title}
              >
                {truncateEnd(product.title, maxTitleLength)}
              </h1>

              {/* Info Section */}
              <div className="flex flex-col gap-2 text-sm text-gray-300">
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
                  <span>قیمت: {formatPrice(product.price)}</span>
                  <span>
                    تخفیف:{" "}
                    {product.discount ? `${product.discount}%` : "بدون تخفیف"}
                  </span>
                </div>
                {product.category === "game" && (
                  <div className="flex justify-between items-center">
                    <span>پلتفرم:</span>
                    <span className="truncate">
                      {product.platforms || "نامشخص"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>سازنده:</span>
                  <span className="truncate">
                    {product.creator || "نامشخص"}
                  </span>
                </div>
              </div>

              {/* Button */}
              <button
                className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                aria-label={`افزودن ${product.title} به سبد خرید`}
              >
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsSection;
