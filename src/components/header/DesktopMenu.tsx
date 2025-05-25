"use client";

import { IoHomeOutline } from "react-icons/io5";
import { BsCart3, BsPerson, BsBoxSeam } from "react-icons/bs";
import { IoLogOutOutline, IoLogInOutline } from "react-icons/io5";
import { MdPayment } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { DesktopMenuProps } from "../interfaces/interface";



function DesktopMenu({
  handleNavigation,
  isLogin,
  cart,
  setShowLogoutModal,
  isMenuOpen,
  setIsMenuOpen,
}: DesktopMenuProps) {
  return (
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
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  پروفایل
                </span>
                <BsPerson className="text-xl text-white group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              {/* Hover Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 py-2">
                <div
                  className="px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("/profile")}
                >
                  <BsPerson className="text-lg" />
                  <span>تنظیمات حساب</span>
                </div>
                <div
                  className="px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("/payment-log")}
                >
                  <MdPayment className="text-lg" />
                  <span>سوابق پرداخت</span>
                </div>
                <div
                  className="px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-blue-400 hover:bg-gray-700/50 transition-colors cursor-pointer"
                  onClick={() => handleNavigation("/orders")}
                >
                  <FaHistory className="text-lg" />
                  <span>سفارشات</span>
                </div>
              </div>
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
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  );
}

export default DesktopMenu;
