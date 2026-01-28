import { getCurrentUser } from "@/lib/query/getCurrentUser";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
    const user = await getCurrentUser();

    if(!user) {
        return NextResponse.json(
            { error : "Unauthorized" },
            { status : 401 }
        )
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const companyId = formData.get("companyId") as string;

    if(!file || !companyId) {
        return NextResponse.json(
            { error : "Missing file or company ID" },
            { status : 400 }
        )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
            { error: "Only WEBP, JPEG, PNG, and SVG images are allowed" }, 
            { status: 400 }
        );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
            { error: "File size must be less than 5MB" },
            { status: 400 }
        );
    }

    // Verify company ownership
    const existingCompany = await db.query.company.findFirst({
        where : eq(company.id, companyId)
    });
    
    if (!existingCompany || existingCompany.ownerId !== user.id) {
        return NextResponse.json(
            { error: "You don't have permission to update this company" }, 
            { status: 403 }
        );
    }

    try {
        // Get file extension
        const ext = file.name.split(".").pop() || "png";
        const filePath = `${companyId}/logo.${ext}`;

        // Delete old file if it exists (to avoid storage bloat)
        if (existingCompany.imageUrl) {
            // Extract old file path from URL
            const oldFilePath = existingCompany.imageUrl.split('/business-logos/')[1];
            if (oldFilePath) {
                await supabase.storage
                    .from("business-logos")
                    .remove([oldFilePath]);
            }
        }

        // Upload new file
        const { error: uploadError } = await supabase.storage
            .from("business-logos")
            .upload(filePath, file, { 
                upsert: true,
                contentType: file.type 
            });

        if(uploadError) {
            console.error("Supabase upload error:", uploadError);
            return NextResponse.json(
                { error : "Failed to upload file to storage" },
                { status : 500 }
            )
        }

        // Generate public URL with cache-busting timestamp
        const timestamp = Date.now();
        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/business-logos/${filePath}?t=${timestamp}`;

        // Update database
        await db.update(company)
            .set({ 
                imageUrl: publicUrl,
                updatedAt: new Date()
            })
            .where(eq(company.id, companyId));

        return NextResponse.json(
            { 
                imageUrl: publicUrl,
                success: true 
            },
            { status: 200 }
        )
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json(
            { error: "Failed to upload logo" },
            { status: 500 }
        );
    }
}