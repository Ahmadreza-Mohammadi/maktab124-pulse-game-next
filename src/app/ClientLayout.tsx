"use client";

import ScrollToTop from "@/components/scroll-to-top/ScrollToTop";
import HeaderWrapper from "@/components/header/HeaderWrapper";
import LogOutModal from "@/components/modal/LogOutModal";
import { useModal } from "@/context/ModalContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { showLogoutModal } = useModal();

  return (
    <>
      <ScrollToTop />
      <HeaderWrapper />
      <div className="bg-gray-900">{children}</div>
      {showLogoutModal && <LogOutModal />}
    </>
  );
}
