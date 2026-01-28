
import Image from "next/image"
import CreateCompany from "../Button/CreateCompany"
import NavigateBack from "../Button/NavigateBack"

export default function CompanyNav() {
    return(
        <nav className="flex items-center justify-between p-6">
            <NavigateBack/>
            <CreateCompany/>
        </nav>
    )
}