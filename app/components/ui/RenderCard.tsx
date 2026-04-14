import axios from "axios";
import { Card } from "./Card";
import { format} from 'date-fns';
// Define a type for your course to stay type-safe
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt:string;
}

interface RenderCardProps{
  count? :number;
}

export async function RenderCard({count}:RenderCardProps) {
  try {
    // 1. Fetch the data
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}courses`);
    
    // 2. Extract the array (usually response.data.courses or just response.data)
    const courses: Course[] = response.data.courses ||[];

      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center pt-10">
          {/* 3. Map through the items */}
          {courses.slice(0,count).map((course) => (
            <Card
              id={course.id} // Always provide a unique key
              imageUrl={course.imageUrl || "/thumbnail.png"} // Fallback image if one isn't provided
              title={course.title}
              description={course.description}
              price={course.price}
            createdAt={format(new Date(course.createdAt), "MMM dd, yyyy")}
            />
          ))}

        {/* If you want to keep your hardcoded placeholders, leave them below the map */}
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return <p className="text-red-500">Failed to load courses. Please try again later.</p>;
  }
}