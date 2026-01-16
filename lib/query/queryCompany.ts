import { db } from "@/db";
import { eq } from "drizzle-orm";
import { company } from "@/db/schema";
import { getCurrentUser } from "./getCurrentUser";

export async function queryCompany() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return null
    };

    const userCompany = await db.query.company.findFirst({
        where: eq(company.ownerId, currentUser.id),
    });

    return userCompany || null;
}