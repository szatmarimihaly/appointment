import PurpleButton from "@/components/Button/PurpleButton";
import DescriptionCard from "@/components/Main/DescriptionCard";
import MainNav from "@/components/Navbar/MainNav";


export default function Page(){

  return(
    <>
      <header>
        <MainNav/>
      </header>

      <main className="flex flex-col items-center">
        <h1 className="text-textcolor text-center text-5xl lg:text-5xl font-bold mt-30">Next Level <span className="text-foreground">Booking System</span> for you company</h1>

        <p className="text-textgray text-center text-sm lg:text-md mt-5">The Next Level Booking System is a modern and user-friendly platform that helps companies manage their appointments and bookings efficiently.</p>

        <PurpleButton href="/sign-up" text="Start 3-Day Trial"/>

        <DescriptionCard/>
      </main>
    </>
  )
}