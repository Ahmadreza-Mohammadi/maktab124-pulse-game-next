"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import OffersCards from "./OffersCards";

function Offers() {
  const [products, setProducts] = useState<any[]>([]);
  const maxTitleLength = 18;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/products`, {
          headers: {
            api_key: API_KEY,
          },
        });
        setProducts(res.data.records);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []);

  const sortedProducts = products.sort((a: any, b: any) => {
    return b.discount !== a.discount
      ? b.discount - a.discount
      : a.title.length - b.title.length;
  });
  return (
    <OffersCards
      scrollRight={scrollRight}
      scrollLeft={scrollLeft}
      scrollContainerRef={scrollContainerRef as React.RefObject<HTMLDivElement>}
      products={products}
      sortedProducts={sortedProducts}
      maxTitleLength={maxTitleLength}
    />
  );
}

export default Offers;
