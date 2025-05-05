"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Clear cart or perform other post-payment actions if needed
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center p-4 mt-12">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8 space-y-8">
          {/* Success Icon and Message */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <BsCheckCircleFill className="text-6xl text-green-500 relative z-10" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">
              پرداخت با موفقیت انجام شد
            </h1>
            <p className="text-gray-400">از خرید شما متشکریم!</p>
          </div>

          {/* Action Buttons */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 animate-slide-up"
            style={{ animationDelay: "200ms" }}
          >
            <button
              onClick={() => router.push("/payment-log")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700/50 hover:bg-gray-700/70 text-white rounded-xl transition-colors duration-300 cursor-pointer"
            >
              <MdPayment className="text-xl" />
              <span>سوابق پرداخت</span>
            </button>
            <button
              onClick={() => router.push("/home")}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-300 cursor-pointer"
            >
              <FaHistory className="text-xl" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
