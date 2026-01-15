"use client";

import { useState } from "react";
import Link from "next/link";
import SpinnerWhite from "../ui/SpinnerWhite";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";


export default function SignUp() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if(password.length < 8) {
            setError("Password must be at least 8 characters long.")
            setLoading(false);
            return;
        }

        try{
            await signUp.email({
                name, email, password,
                callbackURL: "/dashboard"
            })

            router.push("/dashboard");
        }catch(error : any) {
            setError(error.message || "Failed to create account. Email may already exist.")
        }finally{
            setLoading(false)
        }
    }

    return(
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto">
            <div className="w-full max-w-xl mx-auto flex flex-col items-center">
                <h1 className="text-white text-4xl font-bold mb-2">Sign up</h1>
                <p className="text-textgray">Create your Appointify account</p>

                <form 
                    onSubmit={handleSubmit}
                    className="mt-4 w-full max-w-2xl mx-auto flex flex-col gap-4"
                >
                    <input 
                        type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-ringcolor text-textgray"
                    />

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
                        {loading ? <SpinnerWhite/> : "Sign Up"}
                    </button>
                    <p className="text-white text-center mt-4">Already have an account? <Link href="/sign-in" className="underline font-bold">Sign In</Link> </p>
                </form>
            </div>
        </div>
    )
}