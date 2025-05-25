"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { toast } from "react-toastify";

function PaymentSuccess() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full space-y-6 text-center">
        <div className="flex justify-center">
          <BsCheckCircleFill className="text-6xl text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white">پرداخت موفقیت‌آمیز</h1>
        <p className="text-gray-400">
          پرداخت شما با موفقیت انجام شد. از خرید شما متشکریم!
        </p>
        <div className="flex flex-col gap-4 pt-4">
          <button
            onClick={() => router.push("/products")}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <MdPayment className="text-xl" />
            ادامه خرید
          </button>
          <button
            onClick={() => router.push("/orders")}
            className="w-full bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaHistory className="text-xl" />
            مشاهده سفارشات
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
