"use client";
import axios from "axios";
import Cookies from "js-cookie";
import { Lock, ShieldCheck } from "lucide-react";
import { useState } from "react";

export function EditPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState<string | undefined>(undefined);
  const [newPassword1, setNewPassword1] = useState<string | undefined>(undefined);
  const [newPassword2, setNewPassword2] = useState<string | undefined>(undefined);
   const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState<{ text: string; type: "success" | "error" } | null>(null);


  async function passwordSubmit(){
  if (!oldPassword || !newPassword1 || !newPassword2) {
    return setMessage({ text: "Please fill in all fields", type: "error" });
  }
  if (newPassword1 !== newPassword2) {
    return setMessage({ text: "Passwords do not match", type: "error" });
  }
    const newPassword= newPassword1;
    setLoading(true);
    setMessage(null);
    const token=Cookies.get("token");
    try{
        const response= await axios.put(`${process.env.NEXT_PUBLIC_SERVER_URL}user/edit-password`,{
        oldPassword:oldPassword,
        newPassword:newPassword
    },{
        headers:{token}
    });
     setMessage({ text: response.data.message || "Changes saved successfully!", type: "success" });
         setTimeout(() => {
        window.location.reload();
      }, 1500);
    }catch (error: any) {
      console.error(error);
      setMessage({ 
        text: error.response?.data?.message || "Failed to update details. Please try again.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  }


  if (isOpen) {
    return (
      <div className="max-w-4xl mx-auto px-4 pt-10">
        <h2 className="pb-5 text-2xl font-medium flex items-center gap-2">
          <ShieldCheck className="text-blue-600" /> Update Security
        </h2>
        
        <div className="border shadow-lg rounded-2xl p-8 bg-white w-full">
            {message && (
            <div className={`mb-4 p-3 rounded-md text-sm font-medium ${
              message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}>
              {message.text}
            </div>
          )}
          <div className="space-y-4">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Current Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setOldPassword(e.target.value || undefined)}
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setNewPassword1(e.target.value || undefined)}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700">Confirm New Password</label>
              <input
                type="password"
                placeholder="Repeat new password"
                className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition"
                onChange={(e) => setNewPassword2(e.target.value || undefined)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <button
                className="h-11 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                onClick={passwordSubmit}
              >
                {loading? "Saving Passowrd...": "Save Password"}
              </button>
              <button
                className="h-11 px-6 bg-slate-100 text-slate-600 rounded-md hover:bg-slate-200 transition font-medium"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pt-10">
      <h2 className="pb-5 text-2xl font-medium">Security</h2>

      <div className="h-fit border shadow rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5 w-full bg-white">
        <div className="flex justify-center items-center border rounded-full bg-slate-50 p-4 shrink-0">
          <Lock size={40} className="text-slate-400" />
        </div>

        <div className="flex flex-col">
          <div className="font-semibold text-xl text-slate-900">Change Password</div>
          <div className="text-slate-500">Update your password to keep your account secure</div>
        </div>

        <div className="sm:ml-auto">
          <button
            className="h-11 w-full sm:w-fit bg-blue-600 text-white px-6 rounded-md hover:bg-blue-700 transition shadow-sm font-medium"
            onClick={() => setIsOpen(true)}
          >
            Edit Password
          </button>
        </div>
      </div>
    </div>
  );
}