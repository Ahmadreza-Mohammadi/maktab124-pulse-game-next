import Creators from "@/components/creators/Creators";
import Offers from "@/components/offers/Offers";
import HomeSwiper from "@/components/swiper/HomeSwiper";
import GameCategories from "@/components/game-categories/GameCategories";
import Categories from "@/components/categories/Categories";
import ProductsSection from "@/components/products-section/ProductsSection";
import Comments from "@/components/comments/Comments";

function Home() {
  return (
    <>
      <HomeSwiper />
      <GameCategories />
      <Offers />
      <Creators />
      <Comments />
      <Categories />
      <ProductsSection />
    </>
  );
}

export default Home;
