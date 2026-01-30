"use client";

import Link from "next/link";

interface Props {
    href: string,
    text: string
}

export default function PurpleShadowNavigation({ href, text } : Props) {

    return(
        <Link
            className="bg-foreground text-white px-6 py-2 rounded text-sm font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_16px_rgba(129,140,248,0.4)]"
            href={href}
        >
            {text}
        </Link>
    )

}