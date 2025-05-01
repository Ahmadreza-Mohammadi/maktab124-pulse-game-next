"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import { useState } from "react";

function ProductsFilterBar({
  products,
  setProducts,
}: {
  products: any;
  setProducts: any;
}) {
  const [currentCategory, setCurrentCategory] = useState("all");
  const [currentSort, setCurrentSort] = useState("all");

  async function sortByCategory(key: string, value: string) {
    setCurrentCategory(value);
    let filteredProducts = products;
    if (value === "all") {
      const res = await axios(
        `${BASE_URL}/api/records/products`,
        { headers: { api_key: API_KEY } }
      );
      filteredProducts = res.data.records;
    }

    if (value !== "all") {
      const res = await axios(
        `${BASE_URL}/api/records/products?filterKey=${key}&filterValue=${value}`,
        { headers: { api_key: API_KEY } }
      );
      filteredProducts = res.data.records;
    }

    // Apply price sorting if active
    if (currentSort !== "all") {
      filteredProducts = [...filteredProducts].sort((a: any, b: any) => {
        if (currentSort === "cheapest") {
          return a.price - b.price;
        } else if (currentSort === "expensive") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    setProducts(filteredProducts);
  }

  function sortByPrice(value: string) {
    setCurrentSort(value);
    let filteredProducts = [...products];

    if (value !== "all") {
      filteredProducts = filteredProducts.sort((a: any, b: any) => {
        if (value === "cheapest") {
          return a.price - b.price;
        } else if (value === "expensive") {
          return b.price - a.price;
        }
        return 0;
      });
    }

    // Apply category filter if active
    if (currentCategory !== "all") {
      filteredProducts = filteredProducts.filter(
        (product: any) => product.category === currentCategory
      );
    }

    setProducts(filteredProducts);
  }

  return (
    <div
      className="mt-28 bg-gradient-to-t from-gray-900 to-blue-950 shadow-xl backdrop-blur-sm bg-opacity-90 rounded-lg mx-0 px-36 py-4 flex justify-between items-center w-full"
      dir="rtl"
    >
      <div className="flex items-center gap-4">
        <h1 className="text-white font-medium text-xl">مرتب سازی:</h1>
        <select
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-gray-700 transition-colors"
          name="sort"
          id="sort"
          value={currentSort}
          onChange={(e) => {
            sortByPrice(e.target.value);
          }}
        >
          <option value="all">همه</option>
          <option value="cheapest">ارزان ترین</option>
          <option value="expensive">گران ترین</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <h1 className="text-white font-medium text-xl">دسته بندی:</h1>
        <select
          className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-gray-700 transition-colors"
          name="category"
          id="category"
          value={currentCategory}
          onChange={(e) => sortByCategory("category", e.target.value)}
        >
          <option value="all">همه</option>
          <option value="keyboard">کیبورد</option>
          <option value="mouse">ماوس</option>
          <option value="headset">هدست</option>
          <option value="chair">صندلی</option>
        </select>
      </div>
    </div>
  );
}

export default ProductsFilterBar;
