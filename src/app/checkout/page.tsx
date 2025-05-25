"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { FormErrors, FormData } from "@/components/interfaces/interface";
import axios from "axios";
import { API_KEY, BASE_URL } from "@/api/API";
import { digitsEnToFa, formatPrice } from "@/utils/helper";

function Checkout() {
  const router = useRouter();
  const { cart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    otp: "",
    email: ""
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    phone: "",
    address: "",
    postalCode: "",
    cardNumber: "",
    expiry: "", 
    cvv: "",
    otp: "",
    email: ""
  });

  const [ordersData, setOrdersData] = useState<{
    cart: any[];
    userInfo: FormData;
    totalAmount: number;
    orderDate: string;
  }>({
    cart: [],
    userInfo: formData,
    totalAmount: 0,
    orderDate: new Date().toISOString(),
  });

  useEffect(() => {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.selectedQuantity,
      0
    );

    setOrdersData({
      cart: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.selectedQuantity,
        image: item.image,
      })),
      userInfo: formData,
      totalAmount: total,
      orderDate: new Date().toISOString(),
    });
  }, [cart, formData]);

  async function addOrdersData() {
    if (!validateForm()) {
      return;
    }

    if (cart.length === 0) {
      setSubmitError("سبد خرید شما خالی است");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const orderPayload = {
        ...ordersData,
        payment: "pending",
        deliveryStatus: "processing",
        userId: localStorage.getItem("userId") || "",
      };

      const res = await axios.post(
        `${BASE_URL}/api/records/orders`,
        orderPayload,
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      localStorage.removeItem("cart");
      router.push("/payment");
    } catch (error: any) {
      console.error("Order submission error:", error);
      setSubmitError(
        error.response?.data?.message ||
          "خطا در ثبت سفارش. لطفا دوباره تلاش کنید"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function isLogin(): boolean {
    if (!localStorage.getItem("accessToken")) {
      router.push("/login");
      return false;
    }
    return true;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "نام و نام خانوادگی الزامی است";
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "نام و نام خانوادگی باید حداقل ۳ حرف باشد";
      isValid = false;
    } else {
      newErrors.name = "";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تماس الزامی است";
      isValid = false;
    } else if (!/^09[0-9]{9}$/.test(formData.phone.trim())) {
      newErrors.phone = "شماره تماس معتبر نیست";
      isValid = false;
    } else {
      newErrors.phone = "";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "آدرس الزامی است";
      isValid = false;
    } else if (formData.address.trim().length < 10) {
      newErrors.address = "آدرس باید حداقل ۱۰ حرف باشد";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    // Postal code validation
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "کد پستی الزامی است";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.postalCode.trim())) {
      newErrors.postalCode = "کد پستی باید ۱۰ رقم باشد";
      isValid = false;
    } else {
      newErrors.postalCode = "";
    }

    setErrors(newErrors);
    return isValid;
  };

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

            {/* Show submit error if exists */}
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6 text-center">
                {submitError}
              </div>
            )}

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
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="نام و نام خانوادگی"
                      className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                        errors.name ? "border-red-500" : "border-gray-600/50"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-sm">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="text-gray-300">
                      شماره تماس
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="شماره تماس"
                      className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                        errors.phone ? "border-red-500" : "border-gray-600/50"
                      }`}
                    />
                    {errors.phone && (
                      <span className="text-red-500 text-sm">
                        {errors.phone}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="address" className="text-gray-300">
                      آدرس
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="آدرس"
                      rows={3}
                      className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors resize-none ${
                        errors.address ? "border-red-500" : "border-gray-600/50"
                      }`}
                    />
                    {errors.address && (
                      <span className="text-red-500 text-sm">
                        {errors.address}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="postalCode" className="text-gray-300">
                      کد پستی
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="کد پستی"
                      className={`bg-gray-700/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors ${
                        errors.postalCode
                          ? "border-red-500"
                          : "border-gray-600/50"
                      }`}
                    />
                    {errors.postalCode && (
                      <span className="text-red-500 text-sm">
                        {errors.postalCode}
                      </span>
                    )}
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
                            {digitsEnToFa(item.selectedQuantity)} عدد
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-semibold">
                        {formatPrice(item.price * item.selectedQuantity)} تومان
                      </span>
                    </div>
                  ))}

                  <div className="border-t border-gray-700/50 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-300">
                      <span>قیمت کل</span>
                      <span>
                        {formatPrice(
                          cart.reduce(
                            (sum, item) =>
                              sum + item.price * item.selectedQuantity,
                            0
                          )
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>هزینه ارسال</span>
                      <span>رایگان</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-gray-700/50">
                      <span>مبلغ قابل پرداخت</span>
                      <span>
                        {formatPrice(
                          cart.reduce(
                            (sum, item) =>
                              sum + item.price * item.selectedQuantity,
                            0
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => addOrdersData()}
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 mt-6 
                      ${
                        isSubmitting
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer"
                      }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white">در حال ثبت سفارش...</span>
                      </div>
                    ) : (
                      <span className="text-white">پرداخت</span>
                    )}
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
