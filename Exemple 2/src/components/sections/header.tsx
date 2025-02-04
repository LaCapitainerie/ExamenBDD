"use client";

import Drawer from "@/components/other/drawer";
import { Icons } from "@/components/other/icons";
import Menu from "@/components/other/menu";
import { siteConfig } from "@/config/config";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { UserNav } from "../ui/user-nav";
import { User } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface HeaderProps {
  user: Omit<User, "id">
}

export default function Header({ user }: HeaderProps) {
  const [addBorder, setAddBorder] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <SessionProvider>
      <header
        className={
          "relative sticky top-0 z-50 py-2 bg-background/60 backdrop-blur"
        }
      >
        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center container">
            <Link
              href="/"
              title="brand-logo"
              className="relative mr-6 flex items-center space-x-2"
            >
              {Icons.logo}
              <span className="font-bold text-xl">{siteConfig.name}</span>
            </Link>

            <div className="hidden lg:block">
              <div className="flex items-center ">
                <nav className="mr-0">
                  <Menu />
                </nav>
              </div>
            </div>
            <div className="mt-2 cursor-pointer block lg:hidden">
              <Drawer />
            </div>
          </div>

          <div className="flex-row gap-2 hidden sm:flex mr-4">
            {
              user ? (
                <UserNav user={user} className="border rounded-lg border-foreground" />
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Connexion</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline">Inscription</Button>
                  </Link>
                </>
              )
            }
          </div>
        </div>
        <hr
          className={cn(
            "absolute w-full bottom-0 transition-opacity duration-300 ease-in-out",
            addBorder ? "opacity-100" : "opacity-0"
          )}
        />
      </header>
    </SessionProvider>
  );
}