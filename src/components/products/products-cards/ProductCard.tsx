import { categoryTranslations } from '@/components/constants/Constants';
import { formatPrice, truncateEnd } from '@/utils/helper';
import React from 'react'

function ProductCard({product, index, getSingleProduct}: {product: any, index: number, getSingleProduct: (id: number) => void}) {
  return (
    <div
    onClick={() => getSingleProduct(product.id)}
    key={product.id}
    className="relative cursor-pointer bg-blue-900 rounded-3xl overflow-hidden flex flex-col border-2 border-blue-600/50 hover:border-blue-400 transition-all duration-300 animate-slide-up h-[500px]"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Image Section */}
    <div className="relative h-72 w-full overflow-hidden">
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
    <div className="p-6 flex flex-col gap-5 flex-grow">
      <h1
        className="text-xl font-bold text-blue-200 text-center truncate"
        title={product.title}
      >
        {truncateEnd(product.title, 24)}
      </h1>

      {/* Info Section */}
      <div className="flex flex-col gap-3 text-[16px] text-gray-400">
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
        className="mt-auto bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 cursor-pointer"
      >
        افزودن به سبد خرید
      </button>
    </div>
  </div>
  )
}

export default ProductCard