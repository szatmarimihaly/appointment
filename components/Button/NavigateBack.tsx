"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function NavigateBack(){

    const router = useRouter();

    const handleBack = () => {
        router.back();
        router.refresh();
    }

    return(
        <button
            className="bg-clientcard p-4 rounded transition-all duration-300 hover:bg-foreground hover:text-white"
            onClick={handleBack}
        >
            <ChevronLeft/>
        </button>
    )
}