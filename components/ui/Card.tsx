"use client";

import { Button } from "./Button";

interface CardProps{
    img: String,
    title : String,
    description :String
}

export function Card({img,title,description}:CardProps) {
  return (
    <div className=" border max-w-sm w-full rounded-2xl">
        <div className="">
            <div ><img className="rounded-2xl p-1 " src={` ${img}`}></img></div>
            <div ><h2 className="text-2xl font-semibold p-1 ">{title}</h2></div>
            <div ><h3 className="text-lg text-slate-500 font-semibold p-1">{description}</h3></div>
           <div className="p-1"><Button   children="Learn more"  variant={"secondary"} color={"bg-gray-200  h-10 w-full  "}></Button></div> 
        </div>                                   
        
     </div>
  );
}
