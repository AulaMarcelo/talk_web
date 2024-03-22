import  { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client"
import { JWT } from 'next-auth/jwt';
import {IUserAuth} from '@/interface/user/interface'
const prisma = new PrismaClient()


const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
    
}

export {authOptions}