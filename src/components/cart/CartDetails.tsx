"use client";

import { useCart } from "@/context/CartContext";
import { useModal } from "@/context/ModalContext";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import DeleteCartItemModal from "../modal/DeleteCartItemModal";

function CartDetails() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { openModal } = useModal();

  const handleQuantityChange = (
    id: string,
    currentQuantity: number,
    change: number
  ) => {
    const product = cart.find((item) => item.id === id);
    if (!product) return;

    const newQuantity = Math.min(
      product.limitQuantity,
      Math.max(1, currentQuantity + change)
    );

    if (newQuantity !== currentQuantity) {
      updateQuantity(id, newQuantity);
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    openModal(<DeleteCartItemModal itemId={id} itemName={name} />);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            سبد خرید شما خالی است
          </h2>
          <p className="text-gray-400 mb-8">
            هنوز هیچ محصولی به سبد خرید اضافه نکرده‌اید.
          </p>
          <button
            onClick={() => (window.location.href = "/products")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer"
          >
            ادامه خرید
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-white font-bold mt-28 p-2 text-center">
        سبد خرید
      </h1>
      <div className="flex max-w-7xl mx-auto px-4">
        {/* card section  */}
        <div className="flex flex-col w-2/3 px-12">
          <div className="max-h-[60vh] overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex flex-col gap-4">
              {cart.map((product) => (
                <div
                  className="p-4 w-full flex gap-6 items-center bg-gray-800 rounded-xl border border-gray-700/50"
                  key={product.id}
                >
                  {/* img section  */}
                  <img
                    className="h-24 w-24 object-cover rounded-lg"
                    src={product.image}
                    alt={product.name}
                  />
                  {/* details section  */}
                  <div className="flex-1 flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-lg text-white">
                        {product.name}
                      </span>
                      <span className="text-blue-400 font-medium">
                        {product.price} تومان
                      </span>
                      {product.platform && (
                        <span className="text-gray-400">
                          پلتفرم: {product.platform}
                        </span>
                      )}
                    </div>

                    {/* quantity button section  */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.selectedQuantity,
                              -1
                            )
                          }
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <BsDash />
                        </button>
                        <span className="px-4 py-2 text-white">
                          {product.selectedQuantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              product.id,
                              product.selectedQuantity,
                              1
                            )
                          }
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors cursor-pointer"
                        >
                          <BsPlus />
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          handleDeleteClick(product.id, product.name)
                        }
                        className="text-red-500 hover:text-red-600 p-2 cursor-pointer"
                      >
                        <BsTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* checkout section - now sticky */}
        <div className="bg-gray-800 w-1/3 p-6 rounded-xl border border-gray-700/50 sticky top-32 h-fit">
          <h2 className="text-xl font-bold text-white mb-6">خلاصه سفارش</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-400">
              <span>قیمت کل</span>
              <span>{subtotal} تومان</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>هزینه ارسال</span>
              <span>رایگان</span>
            </div>
            <div className="border-t border-gray-700/50 pt-4">
              <div className="flex justify-between font-bold text-white">
                <span>مبلغ قابل پرداخت</span>
                <span>{total} تومان</span>
              </div>
            </div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 mt-6 cursor-pointer">
              پرداخت
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartDetails;
