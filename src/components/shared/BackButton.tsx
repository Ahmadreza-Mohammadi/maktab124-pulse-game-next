"use client";

import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();
  return (
        <div>  <button
    onClick={() => router.back()}
    className="flex items-center gap-2 text-blue-200 hover:text-blue-400 transition-colors cursor-pointer"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
        بازگشت
      </button>
    </div>
  );
}

export default BackButton