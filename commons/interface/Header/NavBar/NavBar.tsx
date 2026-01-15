"use client";

import * as React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  Settings2,
  Users,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const auxiliares: { title: string; href: string; description: string }[] = [
  {
    title: "Concurso",
    href: "/concurso",
    description: "Gerencie os editais e certames disponíveis.",
  },
  {
    title: "Órgão",
    href: "/orgao",
    description: "Cadastro de instituições e órgãos públicos.",
  },
  {
    title: "Banca",
    href: "/banca",
    description: "Organizadoras de concursos (Ex: FGV, Cebraspe).",
  },
  {
    title: "Disciplina",
    href: "/disciplina",
    description: "Matérias e conteúdos programáticos.",
  },
  {
    title: "Questão",
    href: "/questao",
    description: "Banco de questões para simulados e treinos.",
  },
];

export function Navbar() {
  return (
    <div className="flex w-full justify-center border-b bg-background p-2">
      <NavigationMenu>
        <NavigationMenuList className="gap-1 items-center">
          {/* 0. Dashboard */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 1. Estudo */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/estudo" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Estudo</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* 2. Auxiliares (Dropdown) */}
          <NavigationMenuItem>
           <NavigationMenuTrigger className="h-9 px-4 py-2 gap-2">
  <Settings2 className="h-4 w-4" />
  <span>Auxiliares</span>
</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] lg:right-0">
                {auxiliares.map((item) => (
                  <ListItem
                    key={item.title}
                    title={item.title}
                    href={item.href}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* 3. Usuário */}
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/usuario" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Usuário</span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
