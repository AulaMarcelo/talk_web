"use client"
import { Button } from "@/components/ui/button";

import {CloudMoon, FileTerminal, LogIn, LogOut } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Link from "next/link";
import DialogTerminal from "@/components/dialogTerminal/dialogotemirnal";


function Header() {
    const { data: session,status } = useSession()
    

   
    return ( 

        
        <div className="flex justify-between items-center  p-3   w-full border">
        <div className="flex items-center justify-center ps-2 gap-5 w-full md:ps-6 ">
            
        {session ?
         
            <>
          
            <Avatar className="ms-3 h-8 w-8">
                <AvatarImage src={session.user !== undefined ? session.user.image as string : ''}  />
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
       
        <div className="flex justify-end items-center pe-10 w-1/2 md:justify-start md:pe-4 hover:animate-pulse "> 
     
          {session ? 
          <>
             <DialogTerminal userAuth={session.user!}/>
             <Link href="/"  onClick={() => signOut()}><LogOut /></Link>
           </>
         :
           <Link href="/note"  onClick={() => signIn()}><LogIn /></Link>
         }


           
        
        </div>
       
        </div>
     );
}

export default Header;