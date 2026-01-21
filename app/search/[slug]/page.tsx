import CompanyDetail from "@/components/Client/CompanyDetail";
import SpinnerWhite from "@/components/ui/SpinnerWhite";
import { getCompanyDetail } from "@/lib/query/search/detailView";
import { notFound } from "next/navigation";
import { Suspense } from "react";


interface CompanyDetail{
    params : Promise<{ slug : string }>
}

export default async function Page({ params } : CompanyDetail) {

    const { slug } = await params;
    const company = await getCompanyDetail(slug);

    if(!company) {
        return notFound();
    }

    return(

        <main>
            <Suspense fallback={<SpinnerWhite/>}>
                <CompanyDetail
                    key={company?.id}
                    slug={company.slug}
                    name={company?.name}
                    description={company.description}
                    serviceType={company.serviceType}
                    rating={company.rating}
                    imageUrl={company.imageUrl}
                    country={company.country}
                    city={company.city}
                    zipCode={company.zipCode}
                    address={company.address}
                    number={company.number}
                    alphabet={company.alphabet}
                    phone={company.phone}
                />
            </Suspense>
        </main>


    )
}