"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

function Checkout() {
  const router = useRouter();
  const { cart } = useCart();

  function isLogin(): boolean {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
      return false;
    }
    return true;
  }

  return (
    <>
      {isLogin() && cart.length === 0 && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-white text-2xl font-bold">
            سبد خرید شما خالی است
          </div>
        </div>
      )}

      {isLogin() && (
        <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 py-32">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-3xl font-bold text-white mb-8 text-center">
              نهایی کردن سفارش
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Form Section */}
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 lg:col-span-3">
                <h2 className="text-xl font-semibold text-white mb-6">
                  اطلاعات شخصی
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-gray-300">
                      نام و نام خانوادگی
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="نام و نام خانوادگی"
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-gray-300">
                      شماره تماس
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="شماره تماس"
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="text-gray-300">
                      آدرس
                    </label>
                    <textarea
                      id="address"
                      placeholder="آدرس"
                      rows={3}
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="tracking" className="text-gray-300">
                      کد پستی
                    </label>
                    <input
                      type="text"
                      id="tracking"
                      placeholder="کد پستی"
                      className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 lg:col-span-2">
                <h2 className="text-xl font-semibold text-white mb-6">
                  خلاصه سفارش
                </h2>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-white font-medium">
                            {item.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {item.selectedQuantity} عدد
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-semibold">
                        {item.price * item.selectedQuantity} تومان
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-gray-700/50 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>قیمت کل</span>
                      <span>
                        {cart.reduce(
                          (sum, item) =>
                            sum + item.price * item.selectedQuantity,
                          0
                        )}{" "}
                        تومان
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>هزینه ارسال</span>
                      <span>رایگان</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700/50">
                      <span>مبلغ قابل پرداخت</span>
                      <span>
                        {cart.reduce(
                          (sum, item) =>
                            sum + item.price * item.selectedQuantity,
                          0
                        )}{" "}
                        تومان
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push("./payment")}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 mt-6 cursor-pointer"
                  >
                    پرداخت
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
