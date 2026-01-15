"use client";

import Link from "next/link"

const PurpleRounded = () => {
    return(
        <Link 
            href={"/sign-in"}
            className="bg-foreground text-white px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 hover:bg-[#86af50] shadow-[0_0_16px_rgba(129,140,248,0.4)]"
        >
            Sign In
        </Link>
    )
}
export default PurpleRounded;