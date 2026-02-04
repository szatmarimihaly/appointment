
export type AppointmentStatus = "pending" | "booked" | "completed" | "cancelled";

export interface AppointmentParams {
    companyId: string,
    status: AppointmentStatus,
    cursor?: string, // LAST Appointment ID from the previous page
    pageSize?: number // Number of Appointments per page
};

export interface AppointmentFilterListProps {
    initialAppointments: any[],
    initialCursor: AppointmentCursor,
    initialHasMore: boolean
};

export type AppointmentCursor ={
    date: string,
    startSlot: number,
    id: string
} | null;