import { db } from "@/db";
import { company, services } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { Services } from "@/constants/Interfaces";

export async function getServicesForCompanies(slug : string){
    const companyResult = await db.query.company.findFirst({
        where: eq(company.slug, slug)
    })

    if(!companyResult){
        return [];
    }

    const servicesResult = await db.query.services.findMany({
        where: eq(services.ownerCompanyId, companyResult.id)
    })

    if(!servicesResult) {
        return [];
    }

    return servicesResult;
}