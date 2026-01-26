"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function SigninPage({ onClose }: { onClose: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState(""); // ✅ Changed from String | null to string
  const [password, setPassword] = useState(""); // ✅ Changed from String | null to string


   const router = useRouter();
   
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  async function handleSignin() {
    setLoading(true);
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }

    setLoading(false);
    onClose();
    router.refresh(); // ✅ Refreshes server components only
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white z-10"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Banner */}
          <div className="relative hidden md:block h-full min-h-100">
            <Image
              src="/banner.png"
              alt="Banner"
              fill
              className="object-cover"
            />
          </div>

          {/* Form */}
          <div className="p-8 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500">
                Join us and start learning
              </p>
            </div>

            {/* Email */}
            <input
              type="email" // ✅ Changed to type="email" for better validation
              placeholder="Email"
              value={email} // ✅ Added: Controlled input
              className="border h-11 w-full px-4 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password} // ✅ Added: Controlled input
                className="border h-11 w-full px-4 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-sm text-gray-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Error */}
            {error && <p className="text-sm text-red-500">{error}</p>}

            {/* Submit */}
            <button
              onClick={handleSignin}
              disabled={loading}
              className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
            >
              {loading ? "Please wait..." : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}