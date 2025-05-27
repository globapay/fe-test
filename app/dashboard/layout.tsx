"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { LogOut, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/hooks/use-auth"

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user, logout } = useAuth()

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 flex-col bg-white shadow-sm md:flex">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard/settings" className="flex items-center">
              <span className="text-xl font-bold text-orange-500">GiftFlow</span>
            </Link>
          </div>

          <nav className="flex flex-1 flex-col p-4">
            <div className="space-y-1">
              <Link href="/dashboard/settings">
                <Button variant="ghost" className="w-full justify-start bg-orange-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-5 w-5"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 9h6v6H9z" />
                    <path d="M9 3v6" />
                    <path d="M15 3v6" />
                    <path d="M9 15v6" />
                    <path d="M15 15v6" />
                    <path d="M3 9h6" />
                    <path d="M3 15h6" />
                    <path d="M15 3h6" />
                    <path d="M15 9h6" />
                    <path d="M15 15h6" />
                  </svg>
                  Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-auto pt-4">
              <Button
                onClick={logout}
                variant="ghost"
                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign out
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b bg-white px-6">
            <div className="flex items-center md:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
              <span className="text-xl font-bold text-orange-500 md:hidden">GiftFlow</span>
            </div>

            <div className="ml-auto flex items-center gap-4">
              <div className="text-sm">
                <div className="font-medium">{user?.first_name || user?.email}</div>
                <div className="text-gray-500">{user?.email}</div>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                {user?.first_name ? user.first_name[0].toUpperCase() : user?.email?.[0].toUpperCase()}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
