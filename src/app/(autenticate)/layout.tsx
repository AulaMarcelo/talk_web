import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

export default async function AutenticateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions);
    if(!session){
      return redirect("/")
    }
  return (

         <>
         {children}
         </>
  
  );
}
