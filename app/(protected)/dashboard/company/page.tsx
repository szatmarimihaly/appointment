import CompanyNav from '@/components/Navbar/CompanyNav'
import PlusIcon from '@/components/ui/PlusIcon'
import { queryCompany } from '@/lib/query/queryCompany'
import { redirect } from 'next/navigation'
import React, { useCallback } from 'react'

const Page = async () => {

    const userCompany = await queryCompany();

    if(!userCompany){
        return(
            <>

                <header>
                    <CompanyNav/>
                </header>

                <main className='flex flex-col items-center justify-center min-h-screen'>
                    <div className='flex flex-col items-center'>
                        <p className='text-white text-xl'>No data provided, create your first company.</p>
                    </div>
                </main>
            
            </>
        )
    }

  return (
    <>
    
        <header>
            <CompanyNav/>
        </header>

        <main>

        </main>
    </>
  )
}

export default Page