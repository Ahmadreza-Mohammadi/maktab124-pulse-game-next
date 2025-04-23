"use client";

import { ACCESS_TOKEN, API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, truncateEnd } from "@/utils/helper";
import axios from "axios";
import { useState, useEffect } from "react";


function Offers() {
  const [products, setProducts] = useState<any[]>([]);
  const maxTitleLength = 18; // حداکثر تعداد کاراکتر قابل نمایش

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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  // مرتب‌سازی محصولات بر اساس تخفیف (کاهشی) و سپس طول عنوان (افزایشی)
  const sortedProducts = products.sort((a: any, b: any) => {
    return b.discount !== a.discount
      ? b.discount - a.discount
      : a.title.length - b.title.length;
  });

  return (
    <div className="mt-12 flex flex-col items-center bg-gray-900 ">
      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        جشنواره تخفیف پالس گیم
      </h1>
      <div className="w-full overflow-x-auto hide-scrollbar">
        <div className="flex justify-center gap-8 p-8 snap-x">
          {products.length === 0 && (
            <span className="text-gray-400 text-lg">در حال بارگذاری...</span>
          )}
          {sortedProducts.map((product: any, index: number) => (
            <div
              key={product.title}
              className="snap-center flex-none p-4 w-64 h-112 bg-gray-800 shadow-lg rounded-xl flex flex-col justify-between transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                className="h-68 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                src={product.img}
                alt={product.title}
              />
              <div className="flex flex-col gap-4 items-center mt-4">
                <div className="flex flex-col ">
                  <span className="font-bold text-xl text-gray-100 text-center">
                    {product.category === "game" && "بازی"}
                    {product.category === "console" && "کنسول"}
                    {product.category === "keyboard" && "کیبورد"}
                    {product.category === "mouse" && "ماوس"}
                    {product.category === "monitor" && "مانیتور"}
                    {product.category === "headset" && "هدست"}
                    {product.category === "chair" && "صندلی"}
                  </span>
                  <span className="font-bold text-lg text-gray-100 text-center">
                    {truncateEnd(product.title, maxTitleLength)}
                  </span>
                </div>
                <span className="text-red-400 font-semibold">
                  {digitsEnToFa(product.discount)}٪ تخفیف
                </span>
                <button className="bg-blue-500 text-white w-1/2 p-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                  مشاهده محصول
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Offers;
