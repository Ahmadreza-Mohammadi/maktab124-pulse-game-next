import "../app/globals.css";
import { ModalProvider } from "@/context/ModalContext";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import FooterWrapper from "@/components/footer/FooterWrapper";
import LogOutModal from "@/components/modal/LogOutModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ModalProvider>
          <ScrollToTop />
          <HeaderWrapper />
          <div className="bg-gray-900 min-h-screen flex flex-col">
            <main className="flex-grow">{children}</main>
            <FooterWrapper />
          </div>
          <LogOutModal />
        </ModalProvider>
      </body>
    </html>
  );
}
