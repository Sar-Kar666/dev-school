import { Card } from "../components/ui/Card";

export default function courses(){
    return <div>
     
        <div className="py-20"><h1 className="mb-10 text-center text-4xl font-semibold font-mono text-slate-700">Featured Course</h1></div>
        <div  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
            <Card
            img="/thumbnail.png"
            title="Fullstack Development"
            description="Learn the fundamentals with hands-on projects.Some text refers to placeholder or generic content used to demonstrate design, layout, or functionality before final content is available.  It is commonly used in web development, graphic design, and publishing to preview how text will appear without focusing on meaning"
          />
    
          <Card
            img="/backend.png"
            title="Backend Development"
            description="Learn the fundamentals with hands-on projects.Some text refers to placeholder or generic content used to demonstrate design, layout, or functionality before final content is available.  It is commonly used in web development, graphic design, and publishing to preview how text will appear without focusing on meaning"
          />
     
          
          <Card
            img="/dsa.png"
            title="Backend Development"
            description="Learn the fundamentals with hands-on projects.Some text refers to placeholder or generic content used to demonstrate design, layout, or functionality before final content is available.  It is commonly used in web development, graphic design, and publishing to preview how text will appear without focusing on meaning"
          />
        </div>
          
    
    
        </div>
}