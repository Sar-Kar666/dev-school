"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function CreateCourse() {
  const router = useRouter();
  
  // Form State
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  
  // UI State
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [mounted, setMounted] = useState(false);

  // AUTH CHECK: Run this only on the client after mount
  useEffect(() => {
    const role = Cookies.get("role");
    const token = Cookies.get("token");

    if (role !== "ADMIN" || !token) {
      router.push("/");
    } else {
      setMounted(true);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const token = Cookies.get("token");
    
    // Check if token exists, not if it equals "ADMIN"
    if (!token) {
      setMessage({ type: "error", text: "Authentication token missing. Please sign in." });
      return;
    }

    if (!title || !description || price <= 0) {
      setMessage({ type: "error", text: "Please provide valid course details." });
      return;
    }

    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}courses/create`,
        { title, description, price, imageUrl },
        { headers: { token: token } } // Ensure your backend expects 'token' header
      );

      if (response.status === 201 || response.status === 200) {
        setMessage({ type: "success", text: "Course published successfully!" });
        setTitle("");
        setDescription("");
        setPrice(0);
        setImageUrl("");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to create course.";
      setMessage({ type: "error", text: errorMsg });
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent hydration mismatch: Render nothing until we confirm the user is an ADMIN
  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Create Course</h1>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Course Title</label>
              <input 
                type="text"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="e.g. Advanced Web Development"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
              <input 
                type="text"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea 
                rows={4}
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="What will students learn?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price (INR)</label>
              <input 
                type="number"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                placeholder="1999"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
              />
            </div>

            {message.text && (
              <div className={`p-3 rounded-lg text-sm font-medium ${
                message.type === "success" ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"
              }`}>
                {message.text}
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : "Publish Course"}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="hidden md:block">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Preview</h2>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 sticky top-8">
            {imageUrl ? (
                <img src={imageUrl} alt="Preview" className="h-40 w-full object-cover" />
            ) : (
                <div className="h-40 bg-slate-200 flex items-center justify-center text-slate-400">
                  No Image Provided
                </div>
            )}
            <div className="p-6 space-y-3">
              <h3 className="text-xl font-bold text-slate-900 break-words">
                {title || "Your Course Title"}
              </h3>
              <p className="text-slate-600 text-sm line-clamp-3 min-h-[4.5rem]">
                {description || "Course description will appear here..."}
              </p>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-2xl font-black text-indigo-600">
                  ₹{price > 0 ? price : "0"}
                </span>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded font-bold uppercase">
                  Admin Draft
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}