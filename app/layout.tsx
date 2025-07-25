import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import {ToastProvider} from "@/components/ui/toast";
import QueryProvider from "@/contexts/query-provider";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Globagift",
  description: "Gift management platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <ToastProvider>
              <QueryProvider>
                {children}
                <ReactQueryDevtools/>
              </QueryProvider>
              <Toaster />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
