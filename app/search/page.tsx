import { getAllCompanies } from '@/lib/query/getSearchSite'
import React from 'react'

const Page = () => {

  return (
    <main className='flex flex-col items-center mt-40'>
        <h1 
            className='text-white text-2xl lg:text-5xl'
        >
            Local <span className='purpleshadow'>Businesses around</span> you.
        </h1>
    </main>
  )
}

export default Page