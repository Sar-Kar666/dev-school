import { Profile } from "./Profile";

export function Navbar() {
  return (
    <div className="w-full border-b">

      {/* CENTERED CONTAINER */}
      <div className="max-w-7xl min-w-50 mx-auto flex justify-between items-center px-6 py-3">

        {/* LEFT */}
        <div className="flex items-center gap-6">

          <h1 className="text-lg font-bold">
            <span className="text-blue-500">Dev</span> School
          </h1>

          {/* Desktop links */}
          <div className="hidden sm:flex gap-6">
            <h2 className="text-md cursor-pointer hover:text-red-500">
              Home
            </h2>

            <h2 className="text-md cursor-pointer hover:text-red-500">
              Courses
            </h2>
          </div>

        </div>

        {/* RIGHT */}
        <Profile />

      </div>
    </div>
  );
}
