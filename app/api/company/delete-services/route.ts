import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { services } from "@/db/schema";
import { queryCompany } from "@/lib/query/queryCompany";

export async function DELETE(req: Request){

    const company = await queryCompany();

    if(!company) {
        return NextResponse.json(
            { error : "Unauthorized - No company found." },
            { status: 401 }
        )
    }

    const body = await req.json();
    const { id } = body;

    if(!id) {
        return NextResponse.json(
            { error: "ID required" },
            { status: 400 }
        )
    }

    const service = await db.query.services.findFirst({
        where: and(eq(services.id, id), eq(services.ownerCompanyId, company.id))
    })

    if(!service) {
        return NextResponse.json(
            { error : "Service not found." },
            { status : 404 }
        )
    }

    await db.delete(services).where(eq(services.id, id));

    return NextResponse.json({
        success: true,
        message: "Service deleted successfully."
    })



}