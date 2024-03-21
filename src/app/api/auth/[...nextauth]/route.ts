import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { Adapter } from "next-auth/adapters";
import { authOptions } from "@/utils/authOptions";
const prisma = new PrismaClient()
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }