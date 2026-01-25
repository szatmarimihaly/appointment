import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { weeklyWorkingHours } from "@/db/schema";
import { queryCompany } from "@/lib/query/queryCompany";
import { eq, and } from "drizzle-orm";

export async function GET(){
    const company = await queryCompany();

    if(!company) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    };

    const hours = await db.query.weeklyWorkingHours.findMany({
        where: eq(weeklyWorkingHours.companyId, company.id)
    })

    return NextResponse.json(hours);
}

export async function POST(req: Request){
    const company = await queryCompany();

    if(!company) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    };

    const body = await req.json();
    const { weekday, startSlot, endSlot } = body;

    if(weekday < 0 || weekday > 6 || startSlot < 0 || endSlot > 144 || startSlot > endSlot) {
        return NextResponse.json(
            { error: "Invalid input" },
            { status: 400 }
        )
    };

    const existing = await db.query.weeklyWorkingHours.findFirst({
        where: and(eq(weeklyWorkingHours.companyId, company.id), eq(weeklyWorkingHours.weekday, weekday))
    });

    if(existing) {
        await db.update(weeklyWorkingHours).set({
            startSlot: startSlot,
            endSlot: endSlot
        }).where(eq(weeklyWorkingHours.id, existing.id)).returning();
    }else {
        await db.insert(weeklyWorkingHours).values({
            id: nanoid(),
            companyId: company.id,
            weekday: weekday,
            startSlot: startSlot,
            endSlot: endSlot
        }).returning();
    };

    return NextResponse.json({ success : true });
}