import { categoryTranslations } from "@/components/constants/Constants";
import { formatPrice, truncateEnd } from "@/utils/helper";
import React from "react";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

function ProductCard({
  product,
  index,
  getSingleProduct,
}: {
  product: any;
  index: number;
  getSingleProduct: (id: number) => void;
}) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.stock) {
      toast.error("این محصول در حال حاضر موجود نیست", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        rtl: true,
      });
      return;
    }

    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: Array.isArray(product.img) ? product.img[0] : product.img,
      quantity: product.quantity || 1,
      limitQuantity: product.quantity || 1,
      selectedQuantity: 1,
      platform: product.platforms?.[0] || "",
    });

    toast.success("محصول با موفقیت به سبد خرید اضافه شد", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      rtl: true,
    });
  };

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
                className={product.stock ? "text-green-400" : "text-red-400"}
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

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className={`group relative w-full py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
              product.stock
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-blue-500/20"
                : "bg-gray-700/50 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!product.stock}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
              {product.stock ? (
                <>
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  افزودن به سبد خرید
                </>
              ) : (
                "ناموجود"
              )}
            </span>
            {product.stock && (
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              getSingleProduct(product.id);
            }}
            className="group relative w-full py-3 rounded-xl font-semibold bg-gray-800/50 text-gray-300 hover:text-white transition-all duration-300 overflow-hidden border border-gray-700/50 hover:border-blue-500/50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              مشاهده جزئیات
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
