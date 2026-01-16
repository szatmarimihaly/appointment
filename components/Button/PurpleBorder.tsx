import Link from "next/link"


type Props = {
    href: string,
    text : string
}

export default function PurpleBorder({ href, text } : Props){
    return(
        <Link 
            href={href}
            className="border-2 border-foreground px-6 py-2 rounded text-xl font-bold transition-all duration-300 hover:scale-105 shadow-[0_0_16px_rgba(129,140,248,0.4)] text-white"
        >
            {text}
        </Link>
    )
}