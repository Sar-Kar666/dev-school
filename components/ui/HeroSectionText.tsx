
import { Button } from "./Button";
import { TechCarousel } from "./TechCarousel";
import { TerminalCard } from "./TerminalCard";
import { Typewriter } from "./TypeWritter";


export default function HeroSectionText(){
    return<div>
        <div className="flex justify-center">
            <div className="w-fit max-md:mx-auto flex items-center max-md:justify-center gap-x-2 px-4 py-1.5 border border-dashed border-neutral-400 rounded-full">
                <div className="flex justify-around items-center"> 
                        {/* glow effect */}
                        <div className="relative h-5 w-5 animate-pulse">
                        <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-70"></div>
                        <div className="relative bg-blue-600 rounded-full h-5 w-5"></div>
                        </div>

                        {/* text */}
                        <div className="pl-2">Join the ultimate bootcamp</div>
                </div>
             </div>
        </div>

        <div className="flex justify-center">
            <div className="py-6">

                <div className="text-center sm: text-4xl sm:text-6xl md:text-7xl font-semibold  tracking-tighter text-blue-900"><Typewriter text="Master Full Stack Development" seconds={1} />

                    {/* <EncryptedText text="Master Full Stack Development" revealDelayMs={40} flipDelayMs={40}/> */}
                </div>
                <div className="tracking-wide text-center sm: text-muted-foreground py-4"><p>Master Full Stack Development through hands-on open source projects. Join a community of developers transforming their careers with practical, real-world programming skills.</p>
                </div>
            </div>
        </div>
            <div className="w-full flex justify-center items-center">
                <div className="px-2">
                     <Button children="Explore Courses" variant={"secondary"} color={"bg-blue-800 text-white h-10 "}></Button></div>
                <div className="px-2">
                    <Button children="Learn more"  variant={"secondary"} color={"bg-gray-200  h-10 w-30"}></Button>
                </div>
            </div>


            <div className="py-15 min-h-120 ">
                <TerminalCard/>
            </div>
            
            <div className="py-20">
                <h3 className="mb-10 text-center text-4xl font-semibold font-mono text-slate-700">
                Technologies you’ll master
                </h3>

                <TechCarousel/>
            </div>
    </div>
}

