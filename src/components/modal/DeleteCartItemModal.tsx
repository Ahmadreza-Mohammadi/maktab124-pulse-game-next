"use client";

import { useModal } from "@/context/ModalContext";
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";

interface DeleteCartItemModalProps {
  itemId: string;
  itemName: string;
}

export default function DeleteCartItemModal({
  itemId,
  itemName,
}: DeleteCartItemModalProps) {
  const { closeModal } = useModal();
  const { removeFromCart } = useCart();

  const handleDelete = () => {
    removeFromCart(itemId);
    closeModal();
    toast.error("محصول با موفقیت از سبد خرید حذف شد", {
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-white mb-4">حذف از سبد خرید</h2>
        <p className="text-gray-300 mb-6">
          آیا مطمئن هستید که می‌خواهید {itemName} را از سبد خرید حذف کنید؟
        </p>
        <div className="flex gap-4">
          <button
            onClick={closeModal}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer"
          >
            انصراف
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
