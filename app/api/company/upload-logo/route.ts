import { getCurrentUser } from "@/lib/query/getCurrentUser";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, NextRequest } from "next/server";
import { db } from "@/db";
import { company } from "@/db/schema";
import { eq } from "drizzle-orm";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_TYPES = [
  "image/webp",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
];

const MAX_FILE_SIZE = 5*1024*1024; 

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if(!user) {
        return NextResponse.json(
            { error : "Unathorized" },
            { status : 401 }
        )
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const companyId = formData.get("companyId") as string;

    if(!file || !companyId) {
        return NextResponse.json(
            { error : "Missing data." },
            { status : 400 }
        )
    };

    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    };

    if(file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error : "File size must be less than 5MB." },
            { status : 400 }
        )
    }

    const existingCompany = await db.query.company.findFirst({
        where : eq(company.id, companyId)
    });
    
    if (!existingCompany || existingCompany.ownerId !== user.id) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    };

    const ext = file.name.split(".").pop();
    const filePath = `${companyId}/logo.${ext}`;

    const { error: uploadError } = await supabase.storage.from("business-logos").upload(filePath, file, { upsert: true });

    if(uploadError) {
        return NextResponse.json(
            { error : "Error while uploading the file" },
            { status : 500 }
        )
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/business-logos/${filePath}`;

    await db.update(company).set({ imageUrl: publicUrl }).where(eq(company.id, companyId));

    return NextResponse.json(
        { imageUrl: publicUrl },
        { status: 200 }
    )

}