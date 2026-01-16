import SignOut from '@/components/Button/SignOut'
import DashboardNav from '@/components/Navbar/DashboardNav'
import OptionCards from '@/components/Protected/OptionCards'
import { getCurrentUser } from '@/lib/query/getCurrentUser'
import React from 'react'

const Page = async () => {

  const user = await getCurrentUser();

  return (
    <>

      <header>
        <DashboardNav/>
      </header>


      <main>
        <h1 className='mt-10 text-3xl lg:text-5xl font-bold text-center text-white'>Welcome to your dashboard, <span className='text-foreground'>{user?.name}</span>!</h1>
        <OptionCards/>
      </main>
    
    </>
  )
}

export default Page