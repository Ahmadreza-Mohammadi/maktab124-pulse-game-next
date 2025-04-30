"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/api/API";
import { useRouter } from "next/navigation";
import { categoryTranslations } from "@/components/constants/Constants";
import { formatPrice, truncateEnd } from "@/utils/helper";
import Loading from "@/components/loading/Loading";
import ScrollToTop from "../scroll-to-top/ScrollToTop";
import BackButton from "../shared/BackButton";

interface FilteredProductsProps {
  value: string;
}

export default function FilteredProducts({ value }: FilteredProductsProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const maxTitleLength = 24;
  const productsPerPage = 9;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await axios.get(
          `${BASE_URL}/api/records/products?filterKey=category&filterValue=${value}`,
          { headers: { api_key: API_KEY } }
        );

        if (!response.data.records || response.data.records.length === 0) {
          response = await axios.get(
            `${BASE_URL}/api/records/products?filterKey=gameCategory&filterValue=${value}`,
            { headers: { api_key: API_KEY } }
          );
        }

        if (!response.data.records || response.data.records.length === 0) {
          response = await axios.get(
            `${BASE_URL}/api/records/products?filterKey=creator&filterValue=${value}`,
            { headers: { api_key: API_KEY } }
          );
        }

        setProducts(response.data.records);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [value]);

  function getSingleProduct(id: number) {
    router.push(`/single-product/${id}`);
  }

  // Calculate pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Reset to first page when value changes
  useEffect(() => {
    setCurrentPage(1);
  }, [value]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center mr-32 mt-12">
        <Loading />
      </div>
    );
  }

  // if not exist products
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <section
        className="py-12 bg-gradient-to-b from-blue-950 to-blue-800"
        dir="rtl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center text-blue-200 mb-8">
            محصولی در این دسته‌بندی یافت نشد
          </h2>
          <p className="text-center text-gray-400">
            دسته‌بندی: {categoryTranslations[value] || value}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="py-12 bg-gradient-to-b from-blue-950 to-blue-800 mt-16"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between my-8">
          <BackButton />
          <h2 className="text-4xl font-extrabold text-blue-200 animate-fade-in">
            {categoryTranslations[value]}
          </h2>
          <div className="w-24"></div> {/* Empty div for balance */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map((product: any, index: number) => (
            <div
              onClick={() => getSingleProduct(product.id)}
              key={product.id}
              className="relative cursor-pointer bg-blue-900 rounded-3xl overflow-hidden flex flex-col border-2 border-blue-600/50 hover:border-blue-400 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Section */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                  src={product.img}
                  alt={product.title || "Product Image"}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
                {/* Category Label */}
                <span className="absolute bottom-3 left-3 bg-blue-500 text-white text-s font-semibold px-2.5 py-1 rounded-full">
                  {categoryTranslations[product.category] || "نامشخص"}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 flex flex-col gap-4 flex-grow">
                <h1
                  className="text-lg font-bold text-blue-200 text-center truncate"
                  title={product.title}
                >
                  {truncateEnd(product.title, maxTitleLength)}
                </h1>

                {/* Info Section */}
                <div className="flex flex-col gap-2 text-[16px] text-gray-400">
                  <div className="flex justify-between items-center">
                    <span>
                      امتیاز:{" "}
                      <span className="text-yellow-400">
                        {product.rating || "بدون امتیاز"}
                      </span>
                    </span>
                    <span>
                      وضعیت:{" "}
                      <span
                        className={
                          product.stock ? "text-green-400" : "text-red-400"
                        }
                      >
                        {product.stock ? "موجود" : "ناموجود"}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>قیمت:</span>
                    <span className="text-blue-200 font-bold">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="flex justify-between w-full">
                      <span>سازنده:</span>
                      <span className="text-blue-200">
                        {product.creator || "نامشخص"}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    getSingleProduct(product.id);
                  }}
                  className="mt-auto bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
                >
                  مشاهده جزئیات
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
            >
              قبلی
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-blue-700 text-blue-200 hover:bg-blue-600"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors cursor-pointer"
            >
              بعدی
            </button>
          </div>
        )}
      </div>
      <ScrollToTop />
    </section>
  );
}
