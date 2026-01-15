"use client"

import * as React from "react"
import { useSession } from "next-auth/react"
import { Navbar } from "./NavBar/NavBar" 
import { Skeleton } from "@/components/ui/skeleton"

export function Header() {
  const { data: session, status } = useSession()

  const primeiroNome = session?.user?.name?.split(" ")[0] || "Usuário"

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Lado Esquerdo: Saudação */}
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <h2 className="text-lg font-semibold tracking-tight">
              Olá, <span className="text-primary">{primeiroNome}</span>
            </h2>
          )}
        </div>

        {/* Lado Direito: Navbar */}
        <div className="flex items-center">
          <Navbar />
        </div>

      </div>
    </header>
  )
}