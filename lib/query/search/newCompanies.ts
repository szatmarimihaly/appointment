import { eq, like, desc } from "drizzle-orm";
import { db } from "@/db";
import { company } from "@/db/schema";

export async function queryNewCompanies(){

    const newCompanies = await db.query.company.findMany({
        orderBy: [desc(company.createdAt)],
        limit: 6
    })

    return newCompanies;


}
