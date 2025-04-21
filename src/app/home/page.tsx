import Creators from "@/components/creators/Creators";
import Offers from "@/components/offers/Offers";
import HomeSwiper from "@/components/swiper/HomeSwiper";
import GameCategories from "@/components/game-categories/GameCategories";
import Categories from "@/components/categories/Categories";

function Home() {
  return (
    <>
      <HomeSwiper />
      <GameCategories />
      <Offers />
      {/* <Creators /> */}
      <Categories />
    </>
  );
}

export default Home;
