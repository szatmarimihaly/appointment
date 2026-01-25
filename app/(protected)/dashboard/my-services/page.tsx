import ServiceCard from "@/components/Admin/ServiceCard";
import AddServices from "@/components/Form/AddServices";
import { getCurrentServices } from "@/lib/query/company/getCurrentServices";


export default async function Page(){

    const services = await getCurrentServices();

    return(
        <main>
            <AddServices/>
            {services?.length === 0 ? (
                <p>No services added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-20 mx-2 mb-20">
                    {services?.map((service) => (
                        <ServiceCard
                            key={service.id}
                            id={service.id}
                            name={service.name}
                            description={service.description} 
                            price={service.price}
                            deviza={service.deviza}
                            duration={service.duration}   
                        />
                    ))}
                </div>
            )}
        </main>
    )


}