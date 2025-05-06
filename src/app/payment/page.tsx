"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import { FormErrors, Order } from "@/components/interfaces/interface";
import PaymentContent from "@/components/payment/PaymentContent";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";



function Payment() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [id, setId] = useState<string>("");
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [showOrderSelect, setShowOrderSelect] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    otp: "",
    email: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    cardNumber: "",
    expiry: "", 
    cvv: "",
    otp: "",
    email: "",
    name: "",
    phone: "",
    address: "",
    postalCode: ""
  });

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/records/orders`, {
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // پیدا کردن همه سفارش‌های پرداخت نشده و مرتب کردن بر اساس تاریخ
        const allPendingOrders = res.data.records
          .filter((order: Order) => order.payment === "pending")
          .sort(
            (a: Order, b: Order) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        setPendingOrders(allPendingOrders);

        if (allPendingOrders.length > 0) {
          // آخرین سفارش رو به صورت پیش‌فرض انتخاب می‌کنیم
          setId(allPendingOrders[0].id);
        } else {
          toast.error("سفارش در انتظار پرداختی یافت نشد", {
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
          router.push("/home");
        }
      } catch (error) {
        toast.error("خطا در دریافت اطلاعات سفارش", {
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
        router.push("/home");
      }
    };
    getOrders();
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Card Number validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "شماره کارت الزامی است";
      isValid = false;
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "شماره کارت باید ۱۶ رقم باشد";
      isValid = false;
    } else {
      newErrors.cardNumber = "";
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = "تاریخ انقضا الزامی است";
      isValid = false;
    } else {
      newErrors.expiry = "";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV2 الزامی است";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV2 باید ۳ یا ۴ رقم باشد";
      isValid = false;
    } else {
      newErrors.cvv = "";
    }

    if (!formData.otp.trim()) {
      newErrors.otp = "رمز پویا الزامی است";
      isValid = false;
    } else {
      newErrors.otp = "";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "ایمیل وارد شده معتبر نیست";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handlePayment = async (orderId: string) => {
    if (!validateForm()) {
      toast.error("لطفا همه فیلدها را به درستی پر کنید", {
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

    if (!orderId) {
      toast.error("شناسه سفارش یافت نشد", {
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
      router.push("/payment-failed");
      return;
    }

    try {
      setIsProcessing(true);
      const res = await axios.put(
        `${BASE_URL}/api/records/orders/${orderId}`,
        {
          payment: "paid",
        },
        {
          headers: {
            api_key: API_KEY,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (res.status === 200) {
        localStorage.removeItem("cart");
        toast.success("پرداخت با موفقیت انجام شد", {
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
        router.push("/payment-success");
      } else {
        throw new Error("Payment update failed");
      }
    } catch (error) {
      toast.error("خطا در پردازش پرداخت", {
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
      router.push("/payment-failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PaymentContent
      pendingOrders={pendingOrders}
      showOrderSelect={showOrderSelect}
      setShowOrderSelect={setShowOrderSelect}
      id={id}
      setId={setId}
      formData={formData}
      errors={errors}
      handleInputChange={handleInputChange}
      handlePayment={handlePayment}
      isProcessing={isProcessing}
      showOTP={showOTP}
      setShowOTP={setShowOTP}
    />
  );
}

export default Payment;
