"use client";

import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Link from "next/link";

interface Navigation{
    href: string
}

export default function NavigatePurple({ href } : Navigation) {
    return(
        <Link
            className="bg-clientcard p-4 rounded transition-all duration-300 hover:bg-foreground hover:text-white"
            href={href}
        >
            <ChevronLeftOutlinedIcon/>
        </Link>
    )
}