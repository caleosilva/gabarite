"use client";

import * as React from "react";
import Link from "next/link";
import { useNavBar } from "./hooks/useNavBar";

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

export function Navbar() {
  const { menus, isLoading } = useNavBar();

  if (isLoading) {
    return (
      <div className="h-14 w-full border-b bg-background/50 animate-pulse" />
    );
  }

  return (
    <div className="flex w-full justify-center border-b bg-background p-2">
      <NavigationMenu>
        <NavigationMenuList className="gap-1 items-center">
          {menus.map((item) => {
            if (item.children && item.children.length > 0) {
              return (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className="h-9 px-4 py-2 gap-2">
                    <span>{item.title}</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {item.children.map((child) => (
                        <ListItem
                          key={child.title}
                          title={child.title}
                          href={child.href || "#"}
                        >
                          {child.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            }

            return (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link
                    href={item.href || "#"}
                    className="flex items-center gap-2"
                  >
                    <span>{item.title}</span>
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            );
          })}
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
            className,
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
