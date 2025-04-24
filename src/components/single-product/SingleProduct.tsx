"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, formatPrice } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { categoryTranslations } from "@/components/constants/Constants";
import Loading from "@/components/loading/Loading";

interface SingleProductProps {
  id: string;
}

function SingleProduct({ id }: SingleProductProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products/${id}`, {
          headers: {
            api_key: API_KEY,
          },
        });
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center mr-64">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <h1 className="text-white text-2xl">محصول یافت نشد</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section */}
            <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={product.img}
                alt={product.title}
              />
              {/* Category Label */}
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full">
                {categoryTranslations[product.category] || "نامشخص"}
              </span>
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-6">
              <h1 className="text-3xl font-bold text-white">{product.title}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-white mr-2">
                    {product.rating || "بدون امتیاز"}
                  </span>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    product.stock
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {product.stock ? "موجود" : "ناموجود"}
                </span>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">
                  توضیحات محصول
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {product.description || "توضیحات محصول در دسترس نیست."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">قیمت</p>
                  <p className="text-2xl font-bold text-white">
                    {formatPrice(product.price)}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">تخفیف</p>
                  <p className="text-2xl font-bold text-white">
                    {product.discount
                      ? `${digitsEnToFa(product.discount)}%`
                      : "بدون تخفیف"}
                  </p>
                </div>
              </div>

              {product.category === "game" && (
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">پلتفرم</p>
                  <p className="text-white">{product.platforms || "نامشخص"}</p>
                </div>
              )}

              <div className="bg-gray-700/50 p-4 rounded-xl">
                <p className="text-gray-400 mb-2">سازنده</p>
                <p className="text-white">{product.creator || "نامشخص"}</p>
              </div>

              <button className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                افزودن به سبد خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
