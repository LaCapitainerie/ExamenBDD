import { TailwindIndicator } from "@/components/other/tailwind-indicator";
import { ThemeProvider } from "@/components/other/theme-provider";
import { ThemeToggle } from "@/components/other/theme-toggle";
import { cn, constructMetadata } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/sections/header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";
import Footer from "@/components/sections/footer";
import { Providers } from "./providers";

export const metadata: Metadata = constructMetadata({});

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased w-full mx-auto scroll-smooth"
        )}
      >
        <Providers>
          {children}
          <TailwindIndicator />
        </Providers>

        <Footer />
      </body>
    </html>
  );
}
