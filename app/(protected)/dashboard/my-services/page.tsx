import ServiceCard from "@/components/Admin/ServiceCard";
import NavigateBack from "@/components/Button/NavigateBack";
import AddServices from "@/components/Form/AddServices";
import { getCurrentServices } from "@/lib/query/company/getCurrentServices";


export default async function Page(){

    const services = await getCurrentServices();

    return(
        <>

            <header className="p-6">
                <NavigateBack/>
            </header>

            <main>
                <AddServices/>
                {services?.length === 0 ? (
                    <p className="text-center mt-30">No services added yet.</p>
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
        </>
    )


}