import { Faq } from "./ui/Faq";
import HeroSectionText from "./ui/HeroSectionText";
import { RenderCard } from "./ui/RenderCard";


export function Dashboard(){
    return<div className="py-15 ">
            <HeroSectionText/>
            <div className="py-20"><h1 className="mb-10 text-center text-4xl font-semibold font-mono text-slate-700">Featured Course</h1></div>
            <RenderCard/>
            <div className="pt-20 pb-5">
                <h1 className=" mt-35 text-center text-4xl font-semibold font-mono text-slate-700">FAQ</h1>
                <p className="text-center font-mono text-slate-700 ">Get your questions answered</p>
                </div>
            <Faq/>
            
            
    </div>
}