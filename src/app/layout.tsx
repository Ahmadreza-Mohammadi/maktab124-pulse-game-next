"use client";

import "../app/globals.css";
import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import { ModalProvider } from "@/context/ModalContext";
import LogOutModal from "@/components/modal/LogOutModal";
import { useModal } from "@/context/ModalContext";

function RootLayoutContent({ children }: { children: React.ReactNode }) {
  const { showLogoutModal } = useModal();

  return (
    <html lang="fa" dir="rtl">
      <body>
        <ScrollToTop />
        <HeaderWrapper />
        <div className="bg-gray-900">{children}</div>
        {showLogoutModal && <LogOutModal />}
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <RootLayoutContent>{children}</RootLayoutContent>
    </ModalProvider>
  );
}
