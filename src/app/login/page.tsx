"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const navToHome = localStorage.getItem("accessToken");
    navToHome && router.push("/home");
  }, []);

  async function loginHandler(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${BASE_URL}/api/users/login`,
        { email, password },
        {
          headers: {
            api_key: API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("accessToken", JSON.stringify(res.data.accessToken));
      router.push("home");
    } catch (error) {
      console.error("Login failed:", error);
      setError("ورود ناموفق. لطفا اطلاعات خود را بررسی کنید.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-blue-950 p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Logo and Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">پالس گیم</h1>
            <p className="text-gray-400">به پنل کاربری خود خوش آمدید</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={loginHandler} className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">ایمیل</label>
              <input
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-300 text-sm">رمز عبور</label>
              <input
                className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "ورود"
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="text-center space-y-2">
            <a
              href="#"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors duration-300"
            >
              فراموشی رمز عبور
            </a>
            <p className="text-gray-400 text-sm">
              حساب کاربری ندارید؟{" "}
              <a
                href="#"
                className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
              >
                ثبت نام
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
