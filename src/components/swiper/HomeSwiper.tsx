"use client";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper/modules";

export default function HomeSwiper() {
  return (
    <div className="w-full h-[480px] p-4">
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[480px] group">
            <img
              className="cursor-pointer h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-md"
              src="https://tse2.mm.bing.net/th?id=OIG4.dr_7CgnsHnnWhUY4Kfy0&pid=ImgGn"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white text-lg font-bold border border-gray-300 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110">
                مشاهده محصولات
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[480px] group">
            <img
              className="cursor-pointer h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-md"
              src="https://wallpapers.com/images/featured/keyboard-background-z7fm47jyvkt01937.jpg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white text-lg font-bold border border-gray-300 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110">
                مشاهده
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[480px] group">
            <img
              className="cursor-pointer h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-md"
              src="https://storage-asset.msi.com/global/picture/image/feature/multimeda/Chairs/ch120i/kv.jpg"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white text-lg font-bold border border-gray-300 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110">
                صندلی های گیمینگ
              </button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div className="relative h-[480px] group">
            <img
              className="cursor-pointer h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 group-hover:blur-md"
              src="https://www.gameologist.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fx96l6sua%2Fproduction%2Fad92df9c1c694ad30002adab95749df06bf7977a-2048x1152.webp%2F2025-video-game-release-calendar-top-upcoming-games.webp%3Fq%3D80%26fit%3Dmax%26auto%3Dformat&w=1920&q=75"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="text-white text-lg font-bold border border-gray-300 bg-gray-800 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer transition-transform duration-300 hover:scale-110">
                مشاهده بازی ها
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
