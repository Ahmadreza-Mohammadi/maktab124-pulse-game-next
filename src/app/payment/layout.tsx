"use client";

import { ModalProvider } from "@/context/ModalContext";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <ModalProvider>
        <ScrollToTop />
        <div className="bg-gray-900 min-h-screen flex flex-col p-0">
          <main className="flex-grow">{children}</main>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ModalProvider>
    </CartProvider>
  );
}
