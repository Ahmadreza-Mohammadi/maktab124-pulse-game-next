"use client";

import { ACCESS_TOKEN, API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa } from "@/utils/helper";
import axios from "axios";
import { useState, useEffect } from "react";

// این تابع در صورتی که طول متن از maxLength بیشتر باشد، فقط بخشی از شروع متن را به همراه "..." نشان می‌دهد.
function truncateEnd(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

function Offers() {
  const [products, setProducts] = useState<any[]>([]);
  const maxTitleLength = 20; // حداکثر تعداد کاراکتر قابل نمایش قبل از افزودن "..."

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

  // مرتب‌سازی محصولات: ابتدا بر اساس تخفیف (کاهشی) و سپس بر اساس طول عنوان (افزایشی)
  const topDiscounts = products
    .sort((a: any, b: any) => {
      if (b.discount !== a.discount) {
        return b.discount - a.discount;
      }
      return a.title.length - b.title.length;
    })
    .slice(0, 8);

  return (
    <div className="mt-16 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 animate-fade-in">
        جشنواره تخفیف پالس گیم
      </h1>
      {/* کانتینر اسلایدر افقی */}
      <div className="w-full overflow-x-auto">
        <div className="flex gap-8 p-8 snap-x">
          {products.length === 0 && (
            <span className="text-gray-500 text-lg animate-pulse">
              در حال بارگذاری...
            </span>
          )}
          {topDiscounts.map((product: any, index: number) => (
            <div
              key={product.title}
              className="snap-center flex-none p-4 w-64 h-112 bg-white shadow-lg rounded-xl flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                className="h-68 w-full object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                src={product.img}
                alt={product.title}
              />
              <div className="flex flex-col gap-4 items-center mt-4">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="font-bold text-xl text-gray-800 text-center w-full"
                    title={product.title} // عنوان کامل را در صورت hover نمایش می‌دهد
                  >
                    {truncateEnd(product.title, maxTitleLength)}
                  </span>
                  <span className="text-red-500 font-semibold">
                    {digitsEnToFa(product.discount)}٪ تخفیف
                  </span>
                </div>
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
