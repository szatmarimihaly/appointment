import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
import { getCurrentUser } from "@/lib/query/getCurrentUser";
import { eq, and, ne } from "drizzle-orm";
import { slugify } from "@/utils/slugify";
import { searchify } from "@/utils/searchify";

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
        const { name, description, serviceType, instagramUrl, websiteUrl, country, city, zipCode, address, number, alphabet, phone } = body;

        if(!name || !description || !serviceType || !country || !city || !zipCode || !address || !number || !alphabet || !phone) {
            return NextResponse.json(
                { error : "All filds are required." },
                { status : 400 }
            )
        }

        const existingCompany = await db.query.company.findFirst({
            where: eq(company.ownerId, currentUser.id),
        });

        if (!existingCompany) {
            return NextResponse.json(
                { error: "Company not found" },
                { status: 404 }
            );
        }

        const nameSearch = searchify(name);
        const serviceTypeSearch = searchify(serviceType);
        const houseNumber = parseInt(number);
        
        const updateCompany = await db.update(company).set({
            name: name,
            nameSearch: nameSearch, 
            description : description,
            serviceType : serviceType,
            serviceTypeSearch: serviceTypeSearch,
            updatedAt : new Date(),
            instagramUrl: instagramUrl || null,
            websiteUrl: websiteUrl || null,
            city: city,
            zipCode: zipCode,
            address: address,
            number: houseNumber,
            alphabet: alphabet,
            phone: phone
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