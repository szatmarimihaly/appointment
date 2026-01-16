import Image from "next/image"
import SignOut from "../Button/SignOut"

const DashboardNav = () => {
  return (
    <nav className='flex items-center justify-between p-6'>
        <Image src="/vercel.svg" alt="Booking Logo" width={30} height={30}/>
        <SignOut/>
    </nav>
  )
}

export default DashboardNav