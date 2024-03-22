import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header/Header";
import SessionWrapper from "@/providers/SessionProvider";

import { GoogleAnalytics } from '@next/third-parties/google'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkNote DLG",
  description: "Gera anotações por fala integrado com AI",
  robots:{
    follow:true,
    index:true,
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SessionWrapper>
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
   
            <Header/>
            {children}
            <Toaster />
       
        </QueryProvider>
      </body>
      <GoogleAnalytics gaId="GTM-5FTF2ZHC" />
    </html>
    </SessionWrapper>
  );
}
