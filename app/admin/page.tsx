"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function closeModal() {
    router.back(); // go back to previous page
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black px-4"
      
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-8 shadow-xl"
      >
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Login</h1>
          <button onClick={closeModal}>✕</button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            placeholder="Admin Email"
            className="w-full rounded-lg border px-3 py-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border px-3 py-2"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full rounded-lg bg-black text-white py-2">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
