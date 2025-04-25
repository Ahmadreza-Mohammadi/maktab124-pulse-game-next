import "../app/globals.css";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import { ModalProvider } from "@/context/ModalContext";
import LogOutModal from "@/components/modal/LogOutModal";
import ClientLayout from "./ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <ModalProvider>
          <ClientLayout>{children}</ClientLayout>
        </ModalProvider>
      </body>
    </html>
  );
}
