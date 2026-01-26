// app/components/ProfileClient.tsx
"use client";

import { Menu } from "./icons/Menu";
import { useEffect, useRef, useState } from "react";
import { SigninPage } from "../components/ui/Signin";
import { Signup } from "../components/ui/Signup";
import { signOut } from "next-auth/react";
import type { Session } from "next-auth";

interface ProfileClientProps {
  session: Session | null;
}

export function ProfileClient({ session }: ProfileClientProps) {
  const [open, setOpen] = useState(false);
  const [signinOpen, setSigninOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function Dropdown() {
    return (
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg text-sm z-50">
        <div className="px-3 py-2 cursor-pointer border-b hover:bg-slate-100">
          Courses
        </div>
        {session ? (
          <>
            <div className="px-3 py-2 cursor-pointer border-b hover:bg-slate-100">
              Profile
            </div>
            <div
              onClick={() => signOut()}
              className="px-3 py-2 cursor-pointer text-red-600 hover:bg-red-50"
            >
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                setSigninOpen(true);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer border-b hover:bg-blue-50"
            >
              Signin
            </div>
            <div
              onClick={() => {
                setSignupOpen(true);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer hover:bg-blue-50"
            >
              Signup
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {session ? (
        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-md transition"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur border border-gray-300 text-gray-900 font-semibold text-lg shadow transition-all duration-200 hover:border-blue-500 hover:bg-blue-50 hover:shadow-md cursor-pointer">
              {session.user?.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          </button>
          {open && <Dropdown />}
        </div>
      ) : (
        <>
          <button
            onClick={() => setSigninOpen(true)}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold border border-blue-700 text-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition"
          >
            Signin
          </button>

          <button
            onClick={() => setSignupOpen(true)}
            className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-white rounded-md bg-blue-700 hover:bg-blue-500 transition"
          >
            Get Started
          </button>

          <div className="relative sm:hidden" ref={dropDownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-md hover:bg-slate-100 transition"
            >
              <Menu />
            </button>
            {open && <Dropdown />}
          </div>

          {signinOpen && <SigninPage onClose={() => setSigninOpen(false)} />}
          {signupOpen && <Signup onClose={() => setSignupOpen(false)} />}
        </>
      )}
    </div>
  );
}