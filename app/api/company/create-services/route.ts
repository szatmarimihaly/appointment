import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { services, company } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getCurrentUser } from "@/lib/query/getCurrentUser";

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
        });

        if(!existingCompany) {
            return NextResponse.json(
                { error : "Create your company first, to add services." },
                { status : 404 }
            )
        };

        const body = await req.json();
        console.log("Received body:", body);
        const { name, description, deviza, price } = body;

        if(!name || !description || !deviza || !price) {
            return NextResponse.json(
                { error : "All fields required." },
                { status : 400 }
            )
        };

        const priceNumber = parseFloat(price);

        if (isNaN(priceNumber)) {
            return NextResponse.json(
                { error: "Invalid price format" },
                { status: 400 }
            )
        };

        const newService = await db.insert(services).values({
            id: nanoid(),
            ownerId: currentUser.id,
            ownerCompanyId: existingCompany.id,
            price: priceNumber,
            name, description, deviza
        }).returning();

        console.log("Service created:", newService[0]);

        return NextResponse.json(
            {
                success : true,
                message : "Service created successfully.",
                service : newService[0]
            },
            { status : 201 }
        );

    }catch(error : any){
        console.log("Error creating service: ", error);
        return NextResponse.json(
            { error : "Internal Server Error" },
            { status : 500 }
        );
    }
}