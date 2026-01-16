import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/query/getCurrentUser";
import { nanoid } from "nanoid";
import { slugify } from "@/utils/slugify";
import { searchify } from "@/utils/searchify";

export async function POST(req: Request) {
    try{
        const currentUser = await getCurrentUser();

        if(!currentUser) {
            return NextResponse.json(
                { error : "Unauthorized" },
                { status : 401 }
            );
        };

        const existingCompany = await db.query.company.findFirst({
            where: eq(company.ownerId, currentUser.id)
        })

        if(existingCompany) {
            return NextResponse.json(
                { error : "Company already exists." },
                { status : 400 }
            )
        }

        const body = await req.json();
        const { name, description, serviceType } = body;

        if(!name || !description || !serviceType) {
            return NextResponse.json(
                { error : "All fields are required." },
                { status : 400 }
            )
        }
        const slug = slugify(name);
        const nameSearch = searchify(name);
        const serviceTypeSearch = searchify(serviceType);

        const existingSlug = await db.query.company.findFirst({
            where: eq(company.slug, slug),
        });

        if (existingSlug) {
            return NextResponse.json(
                { error : "A company with this name already exists. Please choose a different name." },
                { status : 400 }
            )
        }

        const newCompany = await db.insert(company).values({
            id : nanoid(),
            ownerId :  currentUser.id,
            name, description, serviceType, slug, nameSearch, serviceTypeSearch
        }).returning();

        return NextResponse.json(
            { company : newCompany[0] },
            { status : 201 }
        );
    }catch(error : any) {
        console.log(error);
        return NextResponse.json(
            { error : "Internal Server Error" },
            { status : 500 }
        )
    }
}