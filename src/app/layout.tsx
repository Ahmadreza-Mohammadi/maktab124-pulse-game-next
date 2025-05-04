"use client";

import "../app/globals.css";
import { ModalProvider } from "@/context/ModalContext";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import FooterWrapper from "@/components/footer/FooterWrapper";
import LogOutModal from "@/components/modal/LogOutModal";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPaymentPage = pathname === "/payment";

  return (
    <html lang="fa" dir="rtl">
      <body>
        <CartProvider>
          <ModalProvider>
            <ScrollToTop />
            {!isPaymentPage && <HeaderWrapper />}
            <div
              className={`bg-gray-900 min-h-screen flex flex-col ${
                isPaymentPage ? "p-0" : ""
              }`}
            >
              <main className="flex-grow">{children}</main>
              {!isPaymentPage && <FooterWrapper />}
            </div>
            <LogOutModal />
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
      </body>
    </html>
  );
}
