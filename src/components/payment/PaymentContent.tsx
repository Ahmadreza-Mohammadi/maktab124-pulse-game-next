import React from "react";
import { useRouter } from "next/navigation";

interface PaymentContentProps {
  pendingOrders: Array<{
    id: string;
    payment: string;
    createdAt: string;
    totalAmount: number;
  }>;
  showOrderSelect: boolean;
  setShowOrderSelect: (show: boolean) => void;
  id: string;
  setId: (id: string) => void;
  formData: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    otp: string;
    email: string;
  };
  errors: {
    cardNumber: string;
    expiry: string;
    cvv: string;
    otp: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePayment: (orderId: string) => void;
  isProcessing: boolean;
  showOTP: boolean;
  setShowOTP: (show: boolean) => void;
}

function PaymentContent({
  pendingOrders,
  showOrderSelect,
  setShowOrderSelect,
  id,
  setId,
  formData,
  errors,
  handleInputChange,
  handlePayment,
  isProcessing,
  showOTP,
  setShowOTP,
}: PaymentContentProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-blue-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-gray-800/50 rounded-2xl border border-gray-700/50 p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="text-white text-2xl font-bold">پرداخت امن</div>
            {pendingOrders.length > 1 && (
              <button
                onClick={() => setShowOrderSelect(!showOrderSelect)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                پیگیری سفارش‌های قبلی
              </button>
            )}
          </div>

          {showOrderSelect && pendingOrders.length > 1 && (
            <div className="mb-6 bg-gray-700/30 p-4 rounded-xl">
              <h3 className="text-white mb-3">سفارش‌های در انتظار پرداخت:</h3>
              <div className="space-y-2">
                {pendingOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      id === order.id
                        ? "bg-blue-600"
                        : "bg-gray-600/50 hover:bg-gray-600"
                    }`}
                    onClick={() => {
                      setId(order.id);
                      setShowOrderSelect(false);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-white">
                        {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                      </span>
                      <span className="text-white">
                        {order.totalAmount?.toLocaleString()} تومان
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="۱۲۳۴ ۵۶۷۸ ۹۰۱۲ ۳۴۵۶"
                  className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                    errors.cardNumber ? "border-red-500" : "border-gray-600/50"
                  }`}
                />
                {errors.cardNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.cardNumber}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="expiry" className="text-gray-300">
                    تاریخ انقضا
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={formData.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.expiry ? "border-red-500" : "border-gray-600/50"
                    }`}
                  />
                  {errors.expiry && (
                    <span className="text-red-500 text-sm">
                      {errors.expiry}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="cvv" className="text-gray-300">
                    CVV2
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="۱۲۳"
                    className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                      errors.cvv ? "border-red-500" : "border-gray-600/50"
                    }`}
                  />
                  {errors.cvv && (
                    <span className="text-red-500 text-sm">{errors.cvv}</span>
                  )}
                </div>
              </div>

              {/* Dynamic Password */}
              <div className="flex flex-col gap-2">
                <label htmlFor="otp" className="text-gray-300">
                  رمز پویا
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showOTP ? "text" : "password"}
                    id="otp"
                    name="otp"
                    value={formData.otp}
                    onChange={handleInputChange}
                    placeholder="رمز پویای خود را وارد کنید"
                    className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors w-full pl-36 ${
                      errors.otp ? "border-red-500" : "border-gray-600/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowOTP(!showOTP)}
                    className="absolute left-[7.5rem] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {showOTP ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                  <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg text-sm transition-colors">
                    درخواست رمز
                  </button>
                </div>
                {errors.otp && (
                  <span className="text-red-500 text-sm">{errors.otp}</span>
                )}
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
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@email.com"
                  className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-600/50"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">{errors.email}</span>
                )}
                <p className="text-gray-400 text-sm">
                  رسید پرداخت به این ایمیل ارسال خواهد شد
                </p>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={() => handlePayment(id)}
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

            <button
              onClick={() => router.push("/payment-failed")}
              className="w-full py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 cursor-pointer"
            >
              انصراف
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

export default PaymentContent;
