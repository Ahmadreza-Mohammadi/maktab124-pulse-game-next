"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { digitsEnToFa } from "@/utils/helper";
import ProductCard from "./ProductCard";
import Loading from "@/components/loading/Loading";
import ProductsFilterBar from "../filter-bar/ProductsFilterBar";
import ProductsListPagination from "./ProductsListPagination";

function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  function getSingleProduct(id: number) {
    router.push(`/single-product/${id}`);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`${BASE_URL}/api/records/products`, {
        headers: {
          api_key: API_KEY,
        },
      });
      setProducts(response.data.records);
    };
    fetchProducts();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <>
      <ProductsFilterBar products={products} setProducts={setProducts} />
      <div
        className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 py-12"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentProducts.length === 0 && (
              <div className="bg-red-300 mr-132 mt-58">
                <Loading />
              </div>
            )}

            {currentProducts.map((product: any, index: number) => (
              // cards render here
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                getSingleProduct={getSingleProduct}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <ProductsListPagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProductsList;
