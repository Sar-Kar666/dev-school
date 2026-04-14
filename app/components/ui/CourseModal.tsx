"use client";

import { useEffect, useState } from "react";
import { X, CalendarDays, CheckCircle2 } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface CourseModalProps {
  onClose: () => void;
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  price: number;
}

export function CourseModal({
  onClose,
  id,
  title,
  price,
  description,
  imageUrl,
  createdAt,
}: CourseModalProps) {
  // 1. Determine admin status immediately on mount to prevent UI flicker
  const [isAdmin] = useState(() => Cookies.get("role") === "ADMIN");
  
  const [mounted, setMounted] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router=useRouter();
  useEffect(() => {
    setMounted(true);
    // Prevent background scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    onClose();
  };

  /**
   * USER ACTION: Purchase/Enroll
   */
  async function handleEnroll() {
    setError(null);
    try {
      const token = Cookies.get("token");
      const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL?.endsWith("/")
        ? process.env.NEXT_PUBLIC_SERVER_URL
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/`;

      const res = await axios.post(
        `${baseUrl}purchases/buy`,
        { courseId: id },
        { headers: { token: token } }
      );

      if (res.status === 200 || res.status === 201) {
        setConfirmation(true);
      }
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong.";
      setError(message);
    }
  }

  /**
   * ADMIN ACTIONS: Edit & Delete
   */
const handleEditCourse = () => {
  const query = new URLSearchParams({
    id,
    title,
    description,
    imageUrl,
    price: price.toString(),// match the prop name in Edit page
  }).toString();

  router.push(`/edit?${query}`);
};

  const handleDeleteCourse = async () => {
    const confirmed = confirm("Are you sure you want to delete this course? This action cannot be undone.");
    if (!confirmed) return;

    try {
  const response = await axios.delete(
  `${process.env.NEXT_PUBLIC_SERVER_URL}courses/delete-course`,
  {
    headers: {
      token: Cookies.get("token"),
    },
    data: {
      courseId: id, 
      },
    }
  );
     console.log(response.data?.message)
     window.location.reload();
    if (response.status === 200) {
      console.log(response.data?.message);
      handleClose(); 
      // Optionally: window.location.reload(); or trigger a state refresh in the parent
    }
    } catch (err) {
      setError("Failed to delete the course.");
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
        {!confirmation ? (
          <>
            {/* Course Header Image */}
            <div className="relative h-48 w-full md:h-60">
              <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="text-3xl font-bold font-sans text-white md:text-4xl">
                  {title}
                </h2>
              </div>
            </div>

            {/* Course Details */}
            <div className="overflow-y-auto p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-slate-100 text-slate-600">
                <CalendarDays className="h-5 w-5" />
                <span className="text-sm font-sans font-medium">
                  Added on {createdAt}
                </span>
              </div>
              <h3 className="text-lg font-bold font-sans text-slate-900 mb-2">
                About this course
              </h3>
              <p className="font-serif text-slate-700 leading-relaxed">
                {description}
              </p>
              <p className="font-bold text-lg text-blue-600 pt-2 ">
                {`₹${price}`}
              </p>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-slate-100 p-6 md:p-8 flex flex-col gap-3">
              {error && (
                <div className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl text-center border border-red-100 animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
                {isAdmin ? (
                  <>
                    <button
                      onClick={handleEditCourse}
                      className="px-5 py-2.5 rounded-xl font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 transition border border-amber-200"
                    >
                      Edit Course
                    </button>
                    <button
                      onClick={handleDeleteCourse}
                      className="px-8 py-2.5 rounded-xl font-bold bg-red-600 text-white hover:bg-red-700 transition shadow-lg shadow-red-200"
                    >
                      Delete Course
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition"
                    >
                      Close Preview
                    </button>
                    <button
                      onClick={handleEnroll}
                      className="px-8 py-2.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
                    >
                      Enroll Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Success View */
          <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-300">
            <div className="mb-6 rounded-full bg-green-100 p-4 animate-bounce">
              <CheckCircle2 className="h-16 w-16 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Successfully Enrolled!
            </h2>
            <p className="text-slate-600 mb-8 max-w-sm">
              Congratulations! You now have full access to <strong>{title}</strong>.
            </p>
            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition shadow-lg"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}