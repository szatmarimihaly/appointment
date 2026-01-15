"use client";

import { useState } from "react";
import Link from "next/link";
import SpinnerWhite from "../ui/SpinnerWhite";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

export default function SignIn(){

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        try{
            await signIn.email({
                email, password,
                callbackURL: "/dashboard"
            })
        }catch(error : any) {
            setError("Error while trying to sign in.")
        }finally{
            setLoading(false)
        }

    }


    return(
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto">
            <div className="w-full max-w-xl mx-auto flex flex-col items-center">
                <h1 className="text-white text-4xl font-bold mb-2">Sign In</h1>
                <p className="text-textgray">Sign in to your account to continue</p>
        
                <form 
                    onSubmit={handleSubmit}
                    className="mt-4 w-full max-w-2xl mx-auto flex flex-col gap-4"
                >
                    <input 
                        type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-ringcolor text-textgray"
                    />
        
                    <input 
                        type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-ringcolor text-textgray"
                    />
        
                    <button 
                        type="submit"
                        className="bg-foreground text-white px-4 py-2 rounded font-bold"
                    >
                        {loading ? <SpinnerWhite/> : "Sign In"}
                    </button>
                    <p className="text-white text-center mt-4">Don't have an account? <Link href="/sign-up" className="underline font-bold">Sign Up</Link> </p>
                </form>
            </div>
        </div>
    )
}