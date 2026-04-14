import axios from "axios";
import { EditDetails } from "./EditDetails";
import { cookies } from "next/headers"
import { EditPassword } from "./EditPassword";


async function getProfile(){

    const cookieStore= await cookies();
    const token = cookieStore.get("token")?.value;
    const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}user`,{
        headers:{token}
    })
    
    return response.data.user;
}


export default async function MyProfile(){
 const user= await getProfile() ;

    return<div>
        <EditDetails username={user.username} email={user.email} />
        <EditPassword/>
    </div>
}