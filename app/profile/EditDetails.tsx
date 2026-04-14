"use client";

import { useState } from "react";
import { Edit, User, CheckCircle, AlertCircle, X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserProps {
  username: string;
  email: string;
}

export function EditDetails({ username, email }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState<string | undefined>(undefined);
  const [editedEmail, setEditedEmail] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  async function updateDetails() {
    const token = Cookies.get("token");
    if (!token) {
      setMessage({ text: "Authentication token missing.", type: "error" });
      return;
    }

    if (editedUsername === undefined && editedEmail === undefined) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/edit-details`,
        { username: editedUsername, email: editedEmail },
        { headers: { token: token } }
      );

      setMessage({ text: response.data.message || "Saved!", type: "success" });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error: any) {
      setMessage({ 
        text: error.response?.data?.message || "Failed to update.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  }

  // --- Common Header Section ---
  const Header = () => (
    <div className="mb-8 md:mb-12">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-900">My Profile</h1>
      <p className="text-base md:text-lg pt-2 text-slate-500">Manage your account settings</p>
      <h2 className="pt-10 md:pt-16 pb-4 text-xl md:text-2xl font-semibold text-slate-800 border-b border-slate-100">
        Personal Information
      </h2>
    </div>
  );

  if (isOpen) {
    return (
      <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 transition-all animate-in fade-in duration-300">
        <Header />

        <div className="border p-5 md:p-8 rounded-2xl shadow-sm bg-white space-y-5">
          {message && (
            <div className={`flex items-start gap-2 p-4 rounded-xl text-sm font-medium ${
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message.type === "success" ? <CheckCircle size={18} className="shrink-0" /> : <AlertCircle size={18} className="shrink-0" />}
              <span>{message.text}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none"
                defaultValue={username}
                placeholder="Enter username"
                onChange={(e) => setEditedUsername(e.target.value || undefined)}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition appearance-none"
                defaultValue={email}
                placeholder="Enter email"
                type="email"
                onChange={(e) => setEditedEmail(e.target.value || undefined)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
            <button
              disabled={loading}
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:bg-blue-400 transition shadow-lg shadow-blue-100"
              onClick={updateDetails}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="w-full sm:w-auto bg-slate-100 text-slate-600 px-8 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
              onClick={() => {
                setIsOpen(false);
                setMessage(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 md:py-10 px-4 transition-all animate-in fade-in duration-300">
      <Header />

      <div className="border border-slate-100 shadow-sm rounded-3xl p-5 md:p-8 flex flex-col md:flex-row items-center gap-6 bg-white w-full">
        {/* Avatar Container */}
        <div className="flex justify-center items-center border-4 border-slate-50 rounded-full bg-slate-100 p-5 shrink-0 shadow-inner">
          <User size={48} className="text-slate-400 md:w-14 md:h-14" />
        </div>

        {/* Text Container */}
        <div className="flex flex-col text-center md:text-left overflow-hidden w-full">
          <div className="font-bold text-xl md:text-2xl text-slate-900 truncate">
            {email}
          </div>
          <div className="text-slate-500 text-base md:text-lg">
            @{username}
          </div>
        </div>

        {/* Action Container */}
        <div className="w-full md:w-auto md:ml-auto">
          <button
            className="w-full md:w-fit bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition shadow-md shadow-blue-100"
            onClick={() => setIsOpen(true)}
          >
            <Edit size={18} /> 
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}