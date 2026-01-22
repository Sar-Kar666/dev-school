export function Footer(){
    return<div >
        <footer className="w-full bg-slate-950 text-slate-300 mt-20">
  <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
    
    {/* Brand */}
    <div>
      <h2 className="text-xl font-semibold text-white"><span className="text-blue-500">Dev </span>School</h2>
      <p className="mt-4 text-sm leading-relaxed">
        Learn full-stack development with real projects, structured learning,
        and mentor guidance.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-white font-medium mb-4">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li>Home</li>
        <li>Courses</li>
        <li>About Us</li>
        <li>FAQ</li>
        <li>Contact</li>
      </ul>
    </div>

    {/* Courses */}
    <div>
      <h3 className="text-white font-medium mb-4">Courses</h3>
      <ul className="space-y-2 text-sm">
        <li>Full Stack Development</li>
        <li>Backend Development</li>
        <li>DSA & Algorithms</li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-white font-medium mb-4">Contact</h3>
      <ul className="space-y-2 text-sm">
        <li>diptanusarkar3020@gmail.com</li>
        <li>www.dev-school-smoky.vercel.app</li>
        <li className="flex gap-3 mt-4">
          <span>Twitter</span>
          <span>LinkedIn</span>
          <span>Instagram</span>
        </li>
      </ul>
    </div>
  </div>

  {/* Bottom */}
  <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
    © 2026 Diptanu Sarkar. All rights reserved.
  </div>
</footer>

    </div>
}