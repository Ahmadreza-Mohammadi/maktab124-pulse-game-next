"use client";

import { useRouter } from "next/navigation";
import { useModal } from "@/context/ModalContext";

function LogOutModal() {
  const router = useRouter();
  const { showLogoutModal, setShowLogoutModal } = useModal();

  const logOutHandler = () => {
    setShowLogoutModal(false);
    localStorage.removeItem("accessToken");
    router.push("/login");
  };

  if (!showLogoutModal) return null;

  return (
    <div className="fixed inset-0 z-50 h-screen">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/20 h-screen"
        onClick={() => setShowLogoutModal(false)}
      />

      {/* Modal Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            خروج از حساب کاربری
          </h2>
          <p className="text-gray-300 mb-6">
            آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟
          </p>

          <div className="flex gap-4">
            <button
              onClick={logOutHandler}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              خروج
            </button>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOutModal;
