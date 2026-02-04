"use server";

import { queryByState } from "@/lib/query/appointments/queryByState";
import { queryCompany } from "@/lib/query/queryCompany";
import { AppointmentStatus, AppointmentCursor } from "@/constants/appointmentTypes";

export async function fetchAppointments(
    status?: AppointmentStatus,
    cursor?: AppointmentCursor
){
    const company = await queryCompany();

    if(!company) {
        return {
            pagedAppointments : [],
            nextCursor: null,
            hasMore: false
        }
    }

    const result = await queryByState({
        companyId: company.id,
        status, cursor, pageSize: 3
    })

    return result;
}