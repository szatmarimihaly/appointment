"use client";

import { useState, useTransition } from "react";
import AppointmentCard from "../AppointmentCard";
import { Appointment } from "@/constants/Interfaces";
import { AppointmentCursor, AppointmentFilterListProps } from "@/constants/appointmentTypes";
import SpinnerWhite from "@/components/ui/SpinnerWhite";
import { fetchAppointments } from "@/app/actions/appointmentActions";

type AppointmentStatus = "pending" | "booked" | "completed" | "cancelled";

const STATUS_OPTIONS = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "booked", label: "Booked" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" }
];

export const AppointmentFilterList = ({ 
    initialAppointments, 
    initialCursor,
    initialHasMore
} : AppointmentFilterListProps) => {

    const [isPending, startTransition] = useTransition();
    const [selectedStatus, setSelectedStatus] = useState<AppointmentStatus | "all">("all");
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [cursor, setCursor] = useState<AppointmentCursor>(initialCursor);
    const [hasMore, setHasMore] = useState(initialHasMore);

    const handleStatusChange = (status: AppointmentStatus | "all") => {
        setSelectedStatus(status);
        
        startTransition(async () => {
            const result = await fetchAppointments(
                status === "all" ? undefined: status
            );
            setAppointments(result.pagedAppointments as Appointment[]);
            setCursor(result.nextCursor);
            setHasMore(result.hasMore);
        })
    }

    const handleMore = () => {
        startTransition(async () => {
            const result = await fetchAppointments(
                selectedStatus === "all" ? undefined : selectedStatus,
                cursor || undefined
            );
            setAppointments(prev => [...prev, ...result.pagedAppointments as Appointment[]]);
            setCursor(result.nextCursor);
            setHasMore(result.hasMore);
        });
        
    }

    return(
        <div className="px-2 mb-10">
            <div className="w-full max-w-7xl mx-auto">
                <div className="mt-10 mb-6 flex flex-wrap gap-2 justify-center">
                    {STATUS_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value as AppointmentStatus | "all")}
                            disabled={isPending}
                            className={`px-4 py-2 rounded font-medium transition-colors 
                            ${selectedStatus === option.value ? "bg-foreground text-white" : "text-textgray"} disabled:opacity-80`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {isPending && (
                    <div className="flex flex-col items-center my-20">
                        <SpinnerWhite/>
                    </div>
                )}

                {!isPending && appointments.length === 0 && (
                    <div className="text-center text-white mt-20">
                        No appointments found.
                    </div>
                )}

                {appointments.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {appointments.map((appointment) => (
                                <AppointmentCard
                                    key={appointment.id}
                                    id={appointment.id}
                                    date={appointment.date}
                                    startSlot={appointment.startSlot}
                                    endSlot={appointment.endSlot}
                                    status={appointment.status}
                                />
                            ))}
                        </div>

                        <p className="text-center text-textgray mt-6 mb-2"
                        >
                            Showing {appointments.length} appointments
                        </p>

                        {hasMore && (
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={handleMore}
                                    disabled={isPending}
                                    className="bg-foreground px-4 py-2 rounded text-white"
                                >
                                    {isPending ? <SpinnerWhite/> : "Load more"}
                                </button>
                            </div>
                        )}
                    
                    </>
                )}

            </div>
        </div>
    )
}