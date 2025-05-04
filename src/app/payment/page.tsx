"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

function Payment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      router.push("/success");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="text-white text-2xl font-bold">پرداخت امن</div>
          </div>

          <div className="space-y-6">
            {/* Payment Amount */}
            <div className="bg-gray-700/30 p-4 rounded-xl">
              <div className="text-gray-400 text-sm mb-1">مبلغ قابل پرداخت</div>
              <div className="text-white text-2xl font-bold">۲۵۰,۰۰۰ تومان</div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="cardNumber" className="text-gray-300">
                  شماره کارت
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  placeholder="۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴۵۶"
                  className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="expiry" className="text-gray-300">
                    تاریخ انقضا
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cvv" className="text-gray-300">
                    CVV2
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="۱۲۳"
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Dynamic Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="otp" className="text-gray-300">
                  رمز پویا
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="otp"
                    placeholder="رمز پویای خود را وارد کنید"
                    className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-full"
                  />
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-colors">
                    درخواست رمز
                  </button>
                </div>
                <p className="text-gray-400 text-sm">
                  رمز پویا به شماره همراه شما پیامک خواهد شد
                </p>
              </div>

              {/* Optional Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-gray-300">
                  ایمیل <span className="text-gray-400 text-sm">(اختیاری)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="example@email.com"
                  className="bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-gray-400 text-sm">
                  رسید پرداخت به این ایمیل ارسال خواهد شد
                </p>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isProcessing
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer"
              }`}
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-white">در حال پردازش...</span>
                </div>
              ) : (
                <span className="text-white">پرداخت</span>
              )}
            </button>

            {/* Security Info */}
            <div className="text-center text-gray-400 text-sm mt-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>پرداخت امن</span>
              </div>
              <p>اطلاعات کارت شما به صورت رمزنگاری شده منتقل می‌شود</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
