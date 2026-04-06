import { Card } from "@/app/components/ui/Card";
import axios from "axios";
import { format } from 'date-fns';
import { cookies } from 'next/headers';
 // Import this instead of js-cookie
interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price: number;
  createdAt:string;
}

export default async function PurchasedCourse() {
  try {
    // 1. Get the token from server-side cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // 2. Fetch the data
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}purchases/my-courses`, {
      headers: {
        token: token // This now works on the server
      }
    });

    
    // Note: Make sure your backend sends "courses" and not "purchasedCourses" 
    // unless you changed the backend response to match.
    const courses: Course[] =response.data.purchasedCourses|| response.data.courses || [];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center pt-10">
        {courses.map((course: any) => (
          <Card
            key={course.id} // Don't forget the 'key' prop here!
            id={course.id} 
            img={course.imageUrl || "/thumbnail.png"}
            title={course.title}
            description={course.description}
            createdAt={format(new Date(course.createdAt), "MMM dd, yyyy")}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    console.error("Failed to fetch courses:", error);
    return <p className="text-red-500">Failed to load courses.</p>;
  }
}