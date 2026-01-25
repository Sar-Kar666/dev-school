"use client";

import { Button } from "./Button";

interface CardProps{
    img: String,
    title : String,
    description :String
}

export function Card({img,title,description}:CardProps) {
  return (
  
       <div className="w-full max-w-sm border rounded-2xl flex flex-col h-fit hover:scale-98 transition-transform duration-100 ease-in-out shadow-2xl">
            <div ><img   className=" rounded-t-2xl  w-full   object-cover transition-transform duration-100 ease-in-out hover:scale-98  hover:rounded-2xl" src={` ${img}`}></img></div>

            <div className="px-4 py-5 flex flex-col">
                <h2 className="text-xl font-semibold font-sans py-1  ">{title}</h2>
                <h3 className="text-sm text-slate-500 font-serif pt-2 ">{description}</h3> 
            </div>
            <div className="p-5 pb-2 mt-auto ">
                    <div className="flex justify-between items-center">
                        <h2 className="font-sans text-sm text-slate-600">Feb,2026</h2>
                        <Button   children="Learn more"  variant={"primary"} color={"bg-gray-200  h-10  sm:w-30  hover:scale-95 transistion-transform duration-100 ease-in-out  "}></Button>
                    </div>
            </div> 
            
        </div>                                   
        

  );
}

