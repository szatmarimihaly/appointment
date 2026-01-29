import { Services } from "@/constants/Interfaces"


export default function ServiceCard({ id, name, description, price, deviza, duration } : Services) {

    const formattedPrice = price.toLocaleString().replace(/\s/g, ".");
    
    return(
        <div className="bg-clientcard rounded-lg p-6">
            <h3 className="text-xl">{name}</h3>
            <p className="text-sm mt-4 text-textgray">{description}</p>
            <div className="mt-10 flex items-center justify-between">
                <p className="text-white">Duration: <span className="text-textgray font-bold">{duration} minutes</span></p>
                <p className="text-white">{formattedPrice} <span className="font-bold">{deviza}</span></p>
            </div>
        </div>
    )
}