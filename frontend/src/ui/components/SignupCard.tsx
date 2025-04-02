import { useCallback, useState } from "react";
import { Mail, Lock, User, UserPlus, ShieldCheck } from "lucide-react"; 
import InputBox from "./InputBox";
import axios from "axios";
import { Backend_Url } from "../../config";
import { Bounce } from "react-toastify/unstyled";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SignupCard({ type }: { type: "signup" | "signin" }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate()

    const sendSignup = useCallback(async () => {
        try {
            const response = await axios.post(
                `${Backend_Url}/user/signup`, 
                { email, password, firstName, lastName }
            );
    
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                toast.success("Sign-Up Successful!", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
    
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Signup Error:", error || error);
            toast.error(`Sign-Up failed! ${error || "Please try again."}`, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    }, [email, password, firstName, lastName]); 

    const sendSignin = useCallback(async () => {
        try {
            const response = await axios.post(
                `${Backend_Url}/user/signin`, 
                { email, password}
            );
    
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem("token", token);
                toast.success("Sign-Up Successful!", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "colored",
                    transition: Bounce,
                });
    
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Signup Error:", error || error);
            toast.error(`Sign-Up failed! ${error || "Please try again."}`, {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce,
            });
        }
    }, [email, password]); 

    return (
        <div className="flex flex-col p-6 w-full max-w-md rounded-2xl shadow-lg bg-white border border-gray-200">

            <div className="flex flex-col justify-center items-center gap-3">
                <ShieldCheck className="w-10 h-10 text-indigo-600" />
                <h2 className="font-bold text-2xl text-gray-900">
                    {type === "signup" ? "Create an Account" : "Welcome Back"}
                </h2>
                <p className="text-gray-400 text-md text-center">{type === "signup" ? "Unlock exclusive features and elevate your Learning experience!" : "Sign in to your account and start learning"}</p>
            </div>

            <div className="w-full space-y-4 mt-5">
                <InputBox label="Email" type="text" placeholder="Enter your email" icon={<Mail />} value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputBox label="Password" type="password" placeholder="Enter your password" icon={<Lock />} value={password} onChange={(e) => setPassword(e.target.value)} />
                {type === "signup" && (
                    <>
                        <InputBox label="First Name" type="text" placeholder="Enter your first name" icon={<User />} value={firstName} onChange={(e) => setFirstname(e.target.value)} />
                        <InputBox label="Last Name" type="text" placeholder="Enter your last name" icon={<User />} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </>
                )}
            </div>

            <button className="mt-4 w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all"
                onClick={()=>{type === "signup" ? sendSignup() : sendSignin() }}>
                {type === "signup" ? <UserPlus /> : <Lock />}
                {type === "signup" ? "Sign Up" : "Sign In"}
            </button>

            <p className="text-sm text-gray-500 mt-3 text-center">
                By {type === "signup" ? "signing up" : "signing in"}, you agree to our{" "}
                <a href="#" className="underline hover:text-indigo-500">Terms of Service</a> and{" "}
                <a href="#" className="underline hover:text-indigo-500">Privacy Policy</a>.
            </p>

            <p className="mt-4 text-center">
                {type === "signup" ? "Already have an account? " : "Don't have an account? "}
                <button className="font-medium text-indigo-600 hover:text-indigo-700 transition" onClick={()=>navigate(type === "signup" ? "/signin" : "/signup")} >
                    {type === "signup" ? "Sign in" : "Sign up"}
                </button>
            </p>
        </div>
    );
}
