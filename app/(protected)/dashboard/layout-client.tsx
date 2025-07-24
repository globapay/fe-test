"use client";

import type {ReactNode} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {LogOut, Menu} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/auth-context";
import {LayoutDashboard, Gift} from "lucide-react";
import NavbarLink from "@/components/navbar-link";

const allowedPathname: string[] = ["/dashboard/settings"];

export function DashboardLayoutClient({children}: { children: ReactNode }) {
    const {user, logout, loading} = useAuth();
    const router = useRouter();
    const pathname: string = usePathname();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }
    // if (!user) {
    //   router.push("/login");
    //   return null;
    // }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            {allowedPathname.includes(pathname) && (
                <aside className="hidden w-64 flex-col bg-white shadow-sm md:flex">
                    <div className="flex h-16 items-center border-b px-6">
                        <Link href="/app/(protected)/dashboard/settings" className="flex items-center">
                            <span className="text-xl font-bold text-orange-500">GiftFlow</span>
                        </Link>
                    </div>

                    <nav className="flex flex-1 flex-col p-4">
                        <NavbarLink
                            link="/dashboard/settings"
                            title="Dashboard"
                            icon={<LayoutDashboard/>}
                        />
                        <NavbarLink
                            link="/dashboard/gifts"
                            title="Gift card"
                            icon={<Gift/>}
                        />

                        <div className="mt-auto pt-4">
                            <Button
                                onClick={handleLogout}
                                variant="ghost"
                                className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="mr-2 h-5 w-5"/>
                                Sign out
                            </Button>
                        </div>
                    </nav>
                </aside>
            )}

            {/* Main Content */}
            <div className="flex flex-1 flex-col">
                {/* Header */}
                <header className="flex h-16 items-center justify-between border-b bg-white px-6">
                    <div className="flex items-center md:hidden">
                        <Button variant="ghost" size="icon" className="mr-2">
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                        <span className="text-xl font-bold text-orange-500 md:hidden">
              GiftFlow
            </span>
                    </div>

                    <div className="ml-auto flex items-center gap-4">
                        <div className="text-sm">
                            <div className="font-medium">
                                {user?.first_name} {user?.last_name}
                            </div>
                            <div className="text-gray-500">{user?.email}</div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
                            {user?.first_name[0].toUpperCase()}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
        </div>
    );
}
