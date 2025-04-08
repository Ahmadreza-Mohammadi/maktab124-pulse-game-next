"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules"; // Added Autoplay

export default function HomeSwiper() {
  return (
    <div className="w-full h-[480px] p-4 swiper-container">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2000, // 2 seconds delay
          disableOnInteraction: false, // Keeps autoplay running even after user interaction
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]} // Added Autoplay to modules
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[480px] group slide-content">
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
              src="https://tse2.mm.bing.net/th?id=OIG4.dr_7CgnsHnnWhUY4Kfy0&pid=ImgGn"
              alt="Slide 1"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 overlay">
              <button className="text-white text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                مشاهده محصولات
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[480px] group slide-content">
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
              src="https://wallpapers.com/images/featured/keyboard-background-z7fm47jyvkt01937.jpg"
              alt="Slide 2"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 overlay">
              <button className="text-white text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                مشاهده
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[480px] group slide-content">
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
              src="https://storage-asset.msi.com/global/picture/image/feature/multimeda/Chairs/ch120i/kv.jpg"
              alt="Slide 3"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 overlay">
              <button className="text-white text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                صندلی های گیمینگ
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative h-[480px] group slide-content">
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:blur-sm"
              src="https://www.gameologist.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fx96l6sua%2Fproduction%2Fad92df9c1c694ad30002adab95749df06bf7977a-2048x1152.webp%2F2025-video-game-release-calendar-top-upcoming-games.webp%3Fq%3D80%26fit%3Dmax%26auto%3Dformat&w=1920&q=75"
              alt="Slide 4"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 overlay">
              <button className="swiper-btn text-white text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-xl">
                مشاهده بازی ها
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}