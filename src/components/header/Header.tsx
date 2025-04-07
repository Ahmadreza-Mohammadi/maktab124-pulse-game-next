"use client";

import { useRouter } from "next/navigation";
import { pages } from "../constants/Pages";

function Header() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  return (
    <div className="flex flex-col">
      {/* Top Bar */}
      <div className="px-5 py-12 bg-gray-900 flex items-center justify-between shadow-lg">
        {/* Logo Section */}
        <div className="flex gap-4 items-center relative">
          <img
            className="h-16 cursor-pointer transform hover:scale-110 transition duration-300"
            src="https://www.svgrepo.com/show/408429/user-person-profile-block-account-circle.svg"
            alt="Profile Icon"
          />
          <div className="relative">
            <img
              className="h-16 cursor-pointer transform hover:scale-110 transition duration-300"
              src="https://www.svgrepo.com/show/441364/cart.svg"
              alt="Cart Icon"
            />
            {/* Quantity Circle */}
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        {/* Search Section */}
        <div className="flex items-center">
          <input
            className="border outline-none w-96 border-gray-600 bg-gray-800 text-white p-2 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="جستجو..."
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-l-md hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-500">
            جستجو
          </button>
        </div>

        {/* Gaming Title Section */}
        <div className="flex items-center gap-4">
          <span className="font-bold text-2xl text-blue-400 hover:text-blue-300 transition duration-300">
            پالس گیم
          </span>
          <img
            className="h-20 transform hover:rotate-12 hover:scale-110 transition duration-300"
            src="https://www.svgrepo.com/show/283919/game-console.svg"
            alt="Gaming Icon"
          />
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-blue-50 flex justify-between items-center px-6 shadow-lg">
        <ul className="py-6 flex gap-8 text-gray-600 text-xl font-bold">
          {pages.map((page) => {
            return (
              <div
                className="flex items-center gap-2 group cursor-pointer hover:text-gray-800 transition duration-300 relative"
                key={page.name}
                onClick={()=>handleNavigation(page.path)}
              >
                <li className="py-4">{page.name}</li>
                <img
                  className="h-7 transform group-hover:scale-110 group-hover:rotate-6 transition duration-300"
                  src={page.img}
                  alt={page.name}
                />
                <span className="absolute left-0 bottom-2 h-[2px] w-0 bg-blue-600 group-hover:w-full transition-all duration-500 ease-in-out"></span>
              </div>
            );
          })}
        </ul>
        <div className="flex items-center gap-2">
          <img
            className="h-12 cursor-pointer transform hover:scale-110 hover:rotate-6 transition duration-300"
            src="https://www.svgrepo.com/show/299700/support-call.svg"
            alt="Support Icon"
          />
          <span className="text-gray-800 text-2xl font-bold transition duration-300 cursor-pointer hover:text-blue-500">
            پشتیبانی
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
