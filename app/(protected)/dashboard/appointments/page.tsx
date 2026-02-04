import NavigatePurple from "@/components/Button/NavigatePurple";
import PurpleShadowNavigation from "@/components/Button/PurpleShadowNavigation";
import CreateAppointment from "@/components/Form/CreateAppointment";


export default async function Page(){

    return(
       <>
            <header className="p-6 flex items-center justify-between">
                <NavigatePurple href="/dashboard" />
                <PurpleShadowNavigation href="/dashboard/overview" text="Overview"/>
            </header>

            <main className="flex flex-col items-center">
                <h1 className="text-2xl text-center text-white md:text-4xl mt-20">Appointments</h1>
                <p className="text-sm text-textgray mt-2 text-center">Here you can create, update and delete your appointments</p>
                <CreateAppointment/>
            </main>

       </>
    )
}