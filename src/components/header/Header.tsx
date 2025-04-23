"use client";

import { useRouter } from "next/navigation";
import { pages } from "../constants/Constants";
import { useState } from "react";

function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <header
      className="fixed py-4 top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-blue-950 shadow-xl"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer">
            پالس گیم
          </span>
        </div>

        {/* Search Section */}
        <div className="hidden md:flex items-center w-full max-w-md mx-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
            جستجو
          </button>
          <input
            className="w-full bg-gray-800 text-white p-2 rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-right"
            type="text"
            placeholder="جستجو..."
          />
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
          <div
            className="relative group cursor-pointer"
            onClick={() => handleNavigation("/support")}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              پشتیبانی
            </span>
            <span className="absolute right-0 bottom-0 h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-500 ease-in-out"></span>
          </div>
          <div className="relative group flex items-center gap-2">
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              سبد خرید
            </span>
            <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -left-6">
              3
            </span>
          </div>
          <div
            className="relative group cursor-pointer"
            onClick={() => handleNavigation("/profile")}
          >
            <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
              پروفایل
            </span>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 px-4 py-6 animate-slide-down">
          <nav className="flex flex-col gap-4">
            {pages.map((page) => (
              <div
                key={page.name}
                className="relative group cursor-pointer"
                onClick={() => handleNavigation(page.path)}
              >
                <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                  {page.name}
                </span>
              </div>
            ))}
            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigation("/support")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                پشتیبانی
              </span>
            </div>
            <div className="relative group flex items-center gap-2">
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                سبد خرید
              </span>
              <span className="bg-red-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </div>
            <div
              className="relative group cursor-pointer"
              onClick={() => handleNavigation("/profile")}
            >
              <span className="text-lg font-semibold text-white hover:text-blue-400 transition-colors duration-300">
                پروفایل
              </span>
            </div>
            <div className="flex items-center mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors duration-300">
                جستجو
              </button>
              <input
                className="w-full bg-gray-800 text-white p-2 rounded-l-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-right"
                type="text"
                placeholder="جستجو..."
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;