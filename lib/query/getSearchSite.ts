import { db } from "@/db";
import { eq } from "drizzle-orm";
import { company } from "@/db/schema";

export async function getAllCompanies() {
    const companies = await db.query.company.findMany({
        orderBy:(company, { desc }) => [desc(company.createdAt)]
    })

    return companies;
}