"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, formatPrice } from "@/utils/helper";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { categoryTranslations } from "@/components/constants/Constants";
import Loading from "@/components/loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "./styles.css";
import BackButton from "../shared/BackButton";

interface SingleProductProps {
  id: string;
}

function SingleProduct({ id }: SingleProductProps) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");

  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products/${id}`, {
          headers: {
            api_key: API_KEY,
          },
        });
        setProduct(res.data);
        if (
          res.data.platforms &&
          Array.isArray(res.data.platforms) &&
          res.data.platforms.length > 0
        ) {
          setSelectedPlatform(res.data.platforms[0]);
        }
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

  // Create an array of images - if there's only one image, use it, otherwise use the images array
  const images = Array.isArray(product.img) ? product.img : [product.img];
  const hasPlatforms = product.category === "game" && product.platforms;

  return (
   <>
    <div className="min-h-screen bg-gray-900 py-32">
      <div className="max-w-7xl mx-auto px-4">
   <BackButton />
        <div className="bg-gray-800 rounded-3xl overflow-hidden border border-gray-700/50 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Section with Swiper */}
            <div className="space-y-6">
              <div className="relative h-[500px] w-full rounded-2xl overflow-hidden">
                <Swiper
                  spaceBetween={30}
                  effect={"fade"}
                  navigation={true}
                  pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  modules={[EffectFade, Navigation, Pagination, Autoplay]}
                  className="mySwiper"
                >
                  {images.map((image: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="relative h-[500px] group">
                        <img
                          className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                          src={image}
                          alt={`${product.title} - تصویر ${index + 1}`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Category Label */}
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full z-10">
                  {categoryTranslations[product.category] || "نامشخص"}
                </span>
              </div>

              {/* Description below images */}
              <div className="bg-gray-700/50 p-6 rounded-xl">
                <h2 className="text-xl font-semibold text-white mb-4">
                  توضیحات محصول
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {product.description || "توضیحات محصول در دسترس نیست."}
                </p>
              </div>
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

              {hasPlatforms && (
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-3">پلتفرم</p>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(product.platforms) ? (
                      product.platforms.map((platform: string) => (
                        <button
                          key={platform}
                          onClick={() => setSelectedPlatform(platform)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                            selectedPlatform === platform
                              ? "bg-blue-600 text-white"
                              : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                          }`}
                        >
                          {platform}
                        </button>
                      ))
                    ) : (
                      <p className="text-white">{product.platforms}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="bg-gray-700/50 p-4 rounded-xl">
                <p className="text-gray-400 mb-2">سازنده</p>
                <p className="text-white">{product.creator || "نامشخص"}</p>
              </div>

              {/* Additional Product Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">سال انتشار</p>
                  <p className="text-white text-lg font-semibold">
                    {product.releaseYear
                      ? digitsEnToFa(product.releaseYear)
                      : "نامشخص"}
                  </p>
                </div>
                <div className="bg-gray-700/50 p-4 rounded-xl">
                  <p className="text-gray-400 mb-2">تعداد موجودی</p>
                  <p className="text-white text-lg font-semibold">
                    {product.quantity
                      ? digitsEnToFa(product.quantity)
                      : "نامشخص"}
                  </p>
                </div>
              </div>
              {/* Add to Cart Button - Moved up when no platforms */}
              {!hasPlatforms && (
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                  افزودن به سبد خرید
                </button>
              )}
              {/* Add to Cart Button - Only shown when there are platforms */}
              {hasPlatforms && (
                <button className="mt-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer">
                  افزودن به سبد خرید
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default SingleProduct;
