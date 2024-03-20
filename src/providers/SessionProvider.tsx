
"use client"

import { ReactNode } from "react";
import { SessionProvider as NextProvider } from "next-auth/react"


interface QueryProviderProps{
    children:ReactNode
    
}
function SessionWrapper ({children}:QueryProviderProps) {
    return (  
        <NextProvider>
        {children}
       </NextProvider>
    );
}

export default SessionWrapper;