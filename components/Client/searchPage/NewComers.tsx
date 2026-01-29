import { queryNewCompanies } from "@/lib/query/search/newCompanies"
import { CompanyCard } from "../CompanyCard";


export default async function NewComers() {

    const companies = await queryNewCompanies();

    return(
        <section className="flex flex-col items-center mt-10 w-full mx-auto">
            <div className="flex flex-col items-center mb-10">
                <h1 className="text-5xl text-white text-center">New to our platform</h1>
                <p className="text-textgray text-center">Here you can find new businesses on our platform, explore them and book an appointment</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 mt-10 w-full mx-auto max-w-7xl p-2 mb-10">
                {companies.map((company) => (
                    <CompanyCard
                        key={company.id}
                        id={company.id}
                        name={company.name}
                        slug={company.slug}
                        serviceType={company.serviceType}
                        rating={company.rating}
                        imageUrl={company.imageUrl}
                        zipCode={company.zipCode}
                        address={company.address}
                        city={company.city}
                        number={company.number}
                        alphabet={company.alphabet}
                    />
                ))}
            </div>

        </section>
    )
}