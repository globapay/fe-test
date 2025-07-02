import type React from "react"
import Link from "next/link"
import logo from "@/public/globagift-logo.png"
import footerLogo from "@/public/globagift-footer.png"

export default function IframeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
            {/* Header */}
            <header className="flex items-center justify-between bg-white px-20 py-4 shadow-sm">
                <div className="flex items-center">
                    <Link href="/app.globagift.io">
                        <img alt="Globagift-logo" src={logo.src} className="h-[100px] w-auto" />
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Already have an account?</span>
                    <Link
                        href="/login"
                        className="rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
                    >
                        Log in
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col flex-grow h-1">
                <div className="w-full flex-grow overflow-hidden rounded-lg bg-white shadow-sm">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white p-8 px-20">
                <div className="w-full ">
                    <div className="flex justify-between items-start">
                        <div className="flex">
                            <div>
                                <Link href="/app.globagift.io">
                                    <img alt="Globagift-footer-logo" src={footerLogo.src} className="h-[100px] w-auto" />
                                </Link>
                            </div>
                            <div >
                                <p className="text-sm text-gray-500">+353 1 557 2020</p>
                                <p className="text-sm text-gray-500">hello@globapay.io</p>
                                <p className="mt-4 text-xs text-gray-400">Copyright © 2025 Globapay Holdings Ltd.</p>
                                <p className="text-xs text-gray-400">20 Harcourt Street, Dublin D02 H364, Ireland</p>
                            </div>
                        </div>
                        <div className="flex space-x-16">
                            <div className="space-y-2">
                                <h3 className="font-semibold text-gray-900">Helpful links</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    <li><Link href="#" className="hover:underline">Support</Link></li>
                                    <li><Link href="#" className="hover:underline">Community</Link></li>
                                    <li><Link href="#" className="hover:underline">Terms & conditions</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-2">
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
    )
} 