"use client";

import { useState } from "react";
import SpinnerWhite from "../ui/SpinnerWhite";
import { Company } from "@/constants/Interfaces";
import Link from "next/link";
import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import { SERVICE_TYPES, COUNTRIES } from "@/constants/serviceTypes";
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
        websiteUrl: company.websiteUrl || "",
        country: company.country,
        city: company.city,
        zipCode: company.zipCode,
        address: company.address,
        number: company.number,
        alphabet: company.alphabet,
        phone: company.phone
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
            instagramUrl: formData.get("instagramUrl") as string || "",
            websiteUrl: formData.get("websiteUrl") as string || "",
            country: formData.get("country") as string,
            city: formData.get("city") as string,
            zipCode: formData.get("zipCode") as string,
            address: formData.get("address") as string, // Added this
            number: formData.get("number") as string,
            alphabet: formData.get("alphabet") as string || "",
            phone: formData.get("phone") as string || ""
        }

        try{
            const response = await fetch("/api/company/update-company", {
                method : "POST",
                headers : { "Content-Type" : "application/json" }, // Fixed typo
                body: JSON.stringify(data)
            })

            const result = await response.json();
            console.log("Response:", result); // Better logging

            if(!response.ok) {
                setError(result.error || "Failed to update your company!");
                return; // Important: stop here on error
            }

            setIsEditing(false);
            router.push("/dashboard/company");
            router.refresh();
        }catch(error : any) {
            console.error("Error:", error);
            setError("Failed to update your company!")
        }finally{
            setLoading(false);
        }

    }

    const handleCancel = () => {
        setFormData({
            name: company.name,
            description: company.description,
            serviceType: company.serviceType,
            instagramUrl: company.instagramUrl || "",
            websiteUrl: company.websiteUrl || "",
            country: company.country,
            city: company.city,
            zipCode: company.zipCode,
            address: company.address,
            number: company.number,
            alphabet: company.alphabet,
            phone: company.phone
        });
        setIsEditing(false);
        setError("");
    }


    return(
        <div className="px-4 sm:px-6 lg:px-8 w-full max-w-xl mx-auto mt-10 mb-10">
            <div className='w-full max-w-xl mx-auto flex flex-col items-center'>
                <h1 className="text-white text-4xl font-bold mb-2 text-center">Your company</h1>
                <p className="text-textgray mt-4 mb-6">Here you can check out and update your companies info if you want.</p>

                {error && (
                    <div className="w-full bg-red-300 text-red-900 p-4 rounded mb-4">
                        {error}
                    </div>
                )}

                <ImageUpload companyId={company.id} currentImageUrl={company.imageUrl}/>

                <form 
                    onSubmit={handleSubmit}
                    className="mt-10 w-full max-w-2xl mx-auto flex flex-col gap-4"    
                >
                    {!isEditing && (
                        <button 
                            type="button"
                            onClick={() => {
                                setIsEditing(true);
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
                        <>
                            <label className="text-white">Phone number: </label>
                            <input 
                                type="tel" 
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    phone: e.target.value
                                })}
                                required
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    ): (
                        <p className="text-white">Phone number: <span className="text-textgray">{company.phone}</span></p>
                    )}

                    {isEditing ? (
                        <>
                            <label className="text-white">Paste your instagram URL:</label>
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
                        </>
                    ) : (
                        <p className="text-white">Company Instagram: <span className="text-textgray">{company.instagramUrl || "Not provided"}</span></p>
                    )}

                    {isEditing ? (
                        <>
                            <label className="text-white">Paste your website URL:</label>
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
                        </>
                    ) : (
                        <p className="text-white">Company website: <span className="text-textgray">{company.websiteUrl || "Not provided"}</span></p>
                    )}

                    {isEditing ? (
                        <select 
                            name="country" 
                            id="country"
                            value={formData.country} // Fixed: was serviceType
                            onChange={(e) => setFormData({
                                ...formData,
                                country: e.target.value
                            })}
                            required
                            disabled={loading}
                            className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                        >
                            {COUNTRIES.map((name) => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <p className="text-white">Company Address: 
                            <span className="text-textgray"> {company.city}, {company.zipCode} {company.address} {company.number}/{company.alphabet} </span>
                        </p>
                    )}

                    {isEditing && (
                        <>
                            <label className="text-white">City: </label>
                            <input 
                                type="text" 
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    city: e.target.value
                                })}
                                required
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    )}

                    {isEditing && (
                        <>
                            <label className="text-white">Zip Code:</label>
                            <input 
                                type="text" 
                                id="zipCode"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    zipCode: e.target.value
                                })}
                                required
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    )}

                    {isEditing && (
                        <>
                            <label className="text-white">Street Address:</label>
                            <input 
                                type="text" 
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    address: e.target.value
                                })}
                                required
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    )}

                    {isEditing && (
                        <>
                            <label className="text-white">House Number: </label>
                            <input 
                                type="number" 
                                id="number"
                                name="number"
                                value={formData.number}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    number: e.target.value
                                })}
                                required
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    )}

                    {isEditing && (
                        <>
                            <label className="text-white">House Alphabet (optional):</label>
                            <input 
                                type="text" 
                                id="alphabet"
                                name="alphabet" // Fixed: was "aphabet"
                                value={formData.alphabet}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    alphabet: e.target.value
                                })}
                                disabled={loading}
                                className="border border-inputcolor w-full mx-auto px-4 py-2 rounded focus:outline-none focus:border-2 focus:border-foreground text-textgray"
                            />
                        </>
                    )}

                    <p className="text-white text-sm">Your site URL: <span className="text-textgray">https://www.appointify.com/search/{company.slug}</span></p>
                    

                    <div className="flex gap-4 justify-end">
                        <Link
                            href={`/search/${company.slug}`}
                            className="flex items-center text-foreground hover:text-foreground/80"
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