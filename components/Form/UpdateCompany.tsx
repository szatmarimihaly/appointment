"use client";

import { useState } from "react";
import SpinnerWhite from "../ui/SpinnerWhite";
import { Company } from "@/constants/Interfaces";
import Link from "next/link";
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import { SERVICE_TYPES } from "@/constants/serviceTypes";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";

interface CompanyDashboardProps {
    company : Company;
}

export default function UpdateCompany({ company } : CompanyDashboardProps) {


    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name : company.name,
        description: company.description,
        serviceType: company.serviceType,
        instagramUrl: company.instagramUrl || "",
        websiteUrl: company.websiteUrl || ""
    })
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            serviceType: formData.get("serviceType") as string,
            instagramUrl: formData.get("instagramUrl") as string,
            websiteUrl: formData.get("websiteUrl") as string
        }

        try{
            const response = await fetch("/api/company/update-company", {
                method : "POST",
                headers : { "ContentType" : "application/json" },
                body: JSON.stringify(data)
            })

            if(!response.ok) {
                setError("Failed to update your company!")
            }

            router.push("/dashboard/company");
            router.refresh();
        }catch(error : any) {
            setError("Failed to update your company!")
        }finally{
            setLoading(false);
            setIsEditing(false);
        }

    }

    const handleCancel = () => {
        setFormData({
            name: company.name,
            description: company.description,
            serviceType: company.serviceType,
            instagramUrl: company.instagramUrl || "",
            websiteUrl: company.websiteUrl || ""
        });
        setIsEditing(false);
    }


    return(
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto mt-10 mb-10">
            <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
                <h1 className="text-white text-4xl font-bold mb-2 text-center">Your company</h1>
                <p className="text-textgray mt-4 mb-6">Here you can check out and update your companies info if you want.</p>

                <ImageUpload companyId={company.id} currentImageUrl={company.imageUrl}/>

                <form 
                    onSubmit={handleSubmit}
                    className="mt-10 w-full max-w-2xl mx-auto flex flex-col gap-4"    
                >
                    {!isEditing && (
                        <button 
                            onClick={(e) => {
                                setIsEditing(true);
                                setLoading(false);
                            }}
                            className="text-white px-4 py-2 rounded font-bold bg-foreground"
                        >
                            Edit Profile
                        </button>
                    )}

                    {isEditing ? (
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={(e) => setFormData({
                                ...formData,
                                name: e.target.value
                            })}
                            required
                            disabled={loading}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        />
                    ) : (
                        <p className="text-white">Company Name: <span className="text-textgray">{company.name}</span></p>
                    )}

                    {isEditing ? (
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({
                                ...formData,
                                description: e.target.value
                            })}
                            required
                            disabled={loading}
                            rows={5}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        />
                    ) : (
                        <p className="text-white">Company Description: <span className="text-textgray">{company.description}</span></p>
                    )}

                    {isEditing ? (
                        <select 
                            name="serviceType" 
                            id="serviceType"
                            value={formData.serviceType}
                            onChange={(e) => setFormData({
                                ...formData,
                                serviceType: e.target.value
                            })}
                            required
                            disabled={loading}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        >
                            {SERVICE_TYPES.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-white">Company Service Type: <span className="text-textgray">{company.serviceType}</span></p>
                    )}

                    {isEditing ? (
                        <input 
                            type="text"
                            id="instagramUrl"
                            name="instagramUrl"
                            value={formData.instagramUrl}
                            onChange={(e) => setFormData({
                                ...formData,
                                instagramUrl: e.target.value
                            })}
                            disabled={loading}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        />
                    ) : (
                        <p className="text-white">Company Instagram: <span className="text-textgray">{company.instagramUrl}</span></p>
                    )}

                    {isEditing ? (
                        <input 
                            type="text"
                            id="websiteUrl"
                            name="websiteUrl"
                            value={formData.websiteUrl}
                            onChange={(e) => setFormData({
                                ...formData,
                                websiteUrl: e.target.value
                            })}
                            disabled={loading}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        />
                    ) : (
                        <p className="text-white">Company website: <span className="text-textgray">{company.websiteUrl}</span></p>
                    )}

                    <p className="text-white text-sm">Your site URL: <span className="text-textgray">https://www.appointify.com/search/{company.slug}</span></p>
                    

                    <div className="flex gap-4 justify-end">
                        <Link
                            href={`/search/${company.slug}`}
                            className="flex items-center"
                        >
                            Check out your company site here.
                            <ArrowOutwardOutlinedIcon fontSize="small"/>
                        </Link>
                    </div>

                    


                    {isEditing && (
                        <div className="flex gap-4 justify-end">
                            <button
                                type="button"
                                disabled={loading}
                                onClick={handleCancel}
                                className="border-2 border-foreground px-4 py-2 rounded font-bold text-white"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="text-white px-4 py-2 rounded font-bold bg-foreground"
                                disabled={loading}
                            >
                                {loading ? <SpinnerWhite/> : "Update"}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}