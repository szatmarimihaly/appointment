import { Services } from "@/constants/Interfaces"


export default function ServiceCard({ name, description, price, deviza } : Services) {

    const formattedPrice = price.toLocaleString().replace(/\s/g, ".");
    
    return(
        <div className="bg-background rounded-lg p-6">
            <h3 className="text-xl">{name}</h3>
            <p className="text-sm mt-4 text-textgray">{description}</p>
            <div className="mt-10 flex items-center justify-end">
                <p className="">{formattedPrice} {deviza}</p>
            </div>
        </div>
    )
}