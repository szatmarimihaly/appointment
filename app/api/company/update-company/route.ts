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
        const { name, description, serviceType, instagramUrl, websiteUrl } = body;

        if(!name || !description || !serviceType) {
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

        const slug = slugify(name);
        const nameSearch = searchify(name);
        const serviceTypeSearch = searchify(serviceType);

        if (slug !== existingCompany.slug) {
            const slugConflict = await db.query.company.findFirst({
                where: and(
                    eq(company.slug, slug),
                    ne(company.id, existingCompany.id)
                ),
            });

            if (slugConflict) {
                return NextResponse.json(
                    { error: "A company with this name already exists" },
                    { status: 400 }
                );
            }
        }

        const updateCompany = await db.update(company).set({
            name: name,
            nameSearch: nameSearch, 
            description : description,
            serviceType : serviceType,
            serviceTypeSearch: serviceTypeSearch,
            updatedAt : new Date(),
            instagramUrl: instagramUrl || null,
            websiteUrl: websiteUrl || null
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