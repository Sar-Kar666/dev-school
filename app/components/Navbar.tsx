import Link from "next/link";
import { cookies } from "next/headers"; // Next.js built-in server-side cookie helper
import { Profile } from "./ui/Profile";

export async function Navbar() {
  // 1. Get cookies directly on the server
  const cookieStore = await cookies();
  const role = cookieStore.get("role")?.value;

  return (
    <nav className="w-full border-b shadow-sm bg-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-1">
        
        <div className="flex gap-10">
          <Link href="/">
            <h1 className="text-xl font-bold py-1 px-3">
              <span className="text-blue-500">Dev</span> School
            </h1>
          </Link>

          <div className="hidden sm:flex gap-3">
            <Link href="/" className="text-lg px-3 py-1">Home</Link>
            <Link href="/courses" className="text-lg px-3 py-1">Courses</Link>

            {/* 2. This condition is now evaluated on the SERVER */}
            {role === "ADMIN" && (
              <Link href="/create" className="text-lg px-3 py-1">
                Publish
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Profile can stay a Client Component for the dropdown logic */}
          <Profile />
        </div>
      </div>
    </nav>
  );
}