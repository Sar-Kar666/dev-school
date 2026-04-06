"use client";

import { useState } from "react";
import { Button } from "./Button";
import { CourseModal } from "./CourseModal";

interface CardProps {
  id: string;
  img: string;
  title: string;
  description: string;
  createdAt: string;
  
}

export function Card({ img, title, description, createdAt,id}: CardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full max-w-sm border rounded-2xl flex flex-col h-fit hover:scale-98 transition-transform duration-100 ease-in-out shadow-2xl bg-white overflow-hidden">
        {/* Click image to open */}
        <div className="relative aspect-video overflow-hidden">
          <img
            className="w-full h-full object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
            src={img}
            onClick={() => setIsModalOpen(true)}
            alt={title}
          />
        </div>

        <div className="px-4 py-5 flex flex-col flex-grow">
          <h2 className="text-xl font-bold font-sans text-slate-800 line-clamp-1">{title}</h2>
          <h3 className="text-sm text-slate-500 font-serif pt-2 line-clamp-2">{description}</h3>
        </div>

        <div className="p-4 pt-0 mt-auto">
          <div className="flex justify-between items-center border-t border-slate-100 pt-4">
            <span className="font-sans text-xs font-medium text-slate-400 uppercase tracking-wider">
               {createdAt}
            </span>
            {/* <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              color="bg-indigo-50 text-indigo-600 h-9 px-4 rounded-lg font-bold hover:bg-indigo-100 transition-colors"
            >
              Learn more
            </Button> */}
          </div>
        </div>
      </div>

      {/* FIXED: Passing all required props to the Modal */}
      {isModalOpen && (
        <CourseModal 
          id={id}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={description} // Added this
          img={img}
          createdAt={createdAt}     // Added this
        />
      )}
    </>
  );
}