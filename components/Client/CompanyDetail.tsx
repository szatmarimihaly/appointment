import { CompanyDetailProps, Services } from "@/constants/Interfaces";
import Image from "next/image";
import Phone from "../ui/Phone";
import Instagram from "../ui/Instagram";
import Address from "../ui/Address";
import { getServicesForCompanies } from "@/lib/query/detailView/getCompanyServices";
import ServiceCard from "./ServiceCard";

export default async function CompanyDetail({ name, description, serviceType, rating, imageUrl, country, city, zipCode, address, number, alphabet, phone, slug  } : CompanyDetailProps){

    const services = await getServicesForCompanies(slug);
    console.log(services);

    return(
        <div className="flex flex-col items-center my-20 mx-2 lg:mx-20 bg-slate-800/50 hover:bg-slate-800/70 transition-all duration-300 py-10 px-2 rounded">
            <div className="flex flex-col items-center lg:flex-row gap-20">
                {imageUrl ? (
                    <div className="w-80 h-40 md:w-64 md:h-64 lg:w-200 lg:h-96 relative">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center bg-slate-800/70 rounded-lg w-80 h-40 md:w-64 md:h-64 lg:w-140 lg:h-64 relative">
                        <p className="text-white font-bold">No image provided.</p>
                    </div>
                )}
                <div className="flex-col items-center gap-10 text-center">
                    <h1 className="text-3xl lg:text-5xl font-bold mb-4">{name}</h1>
                    <p className="text-textgray text-sm">{description}</p>
                    <button className="bg-foreground text-white px-6 py-2 mt-10">Book an appointment</button>
                    <div className="flex flex-col items-start text-white mt-10 gap-4">
                        <p className="flex items-center gap-2"><Phone/>{phone}</p>
                        <p className="flex items-center gap-2"><Instagram/>{phone}</p>
                        <p className="flex items-center gap-2"><Address/>{city}, {zipCode} {address} {number}/{alphabet}</p>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl lg:text-5xl text-white font-bold mt-20">Services</h2>

            {services.length === 0 ? (
                 <p className="text-center mt-20 text-white">No services found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 w-full mx-auto mt-20">
                    {services.map((service) => (
                        <ServiceCard key={service.id} name={service.name} description={service.description} price={service.price} deviza={service.deviza}/>
                    ))}            
                </div>
            )}
        </div>
    )
}