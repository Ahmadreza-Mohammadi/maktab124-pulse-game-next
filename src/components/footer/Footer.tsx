"use client";

import {
  FaTelegram,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
import { IoGameController } from "react-icons/io5";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-blue-950 text-white pt-10 pb-6">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8 mb-8 text-center">
          {/* Brand Section */}
          <div className="space-y-4 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <IoGameController className="text-3xl text-blue-500" />
              <span className="text-2xl font-extrabold tracking-tight">
                پالس گیم
              </span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-[280px]">
              فروشگاه آنلاین بازی‌های ویدیویی و لوازم گیمینگ با بهترین قیمت‌ها و
              کیفیت
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-500 transition-colors duration-300"
              >
                <FaTelegram className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition-colors duration-300"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-red-500 transition-colors duration-300"
              >
                <FaYoutube className="text-2xl" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-500 transition-colors duration-300"
              >
                <FaDiscord className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-white">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  خانه
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  محصولات
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  سبد خرید
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  پروفایل
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-white">دسته‌بندی‌ها</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  بازی‌های PC
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  بازی‌های کنسول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  لوازم گیمینگ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  گیفت کارت
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-white">پشتیبانی</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  سوالات متداول
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  راهنمای خرید
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  شرایط بازگشت
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  گزارش مشکل
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-white">درباره ما</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  درباره پالس گیم
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  همکاری با ما
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  فرصت‌های شغلی
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-base"
                >
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 text-white">تماس با ما</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <span className="block text-base font-medium mb-0.5">
                  پشتیبانی 24/7
                </span>
                <span className="text-sm">021-12345678</span>
              </li>
              <li className="text-gray-300">
                <span className="block text-base font-medium mb-0.5">
                  ایمیل
                </span>
                <span className="text-sm">support@pulsegame.ir</span>
              </li>
              <li className="text-gray-300">
                <span className="block text-base font-medium mb-0.5">آدرس</span>
                <span className="text-sm">تهران، خیابان آزادی، پلاک 123</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm font-medium">
              © {new Date().getFullYear()} پالس گیم. تمامی حقوق محفوظ است.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                قوانین و مقررات
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                حریم خصوصی
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white text-sm font-medium transition-colors duration-300"
              >
                درباره ما
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
