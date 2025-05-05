"use client";

import { useRouter } from "next/navigation";
import { BiErrorCircle } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";

function PaymentFailed() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center p-4 mt-12">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8 space-y-8">
          {/* Error Icon and Message */}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
                <BiErrorCircle className="text-6xl text-red-500 relative z-10" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white">پرداخت ناموفق</h1>
            <p className="text-gray-400">
              متأسفانه پرداخت شما با مشکل مواجه شد
            </p>
          </div>

          {/* Action Button */}
          <div className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <button
              onClick={() => router.push("/home")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-300 cursor-pointer"
            >
              <IoHomeOutline className="text-xl" />
              <span>بازگشت به صفحه اصلی</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentFailed;
