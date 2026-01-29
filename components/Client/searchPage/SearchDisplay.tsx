
import { Suspense } from "react";
import SearchBar from "../SearchBar";
import { getAllCompanies } from "@/lib/query/getSearchSite";
import { CompanyCard } from "../CompanyCard";
import { searchCompanies } from "@/lib/query/search/searchCompanies";

interface SearchProps {
  searchParams : Promise<{
    q?:string;
  }>
}

export default async function SearchDisplay({ searchParams } : SearchProps) {

    const params = await searchParams;
    const companies = await searchCompanies(params.q || "")

    return(
        <div className="flex flex-col items-center mt-10 w-full mx-auto">
            <Suspense fallback={<div className="h-16 bg-background border border-inputcolor rounded-lg animate-pulse"></div>}>
                <SearchBar/>
            </Suspense>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 mt-10 w-full mx-auto max-w-7xl p-2 mb-10'>
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

        </div>
    )

}