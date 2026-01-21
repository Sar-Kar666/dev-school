"use client";

import { useState, useRef, useEffect } from "react";
import UserIcon from "../icons/UserIcon";

export function Profile (){
    
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

    return<div>
        <div className="relative" ref={menuRef}>

        {/* Profile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <UserIcon />
        </button>

        {/* Profile Modal */}
    {/* Profile Modal */}
{open && (
  <div className="absolute right-0 mt-3 w-48 bg-white border rounded-xl shadow-lg z-50">

    <div className="py-2 text-sm">

      {/* Mobile nav links */}
      <div className="block sm:hidden">

        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Home
        </div>

        <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          Courses
        </div>

        <div className="border-t my-1"></div>

      </div>

      {/* Profile links */}
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        Profile
      </div>

      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
        My Courses
      </div>

      <div className="border-t my-1"></div>

      <div className="px-4 py-2 hover:bg-red-50 text-red-600 cursor-pointer">
        Logout
      </div>

    </div>

  </div>
)}


      </div>
    </div>
}