"use client";
import { useState} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function EditCourse() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 1. Initialize state from URL params
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [imageUrl, setImageUrl] = useState(searchParams.get("imageUrl") || "");
  const [description, setDescription] = useState(searchParams.get("description") || "");
const [price, setPrice] = useState<number>(
  Number(searchParams.get("price")) || 0
);
  const courseId = searchParams.get("id");


  const [isLoading, setIsLoading] = useState(false);
 const [message, setMessage] = useState({ text: "", isError: false });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
          const response = await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}courses/edit-course`,{
        title,description,imageUrl,price,courseId
    },{
        headers:{
            token:Cookies.get("token")
        }
    })
    if (response.status === 200) {
    setMessage({ text: "Course updated successfully!", isError: false });
    }
    }catch (e: any) {
    const errorMsg = e.response?.data?.message || "Failed to update course";
    setMessage({ text: errorMsg, isError: true });
} finally {
    setIsLoading(false);
    setTimeout(()=>router.push("/courses"),2000);
}
  
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Edit Course</h1>
          <p className="text-slate-500 text-sm mb-6">Editing ID: {courseId}</p>
          
          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Course Title</label>
              <input 
                type="text"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Image URL</label>
              <input 
                type="text"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
              <textarea 
                rows={4}
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Price (INR)</label>
              <input 
                type="number"
                className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                value={price || ""}
                onChange={(e) => setPrice(Number(e.target.value) || 0)}
              />
            </div>
           {message.text && (
            <div className={`p-4 rounded-xl text-sm font-medium border animate-in fade-in slide-in-from-top-1 ${
                message.isError ? "bg-red-50 text-red-700 border-red-100" 
                : "bg-green-50 text-green-700 border-green-100"
            }`}>
             <div className="flex items-center gap-2">
                {message.isError ? "" : ""}
                {message.text}
            </div>
             </div>)}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all"
            >
              {isLoading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>

        {/* Preview Section - Unchanged but now reactive to local state */}
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