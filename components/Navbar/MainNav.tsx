import React from 'react'
import Image from 'next/image'
import PurpleRounded from '../Button/PurpleRounded'

const MainNav = () => {
  return (
    <nav className='flex items-center justify-between p-4 bg-slate-800/50'>
        <Image src="/vercel.svg" alt="Booking Logo" width={30} height={30}/>
        <PurpleRounded/>
    </nav>
  )
}

export default MainNav