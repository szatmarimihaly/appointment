import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
import { getCurrentUser } from "@/lib/query/getCurrentUser";
import { eq } from "drizzle-orm";
import { slugify } from "@/utils/slugify";

export async function POST(req: Request) {

    try{
        
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return NextResponse.json(
                { error : "Unathorized" },
                { status : 401 }
            )
        }

        const body = await req.json();
        const { name, description, serviceType } = body;

        if(!name || !description || !serviceType) {
            return NextResponse.json(
                { error : "All filds are required." },
                { status : 400 }
            )
        }

        const slug = slugify(name);

        const updateCompany = await db.update(company).set({
            name: name,
            slug: slug,
            description : description,
            serviceType : serviceType,
            updatedAt : new Date()
        }).where(eq(company.ownerId, currentUser.id)).returning();

        return NextResponse.json({
            success: true,
            message: "Company updated successfully",
            company: updateCompany[0]
        })

    }catch(error : any) {
        console.log(error);

        return NextResponse.json(
            { error : "Internal Server Error" },
            { status : 500 }
        )
    }

}