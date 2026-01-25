import { Link } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export function Signup({onClose}:{onClose:()=>void}){
   const[showPassword,setShowPassword]=useState(false);
    const [loading, setLoading] = useState(false);
    const [error,setError]=useState("");
    const [success,setSuccess]=useState("");
    const [email,setEmail]=useState<String | null>("");
     const [password,setPassword]=useState<String | null>("");
    const [name,setName]=useState<String | null>("");

    useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
        }, []);


    async function signupHandler() {
            // 🔹 clear old messages when user clicks submit
            setError("");
            setSuccess("");
            setLoading(true);

            try {

                if(!name || !email || !password){
                    return
                }

                const response = await axios.post("/api/signup", {
                email,
                name,
                password,
                });

               
                // ✅ show success
                setSuccess("Signed up successfully");

            } catch (err: any) {
                const apiError = err.response?.data?.error;

            if (apiError) {
                const firstKey = Object.keys(apiError)[0];
                const value = apiError[firstKey];

                // handle both array and string errors
                setError(Array.isArray(value) ? value[0] : apiError);
                } else {
                setError("Signup failed");
                }

            } finally {
                // 🔹 always stop loader
                setLoading(false);
            }
            }





    return  <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={onClose}
        >
          <div
            className="relative  bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
               className="absolute top-4 right-4 text-gray-500 hover:text-black dark:hover:text-white"
            >
              ✕
            </button>
    
           <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Banner */}
                    <div className="relative hidden md:block">
                        <Image
                        src="/banner.png"
                        alt="Banner"
                        fill
                        className="object-cover"
                        />
                    </div>

                    {/* Form */}
                    <div className="p-8 space-y-6">
                        <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Create account
                        </h2>
                        <p className="text-sm text-gray-500">
                            Join us and start learning
                        </p>
                        </div>

                        {/* 🔽 FORM START */}
                        <form
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            signupHandler();
                        }}
                        >
                        {/* Username */}
                        <input
                            type="text"
                            required
                            placeholder="Username"
                            className="border h-11 w-full px-4 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                            setName(e.target.value);
                            setError("");
                            setSuccess("");
                            }}
                        />

                        {/* Email */}
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            className="border h-11 w-full px-4 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                            setEmail(e.target.value);
                            setError("");
                            setSuccess("");
                            }}
                        />

                        {/* Password */}
                        <div className="relative">
                            <input
                            type={showPassword ? "text" : "password"}
                            required
                            minLength={6}
                            placeholder="Password"
                            className="border h-11 w-full px-4 rounded-lg bg-transparent focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                                setSuccess("");
                            }}
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm text-gray-500"
                            >
                            {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {/* Error / Success */}
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        {success && <p className="text-sm text-green-600">{success}</p>}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-11 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Please wait..." : "Signup"}
                        </button>
                        </form>
                        {/* 🔼 FORM END */}
                    </div>
                    </div>

          </div>
        </div>

}