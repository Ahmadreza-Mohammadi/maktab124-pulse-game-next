import "../app/globals.css";
import { ModalProvider } from "@/context/ModalContext";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import FooterWrapper from "@/components/footer/FooterWrapper";
import LogOutModal from "@/components/modal/LogOutModal";
import { CartProvider } from "@/context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazir",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir">
        <CartProvider>
          <ModalProvider>
            <ScrollToTop />
            <HeaderWrapper />
            <div className="bg-gray-900 min-h-screen flex flex-col">
              <main className="flex-grow">{children}</main>
              <FooterWrapper />
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
