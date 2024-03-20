"use client"
import { Button } from "@/components/ui/button";

import {LogIn, LogOut } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
    const { data: session,status } = useSession()
    console.log(session)
    if(status=="loading"){
        return <h1>Loading ...</h1>
    }
    return ( 
        <div className="flex justify-between items-center h-20 bg-slate-500">
        <div className="flex items-center gap-5">
        {session ?
      
            <>
            <Avatar className="ms-3">
                <AvatarImage src={session.user !== undefined ? session.user.image as string : ''} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{session.user !== undefined ? session.user.name as string : 'Anonimos'}</p>
            </>
     
        :
            <>
            <Avatar className="ms-3">
                <AvatarFallback>AN</AvatarFallback>
            </Avatar>
            <p>Anonimos</p>
            </>
        }

        </div>
        <div>
            {/* {JSON.stringify(session,null,2)} */}
          {session ? 
           <Button variant="outline" size="icon" onClick={() => signOut()}><LogOut /></Button>
         :
           <Button variant="outline" size="icon" onClick={() => signIn()}><LogIn /></Button>
         }
        </div>
        </div>
     );
}

export default Header;