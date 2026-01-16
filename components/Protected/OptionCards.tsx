import { AuthCards } from "@/constants/Auth-cards"
import Link from "next/link"

export default function OptionCards() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mt-10 mx-4 lg:mx-20">
            {AuthCards.map((card) => (
                <Link
                key={card.id}
                className="bg-cardback p-6 rounded-lg border border-cardborder transition-all duration-300 hover:scale-105"
                href={`${card.href}`}
                >
                    <h2 className="text-xl text-white">{card.title}</h2>
                    <p className="text-textgray">{card.description}</p>
                </Link>
            ))}
        </div>
    )
}
