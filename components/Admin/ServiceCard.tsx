"use client";

import { Services } from "@/constants/Interfaces";
import Bin from "../ui/Bin";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SpinnerWhite from "../ui/SpinnerWhite";

export default function ServiceCard({id, name, description, price, deviza, duration} : Services) {

    const [loading, setLoading] = useState(false);
    const router = useRouter();


    const handleDelete = async () => {

        const confirmed = window.confirm(
            `Are you sure deleting this service "${name}"?`
        );

        if(!confirmed) {
            return;
        }

        setLoading(true);
        
        try{
            const response = await fetch("/api/company/delete-services", {
                method: "DELETE",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ id })
            });

            if(!response.ok){
                const error = await response.json();
                console.log("Error deleting your service.");
                return;
            }

            router.refresh();

        }catch(error){
            console.log("Error deleting service!")
        }finally{
            setLoading(false)
        }

        

        console.log("Service deleted successfully.");
    }


    return(
        <div className="bg-clientcard p-6 rounded">
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-lg md:text-2xl">{name}</h3>
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                    >
                        {loading? <SpinnerWhite/> : <div className="flex items-center gap-2 text-red-500 transition-all duation-300 bg-red-100 rounded hover:bg-red-200 px-4 py-2 hover:cursor-pointer">Delete<Bin/></div>}
                    </button>
                </div>
                <p className="text-textgray">{description}</p>
                <div className="flex justify-between text-white">
                    <p>Duration: {duration} minutes</p>
                    {price.toLocaleString()} {deviza}
                </div>
            </div>
        </div>
    )
}
