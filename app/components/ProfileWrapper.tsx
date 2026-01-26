// app/components/ProfileWrapper.tsx (Server Component)
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // adjust path
import { ProfileClient } from "./ProfileClient";


export async function Profile() {
  const session = await getServerSession(authOptions);
  
  return <ProfileClient session={session} />;
}