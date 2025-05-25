"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useCart } from "@/context/CartContext";
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3, BsPerson, BsBoxSeam } from "react-icons/bs";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal, setShowLogoutModal } = useModal();
  const [isLogin, setIsLogin] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(!!accessToken);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
  };

  return (
    <header
      className="fixed py-8 top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-blue-950 shadow-xl backdrop-blur-sm bg-opacity-90"
      dir="rtl"
    >
      {/* desktop  */}
      <DesktopMenu
        handleNavigation={handleNavigation}
        isLogin={isLogin}
        cart={cart}
        setShowLogoutModal={setShowLogoutModal}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Mobile Menu */}
      {isMenuOpen && (
        <MobileMenu
          handleNavigation={handleNavigation}
          isLogin={isLogin}
          cart={cart}
          setShowLogoutModal={setShowLogoutModal}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </header>
  );
}
export default Header;
