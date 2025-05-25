"use client";

import { digitsEnToFa } from "@/utils/helper";

interface ProductsListPaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
}

function ProductsListPagination({
  currentPage,
  setCurrentPage,
  totalPages,
}: ProductsListPaginationProps) {
  return (
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
        {currentPage > 3 && <span className="px-2 text-blue-200">...</span>}

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
  );
}

export default ProductsListPagination;
