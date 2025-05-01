"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { digitsEnToFa } from "@/utils/helper";
import ProductCard from "./ProductCard";

// Helper function to truncate text
const truncateEnd = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price) + " تومان";
};

function ProductsList() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxTitleLength = 30; // Maximum length for product titles
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
      console.log(response.data.records);
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
    <div
      className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 py-12"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
            >
              اولین
            </button>
            <div className="flex gap-2">
              {/* Always show first page */}
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                  currentPage === 1
                    ? "bg-blue-500 text-white"
                    : "bg-blue-700 text-blue-200 hover:bg-blue-600"
                }`}
              >
                {digitsEnToFa(1)}
              </button>

              {/* Show pages around current page */}
              {currentPage > 3 && (
                <span className="px-2 text-blue-200">...</span>
              )}

              {Array.from({ length: Math.min(3, totalPages - 2) }, (_, i) => {
                let page;
                if (currentPage <= 3) {
                  page = i + 2;
                } else if (currentPage >= totalPages - 2) {
                  page = totalPages - 3 + i;
                } else {
                  page = currentPage - 1 + i;
                }
                return page;
              }).map(
                (page) =>
                  page > 1 &&
                  page < totalPages && (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-blue-700 text-blue-200 hover:bg-blue-600"
                      }`}
                    >
                      {digitsEnToFa(page)}
                    </button>
                  )
              )}

              {currentPage < totalPages - 2 && (
                <span className="px-2 text-blue-200">...</span>
              )}

              {/* Always show last page if there is more than one page */}
              {totalPages > 1 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    currentPage === totalPages
                      ? "bg-blue-500 text-white"
                      : "bg-blue-700 text-blue-200 hover:bg-blue-600"
                  }`}
                >
                  {digitsEnToFa(totalPages)}
                </button>
              )}
            </div>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
            >
              اخرین
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsList;
