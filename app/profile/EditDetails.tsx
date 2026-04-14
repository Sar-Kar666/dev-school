"use client";

import { useState } from "react";
import { Edit, User, CheckCircle, AlertCircle } from "lucide-react";
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
      setMessage({ text: "Authentication token missing. Please log in.", type: "error" });
      return;
    }

    // Don't send a request if nothing changed
    if (editedUsername === undefined && editedEmail === undefined) {
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}user/edit-details`,
        {
          username: editedUsername,
          email: editedEmail,
        },
        {
          headers: {
            token: token,
          },
        }
      );

      setMessage({ text: response.data.message || "Changes saved successfully!", type: "success" });
      
      // Optional: Refresh the page after 1.5 seconds to show new data in the profile view
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (error: any) {
      console.error(error);
      setMessage({ 
        text: error.response?.data?.message || "Failed to update details. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  }

  // Edit Mode UI
  if (isOpen) {
    return (
      <div className="max-w-4xl mx-auto pt-10 px-4">
        <h1 className="text-5xl font-bold">My Profile</h1>
        <h3 className="text-lg pt-2 text-slate-500">Manage your account settings</h3>

        <h2 className="pt-20 pb-5 text-2xl font-medium">Personal Information</h2>

        <div className="border p-6 rounded-2xl shadow-sm bg-white space-y-4">
          {/* Status Message */}
          {message && (
            <div className={`flex items-center gap-2 p-3 rounded-md text-sm font-medium ${
              message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {message.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
              {message.text}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
              defaultValue={username}
              onChange={(e) => setEditedUsername(e.target.value || undefined)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
              defaultValue={email}
              onChange={(e) => setEditedEmail(e.target.value || undefined)}
            />
          </div>

          <div className="flex items-center gap-5 pt-2">
            <button
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition min-w-[120px]"
              onClick={updateDetails}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
            <button
              className="bg-slate-100 text-black px-4 py-2 rounded-md hover:bg-slate-200 transition"
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

  // Display Mode UI
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-5xl font-bold pt-10">My Profile</h1>
      <h3 className="text-lg pt-2 text-slate-500">Manage your account settings</h3>

      <h2 className="pt-20 pb-5 text-2xl font-medium">Personal Information</h2>

      <div className="h-fit border shadow rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 w-full bg-white">
        <div className="flex justify-center items-center border rounded-full bg-slate-200 p-4 shrink-0">
          <User size={60} color="gray" />
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-2xl">{email}</div>
          <div className="text-slate-700 text-lg">{username}</div>
        </div>

        <div className="sm:ml-auto">
          <button
            className="h-12 w-fit bg-blue-600 text-white px-4 py-1 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
            onClick={() => setIsOpen(true)}
          >
            <Edit size={20} /> Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}