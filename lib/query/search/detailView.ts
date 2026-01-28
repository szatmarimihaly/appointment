import { db } from "@/db";
import { company, services } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Company, Services } from "@/constants/Interfaces";

export async function getCompanyDetail(slug : string) : Promise<Company | null>{ 

    const companyDetail = await db.query.company.findFirst({ 
        where : eq(company.slug, slug) 
    }); 
    
    return companyDetail || null;
}
