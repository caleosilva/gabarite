"use client"

import { Navbar } from "./NavBar/NavBar" 
import UserHeader from "./UserHeader/UserHeader"
import { Skeleton } from "@/components/ui/skeleton"
import { useAuthComponente } from "@/commons/auth/hooks/useAuthComponente/useAuthComponente"

export function Header() {
  const {isAuthenticated, isLoading, user} = useAuthComponente();

  const primeiroNome = user?.name?.split(" ")[0] || "Usuário"

  if (!isAuthenticated) return;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Lado Esquerdo: Saudação */}
        <div className="flex items-center gap-2">
          {isLoading ? (
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

         <div className="flex items-center">
          <UserHeader />
        </div>

        

      </div>
    </header>
  )
}