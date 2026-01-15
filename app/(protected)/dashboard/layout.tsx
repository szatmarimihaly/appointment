import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React from "react";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

type Props = {
    children : React.ReactNode
}

export default async function ProtectedLayout({ children } : Props){
    const session = await auth.api.getSession({
        headers : await headers()
    });

    if(!session) {
        redirect("/sign-in")
    }

    return children;
}