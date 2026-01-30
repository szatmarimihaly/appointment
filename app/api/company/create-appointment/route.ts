import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { company, appointments } from "@/db/schema";
import { queryCompany } from "@/lib/query/queryCompany";
import { eq, and, or, gte, lte } from "drizzle-orm"
import { error } from "console";
import { nanoid } from "nanoid";

export async function POST(req: NextRequest) {
    
    const company = await queryCompany();

    if(!company){
        return NextResponse.json(
            { error : "Unauthorized - no company found" },
            { status : 401 }
        )
    }

    const body = await req.json();
    const { date, startSlot, endSlot } = body;

    if(!date || !startSlot || !endSlot){
        return NextResponse.json(
            { error : "Date, start time and end time are required." },
            { status : 400 }
        )
    }

    const appointmentDate = new Date(date);
    if(isNaN(appointmentDate.getTime())){
        return NextResponse.json(
            { error : "Invalid date format." },
            { status : 400 }
        )
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    appointmentDate.setHours(0, 0, 0, 0);

    if(appointmentDate < tomorrow) {
        return NextResponse.json(
            { error : "Appointment date must be at least tomrrow or later." },
            { status : 400 }
        )
    }

    if(startSlot < 0 || endSlot > 144 || startSlot >= endSlot){
        return NextResponse.json(
            { error : "Invalid time slots. Start must be before end, and within valid range (0-144)" },
            { status : 400 }
        )
    }

    const dateStr = appointmentDate.toISOString().split("T")[0];

    const overlapping = await db.query.appointments.findFirst({
        where: and(eq(appointments.companyId, company.id), eq(appointments.date, dateStr), or(
            and(lte(appointments.startSlot, startSlot), gte(appointments.endSlot, endSlot)),
            and(lte(appointments.startSlot, endSlot), gte(appointments.endSlot, endSlot)),
            and(gte(appointments.startSlot, startSlot), lte(appointments.endSlot, endSlot))
        ))
    })

    if(overlapping) {
        return NextResponse.json(
            { error : "An appointment already exists during this time slot." },
            { status : 409 }
        )
    }

    try{
        const newAppointment = await db.insert(appointments).values({
            id: nanoid(),
            companyId: company.id,
            date: dateStr,
            startSlot: startSlot,
            endSlot: endSlot,
            status: "pending",
            serviceId: null,
            customerName: null,
            customerEmail: null,
            customerPhone: null,
            cancelToken: null
        }).returning();

        return NextResponse.json({
            success: true,
            appointment: newAppointment[0]
        });
    }catch(error) {
        console.log("Error creating appointment: ", error);
        return NextResponse.json(
            { error : "Internal Server Error" },
            { status : 500 }
        )
    }
}