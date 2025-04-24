"use client";

import { API_KEY, BASE_URL } from "@/api/API";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginHandler() {
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
      alert("Login failed. Please check your credentials and try again.");
    }
  }
  

  return (
    <div className="">
      <div className="flex flex-col">
        <input
          className="border p-1 rounded-2xl"
          type="text"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-1 rounded-2xl"
          type="password"
          placeholder="رمزعبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="cursor-pointer" onClick={loginHandler}>
        login
      </button>
    </div>
  );
}

export default Login;
