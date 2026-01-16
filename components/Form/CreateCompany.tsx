"use client";

import React from 'react'
import { useState } from 'react';
import { SERVICE_TYPES } from '@/constants/serviceTypes';
import { useRouter } from 'next/navigation';
import SpinnerWhite from '../ui/SpinnerWhite';


const CreateCompany = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("")

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            serviceType: formData.get("serviceType") as string
        }

        try{
            const response = await fetch("/api/company/create-company", {
                method: "POST",
                headers : { "ContentType" : "application/json" },
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                setError("Failed to create the company.")
            }

            router.push("/dashboard/company")
            router.refresh();
        }catch(error : any) {
            setError(error.message || "Failed to create the company.")
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className='px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto'>
        <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
            <h1 className="text-white text-4xl font-bold mb-2">Create your company</h1>
            <p className="text-textgray">Create your Appointify account</p>

            <form 
                onSubmit={handleSubmit}
                className='mt-4 w-full max-w-2xl mx-auto flex flex-col gap-4'
            >
                {error && (
                    <p className="text-red-800 bg-red-300 text-center rounded py-2">{error}</p>
                )}

                <input 
                    type="text" placeholder="Company name" id="name" name="name"
                    className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    required
                />

                <textarea 
                    placeholder="Company description" id="description" name="description"
                    className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                    required
                />

                <select name="serviceType" id="serviceType" required 
                    className='border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray'>
                    <option value="">Select a service type</option>
                    {SERVICE_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>

                <div className='flex gap-4 justify-end'>
                    <button 
                        className='border-2 border-foreground px-4 py-2 rounded font-bold text-white'
                        onClick={() => router.back()}
                    >
                        Cancel
                    </button>
                    <button 
                        className='text-white px-4 py-2 rounded font-bold bg-foreground'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? <SpinnerWhite/> : "Create your company"}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateCompany