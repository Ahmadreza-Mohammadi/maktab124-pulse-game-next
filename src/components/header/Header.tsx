"use client";

import { useRouter } from "next/navigation";
import { pages } from "../constants/Constants";
import { useState } from "react";
import { log } from "console";

function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logOutHandler = () => {
    localStorage.removeItem("accessToken");
    router.push("login")
  };

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
          onClick={() => handleNavigation("/")}
        >
          <span className="text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors duration-300">
            پالس گیم
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="hidden lg:flex items-center gap-8">
          {pages.map((page) => (
            <div
              key={page.name}
              className="relative group cursor-pointer"
              onClick={() => handleNavigation(page.path)}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                {page.name}
              </span>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>
          ))}

          {/* Cart with Badge */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleNavigation("/cart")}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                سبد خرید
              </span>
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>

          {/* Profile Link */}
          <div
            className="relative group cursor-pointer"
            onClick={() => handleNavigation("/profile")}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              پروفایل
            </span>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>

          <div
            className="relative group cursor-pointer"
            onClick={logOutHandler}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              خروج
            </span>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>
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
            {pages.map((page) => (
              <div
                key={page.name}
                className="relative group cursor-pointer"
                onClick={() => handleNavigation(page.path)}
              >
                <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                  {page.name}
                </span>
                <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </div>
            ))}

            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigation("/support")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                پشتیبانی
              </span>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>

            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigation("/cart")}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                  سبد خرید
                </span>
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>

            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigation("/profile")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                پروفایل
              </span>
              <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
