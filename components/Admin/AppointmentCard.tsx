import { Appointment } from "@/constants/Interfaces";
import { slotToTime } from "@/utils/timeConversion";
import AppointmentStatus from "../ui/Status/AppointmentStatus";
import Link from "next/link";



export default function AppointmentCard({ id, date, startSlot, endSlot, status } : Appointment) {

    const dateObj = new Date(date);
    const startTime = slotToTime(startSlot);
    const endTime = slotToTime(endSlot)

    return(
        <Link 
            className="bg-clientcard p-6 rounded hover:bg-slate-800/70 transition-all duration-300 hover:cursor-pointer w-full max-w-7xl mx-auto"
            href={`/dashboard/appointments/${id}`}
        >
            
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center md:flex-row gap-2">
                    <h3 className="flex items-center gap-2">{dateObj.toLocaleDateString()}</h3>
                    <p className="text-textgray text-sm">{startTime} - {endTime}</p>
                </div>
                <AppointmentStatus status={status}/>
            </div>
        </Link>
    )
}