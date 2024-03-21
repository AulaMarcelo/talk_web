
"use client"

import { ReactNode } from "react";
import { SessionProvider as NextProvider } from "next-auth/react"


interface SessionProviderProps{
    children:ReactNode
    
}
function SessionWrapper ({children}:SessionProviderProps) {
    return (  
        <NextProvider>
        {children}
       </NextProvider>
    );
}

export default SessionWrapper;