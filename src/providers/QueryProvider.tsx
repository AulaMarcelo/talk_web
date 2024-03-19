"use client"
import {
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
import { ReactNode } from 'react'

const queryClient = new QueryClient()
interface QueryProviderProps{
    children:ReactNode
}
export default function QueryProvider  ({children}:QueryProviderProps) {
    return (
        // Provide the client to your App
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
}

