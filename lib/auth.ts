import { betterAuth } from "better-auth";
import { db } from "@/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema"

export const auth = betterAuth({
    appUrl : process.env.APP_URL!,
    secret: process.env.BETTER_AUTH_SECRET!,
    database : drizzleAdapter(db, {
        provider : "pg",
        schema
    }),
    emailAndPassword : {
        enabled : true
    },
    trustedOrigins : [
        "http://localhost:3000",
        "http://192.168.1.73:3000"
    ],
    advanced : {
        disableCSRFCheck : process.env.NODE_ENV === "development"
    }
})