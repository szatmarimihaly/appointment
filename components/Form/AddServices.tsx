"use client";

import { useState } from "react";
import SpinnerWhite from "../ui/SpinnerWhite";
import { DEVIZA_TYPES } from "@/constants/serviceTypes";
import { useRouter } from "next/navigation";


export default function AddServices() {

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const formData = new FormData(e.currentTarget);
            const data = {
                name: formData.get("name") as string,
                description: formData.get("description") as string,
                price: formData.get("price") as string,
                deviza: formData.get("deviza") as string 
            }
            const response = await fetch("/api/company/create-services", {
                method:"POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                setError("Failed to create service.")
            }

            
            router.refresh();
        }catch(error : any){
            setError(error.message);
        }finally{
            setLoading(false)
        }

    }

    return(
        <div className='px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto mt-10'>
            <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
                <h1 className="text-white text-4xl font-bold mb-2">Create your services</h1>
                <p className="text-textgray">Create your Appointify services here.</p>
            </div>

            {error && (
                <p className="mt-10 w-full max-w-2xl mx-auto bg-red-300 text-red-900 p-2 rounded">{error}</p>
            )}

            <form 
                onSubmit={handleSubmit}
                className="mt-4 w-full max-w-2xl mx-auto flex flex-col gap-4"
            >
                {!isEditing && (
                    <button 
                        type="button"
                        onClick={(e) => {
                            setIsEditing(true);
                            setLoading(false);
                        }}
                        className="text-white px-4 py-2 rounded font-bold bg-foreground"
                    >
                        Add new Service
                    </button>
                )}

                {isEditing && (
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Service name"
                        required
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />
                )}

                {isEditing && (
                    <textarea 
                        name="description" 
                        id="description" 
                        placeholder="Service description"
                        required
                        rows={4}
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />
                )}

                {isEditing && (
                    <input 
                        type="number" 
                        name="price" 
                        id="price" 
                        placeholder="20000"
                        required
                        className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    />
                )}

                {isEditing && (
                    <select name="deviza" id="deviza" required>
                        {DEVIZA_TYPES.map((deviza) => (
                            <option key={deviza} value={deviza}>{deviza}</option>
                        ))}
                    </select>
                )}
                

                {isEditing && (
                    <div className="flex gap-4 justify-end">
                        <button
                            type="button"
                            disabled={loading}
                            onClick={() => setIsEditing(false)}
                            className="border-2 border-foreground px-4 py-2 rounded font-bold text-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="text-white px-4 py-2 rounded font-bold bg-foreground"
                            disabled={loading}
                        >
                            {loading ? <SpinnerWhite/> : "Create service"}
                        </button>
                    </div>
                )}
            </form>
        </div>
    )


}