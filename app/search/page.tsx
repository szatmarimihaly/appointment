import { CompanyCard } from '@/components/Client/CompanyCard'
import SearchBar from '@/components/Client/SearchBar'
import { getAllCompanies } from '@/lib/query/getSearchSite'
import { searchCompanies } from '@/lib/query/search/searchCompanies'
import React from 'react'
import { Suspense } from 'react'

interface SearchProps {
  searchParams : Promise<{
    q?:string;
  }>
}

export default async function Page ({ searchParams } : SearchProps) {

  const params = await searchParams;
  const companies = await searchCompanies(params.q || "");

  return (
    <main className='flex flex-col items-center mt-30'>
        <h1 
            className='text-white text-5xl lg:text-5xl text-center mx-2'
        >
            Local <span className='purpleshadow'>Businesses around</span> you.
        </h1>
        <p className='text-sm text-textgray text-center mx-2 lg:text-lg'>Search for local service providers and book appointments instantly</p>

        <Suspense fallback={<div className="h-16 bg-background border border-inputcolor rounded-lg animate-pulse"></div>}>
          <SearchBar/>
        </Suspense>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-6 mt-10 w-full mx-auto max-w-7xl p-2 mb-50'>
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
    </main>
  )
}