import Categories from "@/components/categories/Categories";
import HomeSwiper from "@/components/swiper/HomeSwiper"
import { products } from "@/database/Products";

function Home() {
  console.log(products);
  return (
    <>
    <HomeSwiper />
    <Categories />
    </>
  )
}

export default Home