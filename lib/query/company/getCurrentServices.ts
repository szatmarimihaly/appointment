import { db } from "@/db";
import { services } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "../getCurrentUser";
import { redirect } from "next/navigation";

export async function getCurrentServices(){
    const user = await getCurrentUser();

    if(!user) {
        redirect("/sign-in");
        return;
    }

    const getServices = await db.query.services.findMany({
        where: eq(services.ownerId, user.id)
    })

    if(!getServices) {
        return [];
    }

    return getServices;
}