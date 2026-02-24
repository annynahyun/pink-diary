"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "1234") {
      router.push("/diary");
    } else {
      alert("WRONG PASSWORD");
      setPassword("");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center w-[500px]">
        <h1 className="text-2xl font-bold text-pink-500 mb-8">Login</h1>

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-pink-200 rounded-xl px-4 py-3 text-center outline-none focus:ring-2 focus:ring-pink-300"
        />

        <button
          onClick={handleLogin}
          className="mt-6 bg-pink-500 text-white px-8 py-2 rounded-full hover:bg-pink-600 transition mx-auto block tracking-widest"
        >
          ENTER
        </button>

        <button
          onClick={() => router.push("/")}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          ← BACK
        </button>
      </div>
    </main>
  );
}

