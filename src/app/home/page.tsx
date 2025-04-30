import Categories from "@/components/home/categories/Categories";
import Comments from "@/components/home/comments/Comments";
import Creators from "@/components/home/creators/Creators";
import GameCategories from "@/components/home/game-categories/GameCategories";
import Offers from "@/components/home/offers/Offers";
import ProductsSection from "@/components/home/products-section/ProductsSection";
import HomeSwiper from "@/components/swiper/HomeSwiper";


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
