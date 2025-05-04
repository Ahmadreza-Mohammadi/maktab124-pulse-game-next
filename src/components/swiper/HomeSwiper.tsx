"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function HomeSwiper() {
  const router = useRouter();
  return (
    <div className="w-full h-[480px] p-4 swiper-container bg-gray-900 cursor-pointer">
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
        {/* Slide 1 */}
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://tse2.mm.bing.net/th?id=OIG4.dr_7CgnsHnnWhUY4Kfy0&pid=ImgGn"
              alt="Slide 1"
            />
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://wallpapers.com/images/featured/keyboard-background-z7fm47jyvkt01937.jpg"
              alt="Slide 2"
            />
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://storage-asset.msi.com/global/picture/image/feature/multimeda/Chairs/ch120i/kv.jpg"
              alt="Slide 3"
            />
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://www.gameologist.app/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fx96l6sua%2Fproduction%2Fad92df9c1c694ad30002adab95749df06bf7977a-2048x1152.webp%2F2025-video-game-release-calendar-top-upcoming-games.webp%3Fq%3D80%26fit%3Dmax%26auto%3Dformat&w=1920&q=75"
              alt="Slide 4"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://i.pinimg.com/736x/ea/c8/83/eac8839079ad14943d051ead0e5ded47.jpg"
              alt="Slide 4"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="relative h-[480px] group"
            onClick={() => router.push("/products")}
          >
            <img
              className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
              src="https://static.vecteezy.com/system/resources/thumbnails/026/724/509/small_2x/computer-rgb-gaming-mouse-3d-realistic-ai-generative-photo.jpg"
              alt="Slide 4"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
