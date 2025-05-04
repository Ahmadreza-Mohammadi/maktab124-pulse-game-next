"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useCart } from "@/context/CartContext";
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3, BsPerson, BsBoxSeam } from "react-icons/bs";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo Section */}
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavigation("/home")}
        >
          <span className="text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors duration-300">
            پالس گیم
          </span>
          <img
            className="h-12"
            src="https://www.svgrepo.com/show/337754/game.svg"
            alt=""
          />
        </div>
        {/* Navigation Section */}
        <nav className="hidden lg:flex items-center gap-8">
          <div
            className="relative group cursor-pointer flex items-center gap-1"
            onClick={() => handleNavigation("/home")}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              خانه
            </span>
            <IoHomeOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>

          <div
            className="relative group cursor-pointer flex items-center gap-1"
            onClick={() => handleNavigation("/products")}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              محصولات
            </span>
            <BsBoxSeam className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>

          <div
            className="relative group cursor-pointer flex items-center gap-1"
            onClick={() => handleNavigation("/cart")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                سبد خرید
              </span>
              <div className="relative">
                <BsCart3 className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-red-500/20">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>

          {isLogin && (
            <>
              <div
                className="relative group cursor-pointer flex items-center gap-1"
                onClick={() => handleNavigation("/profile")}
              >
                <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                  پروفایل
                </span>
                <BsPerson className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </div>

              <div
                className="relative group cursor-pointer flex items-center gap-1"
                onClick={() => setShowLogoutModal(true)}
              >
                <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                  خروج
                </span>
                <IoLogOutOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </div>
            </>
          )}

          {!isLogin && (
            <div
              className="relative group cursor-pointer flex items-center gap-1"
              onClick={() => handleNavigation("/login")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                وارد شوید
              </span>
              <IoLogInOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none hover:text-blue-400 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900/95 backdrop-blur-sm px-4 py-6 animate-slide-down">
          <nav className="flex flex-col gap-6">
            <div
              className="relative group cursor-pointer flex items-center gap-1"
              onClick={() => handleNavigation("/home")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                خانه
              </span>
              <IoHomeOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>

            <div
              className="relative group cursor-pointer flex items-center gap-1"
              onClick={() => handleNavigation("/products")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                محصولات
              </span>
              <BsBoxSeam className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>

            <div
              className="relative group cursor-pointer flex items-center gap-1"
              onClick={() => handleNavigation("/cart")}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  سبد خرید
                </span>
                <div className="relative">
                  <BsCart3 className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow-lg shadow-red-500/20">
                      {cart.length}
                    </span>
                  )}
                </div>
              </div>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>

            {isLogin && (
              <>
                <div
                  className="relative group cursor-pointer flex items-center gap-1"
                  onClick={() => handleNavigation("/profile")}
                >
                  <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                    پروفایل
                  </span>
                  <BsPerson className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </div>

                <div
                  className="relative group cursor-pointer flex items-center gap-1"
                  onClick={() => setShowLogoutModal(true)}
                >
                  <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                    خروج
                  </span>
                  <IoLogOutOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                  <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
                </div>
              </>
            )}

            {!isLogin && (
              <div
                className="relative group cursor-pointer flex items-center gap-1"
                onClick={() => handleNavigation("/login")}
              >
                <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                  وارد شوید
                </span>
                <IoLogInOutline className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
                <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
export default Header;
