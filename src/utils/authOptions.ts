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
      callbacks: {
        async jwt({ token, account, profile }) {
          // Persist the OAuth access_token and or the user id to the token right after signin
          if (account) {
            token.accessToken = account.access_token
            token.id = account.id
          }
        
          return token
        },
      
        
 
        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          
        
          
          return session
        }
      
      }
}

export {authOptions}