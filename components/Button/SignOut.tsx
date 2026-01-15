"use client";

import { signOutAction } from "@/lib/auth/sign-out";
import LogOutIcon from "../ui/LogOutIcon";

const SignOut = () => {
    return(
        <button
            onClick={signOutAction}
            className="text-white bg-foreground px-4 py-2 rounded"
        >
            Log out
        </button>
    )
}
export default SignOut;

