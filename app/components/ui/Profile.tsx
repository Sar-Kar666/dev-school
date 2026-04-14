"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { SigninPage } from "./Signin";
import { SignupPage } from "./Signup";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";

type UserType = {
  username: string;
  email: string;
};



export function Profile() {
  
const [signupModal,setSignupModal] = useState(false);
const [signinModal,setSigninModal]= useState(false);
const [user,setUser]= useState<UserType | null>(null);
const [dropdown,setDropdown]=useState(false);
const router = useRouter();
  const fetchUser=async ()=>{
  const token = Cookies.get("token"); 
    if (!token) return;

    try{
      const response= await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}user`,{
        headers:{token:token}
      });
      if(response.data.user){
        setUser(response.data.user);
      }
    }catch(e){
      console.error("User fetch failed", e);
      Cookies.remove("token");
      Cookies.remove("role");
      setUser(null);
    }
  }
  useEffect(()=> {
    fetchUser();
  },[])




  return <div>
 {user ? (
  <div className="relative inline-block text-left">
    {/* Trigger Button */}
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 cursor-pointer transition-colors border border-transparent hover:border-gray-200"
      onClick={() => setDropdown(!dropdown)}
    >
      <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium uppercase text-sm">
        {user.username.charAt(0)}
      </div>
      <span className="text-sm font-medium text-gray-700">{user.username}</span>
      <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    {/* Dropdown Menu */}
    {dropdown && <Dropdown setDropdown={setDropdown} setUser={setUser} />}
  </div>
) : (
  <div className="flex items-center gap-4">
    <button 
      onClick={() => setSigninModal(true)}
      className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
    >
      Sign in
    </button>
    <button 
      onClick={() => setSignupModal(true)}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-shadow shadow-sm"
    >
      Get Started
    </button>
  </div>
)}
  {/* Logic for the Modal */}
      {signinModal && (
        <SigninPage 
          onClose={() => setSigninModal(false)} 
          onSignin={() => {
            // This runs after a successful login in the child component
            fetchUser(); 
            setSigninModal(false);
          }} 
          openSignup={()=>{
            setSigninModal(false);
            setSignupModal(true)
          }}
        />
      )}

             {signupModal && (
        <SignupPage 
          onClose={() => setSignupModal(false)} 
          onSignup={() => {
            // This runs after a successful login in the child component
            setSigninModal(true);
            setSignupModal(false);
          }} 
           openSignin={() => {
            setSignupModal(false);
            setSigninModal(true)
            
          }} 
        />
      )}
        
        
  </div>
}

function Dropdown({ setDropdown, setUser }: { setDropdown: (val: boolean) => void, setUser: (val: any) => void }) {
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.reload();
    router.push('/dashboard');
    setUser(null);
    setDropdown(false);
  
  };

  return (
    <>
      {/* Invisible backdrop to close dropdown when clicking outside */}
      <div className="fixed inset-0 z-10" onClick={() => setDropdown(false)}></div>
      
      <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 overflow-hidden">
        <div className="py-1">
          <Link href={"/profile"}><DropdownItem label="My Profile"  /></Link>
           <Link href="/profile/my-courses">
            <DropdownItem label="My Courses" />
          </Link>
          <Link href="/courses">
          <DropdownItem label="All Courses"/>
          </Link>
          
          
          <hr className="my-1 border-gray-100" />
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <span className="mr-3"></span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

function DropdownItem({ label }: { label: string }) {
  return (
    <button className="flex w-full items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
      <span className="mr-3 text-lg"></span>
      {label}
    </button>
  );
}