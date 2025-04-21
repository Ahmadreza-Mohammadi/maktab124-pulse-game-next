import Categories from "@/components/categories/Categories";
import Offers from "@/components/offers/Offers";
import HomeSwiper from "@/components/swiper/HomeSwiper";

function Home() {
  return (
    <>
      <HomeSwiper />
      <Categories />
      <Offers />
    </>
  );
}

export default Home;
