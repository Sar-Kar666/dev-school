"use client";

import { useEffect, useState } from "react";
import { X, CalendarDays, CheckCircle2 } from "lucide-react"; // Added CheckCircle2
import axios from "axios";
import Cookies from "js-cookie";


interface CourseModalProps {
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  img: string;
  createdAt: string;
}

export function CourseModal({
  onClose,
  id,
  title,
  description,
  img,
  createdAt,
}: CourseModalProps) {
  const [mounted, setMounted] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

   async function  handleEnroll  ()  {
    const  res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}purchases/buy`,{
      courseId:id},{
      headers:{
        token: Cookies.get("token")
      }
    })
     if(res.status===200){
        setConfirmation(true);
     }
    
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 transition-opacity duration-300 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative flex h-fit max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-300 ${
          mounted ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 z-10 rounded-full bg-slate-100/50 p-2 text-slate-500 hover:bg-slate-200 transition-colors backdrop-blur-md"
        >
          <X className="h-5 w-5" />
        </button>

        {!confirmation ? (
          /* --- REGULAR COURSE DETAILS VIEW --- */
          <>
            <div className="relative h-48 w-full md:h-60">
              <img src={img} alt={title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold font-sans text-white md:text-4xl">{title}</h2>
              </div>
            </div>

            <div className="overflow-y-auto p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-slate-100 text-slate-600">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm font-sans font-medium">Added on {createdAt}</span>
              </div>
              <h3 className="text-lg font-bold font-sans text-slate-900 mb-2">About this course</h3>
              <p className="font-serif text-slate-700 leading-relaxed">{description}</p>
            </div>

            <div className="border-t border-slate-100 p-6 md:p-8 flex flex-col sm:flex-row sm:justify-end gap-3">
              <button onClick={handleClose} className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition">
                Close Preview
              </button>
              <button onClick={handleEnroll} className="px-8 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-200" >
                Enroll Now
              </button>
            </div>
          </>
        ) : (
          /* --- SUCCESS / CONFIRMATION VIEW --- */
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="mb-6 rounded-full bg-green-100 p-4 animate-bounce">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Successfully Enrolled!</h2>
            <p className="text-slate-600 mb-8 max-w-sm">
              Congratulations! You now have full access to <strong>{title}</strong>. Check your dashboard to start learning.
            </p>

            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-lg"
              >
                Go to Dashboard
              </button>
              <button 
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-semibold text-slate-500 hover:text-slate-700 transition"
              >
                Back to Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}