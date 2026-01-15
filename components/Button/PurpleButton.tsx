"use client";

import Link from "next/link";
import Arrow from "../ui/Arrow";

type Props = {
    href : string,
    text : string
}

export default function PurpleButton({href, text}: Props){

    return(
        <Link href={href} className="flex items-center gap-2 mt-10 bg-foreground text-white px-6 py-2 rounded text-xl font-bold transition-all duration-300 hover:bg-[#86af50] shadow-[0_0_16px_rgba(129,140,248,0.4)]">
            {text} <Arrow/>
        </Link>
    )

}