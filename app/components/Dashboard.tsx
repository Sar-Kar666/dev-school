
import Link from "next/link";
import { Button } from "./ui/Button";
import { Faq } from "./ui/Faq";
import HeroSectionText from "./ui/HeroSectionText";
import { RenderCard } from "./ui/RenderCard";




export function Dashboard(){


    return<div className="py-15 ">
            <HeroSectionText/>
            <div className="py-20"><h1 className="mb-10 text-center text-4xl font-semibold font-mono text-slate-700">Featured Course</h1></div>
            <RenderCard count={6}/>
         <div className=" flex justify-center items-center pt-25 "><Link href={"/courses"}><button className="h-12 w-40 bg-blue-800 text-white h-10  border  cursor-pointer px-2 py-1 rounded-md flex items-center  justify-center">Explore courses</button></Link></div>
            <div className=" pb-5">
                <h1 className=" mt-30 text-center text-4xl font-semibold font-mono text-slate-700">FAQ</h1>
                <p className="text-center font-mono text-slate-700 ">Get your questions answered</p>
                </div>
            <Faq/>
            
            
    </div>
}