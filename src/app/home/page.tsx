import Categories from "@/components/categories/Categories";
import Offers from "@/components/offers/Offers";
import HomeSwiper from "@/components/swiper/HomeSwiper";
import { products } from "@/database/Products";

function Home() {
  console.log(products);
  return (
    <>
      <HomeSwiper />
      <Categories />
      <Offers />
    </>
  );
}

export default Home;
