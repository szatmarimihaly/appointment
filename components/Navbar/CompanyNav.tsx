
import Image from "next/image"
import CreateCompany from "../Button/CreateCompany"

export default function CompanyNav() {
    return(
        <nav className="flex items-center justify-between p-6">
            <Image src="/vercel.svg" alt="Booking Logo" width={30} height={30}/>
            <CreateCompany/>
        </nav>
    )
}