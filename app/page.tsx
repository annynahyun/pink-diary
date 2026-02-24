"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-pink-100">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center w-[500px]">
        <h1 className="text-2xl font-bold text-pink-500 mb-8">
          🌸 Secret Diary 🌸
        </h1>

        <button
          onClick={() => router.push("/login")}
          className="bg-pink-500 text-white px-8 py-2 rounded-full hover:bg-pink-600 transition mx-auto block tracking-widest"
        >
          LOGIN
        </button>
      </div>
    </main>
  );
}
