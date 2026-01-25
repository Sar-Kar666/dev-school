
import Link from "next/link";
import { Profile } from "./ui/Profile";

export function Navbar() {
  return (
    <nav className="w-full border-b shadow-sm">
      <div className="max-w-7xl min-w-12.5  mx-auto flex justify-between items-center px-6 py-1">

        {/* LEFT */}
        <div className="flex gap-10">
         <Link href={"/"} > <h1 className="text-xl font-bold py-1 cursor-pointer px-3 rounded-md hover:scale-105 transition-transform">
           <span className="text-blue-500">Dev</span> School
          </h1></Link>

          <div className="hidden sm:flex gap-3">
            <button className="text-lg px-3 py-1 rounded-md hover:scale-105 hover:text-blue-800 hover:bg-slate-50 transition">
              <Link href={"/"}>Home</Link>
              
            </button>

            <button className="text-lg px-3 py-1 rounded-md hover:scale-105 hover:text-blue-800 hover:bg-slate-50 transition">
            <Link href={"/courses"}>Courses</Link>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <Profile />
      </div>
    </nav>
  );
}
