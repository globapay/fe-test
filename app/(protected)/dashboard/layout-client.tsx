"use client";

import {ReactNode, useState} from "react";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {LogOut, Menu} from "lucide-react";

import {Button} from "@/components/ui/button";
import {useAuth} from "@/contexts/auth-context";
import {LayoutDashboard, Gift} from "lucide-react";
import NavbarLink from "@/components/navbar-link";
import footerLogo from "@/public/globagift-footer.png";
import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {VisuallyHidden} from "@/components/ui/visually-hidden";

const allowedPathname: string[] = ["/dashboard/settings"];

export function DashboardLayoutClient({children}: { children: ReactNode }) {
    const {user, logout, loading} = useAuth();
    const router = useRouter();
    const pathname: string = usePathname();
    const [isOpenSheet, setIsOpenSheet] = useState<boolean>(false);

    const handleLogout = async () => {
        setIsOpenSheet(false);
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

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Desktop */}
            {allowedPathname.includes(pathname) && (
                <aside className="hidden w-64 flex-col bg-white shadow-sm md:flex">
                    {pathname.includes("/dashboard/settings") && (
                        <div className="flex h-16 items-center border-b px-6">
                            <Link href="/app/(protected)/dashboard/settings" className="flex items-center">
                                <span className="text-xl font-bold text-orange-500">GiftFlow</span>
                            </Link>
                        </div>
                    )}
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
                    {pathname.includes("/dashboard/gifts") && (
                        <div className="hidden md:flex h-16 items-center border-b">
                            <Link href="/app/(protected)/dashboard/settings" className="flex items-center">
                                <span className="text-xl font-bold text-orange-500">GiftFlow</span>
                            </Link>
                        </div>
                    )}
                    <div className="flex items-center md:hidden">
                        <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setIsOpenSheet(true)}>
                                    <Menu className="h-5 w-5"/>
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 h-full flex flex-col">
                                <VisuallyHidden>
                                    <SheetTitle>Toggle menu</SheetTitle>
                                </VisuallyHidden>
                                <div className="flex h-16 items-center border-b px-6">
                                    <Link href="/app/(protected)/dashboard/settings" className="flex items-center">
                                        <span className="text-xl font-bold text-orange-500">GiftFlow</span>
                                    </Link>
                                </div>
                                <nav className="flex flex-1 flex-col p-4 h-full justify-between">
                                    <div className="flex flex-col h-full">
                                        <NavbarLink
                                            link="/dashboard/settings"
                                            title="Dashboard"
                                            icon={<LayoutDashboard/>}
                                            onClick={() => setIsOpenSheet(false)}
                                        />
                                        <NavbarLink
                                            link="/dashboard/gifts"
                                            title="Gift card"
                                            icon={<Gift/>}
                                            onClick={() => setIsOpenSheet(false)}
                                        />
                                    </div>

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
                            </SheetContent>
                        </Sheet>
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

                {/* Footer */}
                <footer className="bg-white p-6">
                    <div className="w-full ">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex gap-4 w-full">
                                <div className="w-fit">
                                    <Link href="/app.globagift.io">
                                        <img alt="Globagift-footer-logo" src={footerLogo.src}
                                             className="aspect-square w-[100px] object-cover"/>
                                    </Link>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm text-gray-500">+353 1 557 2020</p>
                                    <p className="text-sm text-gray-500">hello@globapay.io</p>
                                    <p className="mt-4 text-xs text-gray-400">Copyright © 2025 Globapay Holdings
                                        Ltd.</p>
                                    <p className="text-xs text-gray-400">20 Harcourt Street, Dublin D02 H364,
                                        Ireland</p>
                                </div>
                            </div>
                            <div className="flex space-x-16 w-full md:justify-end">
                                <div className="space-y-2 w-full md:w-fit">
                                    <h3 className="font-semibold text-gray-900">Helpful links</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li><Link href="#" className="hover:underline">Support</Link></li>
                                        <li><Link href="#" className="hover:underline">Community</Link></li>
                                        <li><Link href="#" className="hover:underline">Terms & conditions</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-2 w-full md:w-fit">
                                    <h3 className="font-semibold text-gray-900">Company</h3>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li><Link href="#" className="hover:underline">About us</Link></li>
                                        <li><Link href="#" className="hover:underline">Careers</Link></li>
                                        <li><Link href="#" className="hover:underline">Partnerships</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
