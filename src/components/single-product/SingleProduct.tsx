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
import { BsDash, BsPlus } from "react-icons/bs";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

interface SingleProductProps {
  id: string;
}

function SingleProduct({ id }: SingleProductProps) {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [platform, setPlatform] = useState<string>("");

  const handleQuantityChange = (change: number) => {
    if (!product) return;
    const newQuantity = Math.max(
      1,
      Math.min(product.quantity, quantity + change)
    );
    setQuantity(newQuantity);
  };

  function handleAddToCart() {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: Array.isArray(product.img) ? product.img[0] : product.img,
      quantity: product.quantity,
      limitQuantity: product.quantity,
      selectedQuantity: quantity,
      platform: selectedPlatform,
    });

    toast.success("محصول با موفقیت به سبد خرید اضافه شد", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      rtl: true,
    });
  }

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
                <div
                  className={`relative w-full rounded-2xl overflow-hidden ${
                    product.gameCategory ? "h-[500px]" : "h-[700px]"
                  }`}
                >
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
                        <div
                          className={`relative ${
                            product.gameCategory ? "h-[500px]" : "h-[700px]"
                          } group`}
                        >
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

                {/* Description below images - Only shown when gameCategory exists */}
                {product.gameCategory && (
                  <div className="bg-gray-700/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      توضیحات محصول
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {product.description || "توضیحات محصول در دسترس نیست."}
                    </p>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="flex flex-col gap-6">
                <h1 className="text-3xl font-bold text-white">
                  {product.title}
                </h1>

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
                              product.stock
                                ? selectedPlatform === platform
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-600 text-gray-300 hover:bg-gray-500"
                                : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!product.stock}
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

                {/* Description above Add to Cart - Only shown when gameCategory doesn't exist */}
                {!product.gameCategory && (
                  <div className="bg-gray-700/50 p-6 rounded-xl">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      توضیحات محصول
                    </h2>
                    <p className="text-gray-300 leading-relaxed">
                      {product.description || "توضیحات محصول در دسترس نیست."}
                    </p>
                  </div>
                )}

                {/* Add to Cart Button */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex items-center border border-gray-700 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <BsDash />
                    </button>
                    <span className="px-4 py-2 text-white">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <BsPlus />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      product.stock
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                        : "bg-gray-700/50 text-gray-400 border border-gray-600/50 cursor-not-allowed"
                    }`}
                    disabled={!product.stock}
                  >
                    {product.stock ? (
                      "افزودن به سبد خرید"
                    ) : (
                      <span className="flex items-center justify-center gap-2 curpi">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                        ناموجود
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
