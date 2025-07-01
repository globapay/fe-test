import type React from "react"
import Link from "next/link"
import Image from "next/image"

export default function IframeLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
            {/* Header */}
            <header className="flex items-center justify-between bg-white px-8 py-4 shadow-sm">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-orange-500">GiftFlow</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Already have an account?</span>
                    <Link
                        href="/login"
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Log in
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col flex-grow p-8">
                <div className="w-full flex-grow overflow-hidden rounded-lg bg-white shadow-sm">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white p-8">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="md:col-span-1">
                            <span className="text-2xl font-bold text-orange-500">GiftFlow</span>
                            <p className="mt-4 text-sm text-gray-500">+353 1 557 2020</p>
                            <p className="text-sm text-gray-500">hello@globapay.io</p>
                            <p className="mt-4 text-xs text-gray-400">Copyright © 2025 Globapay Holdings Ltd.</p>
                            <p className="text-xs text-gray-400">20 Harcourt Street, Dublin D02 H364, Ireland</p>
                        </div>
                        <div className="md:col-span-1" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">Helpful links</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="#" className="hover:underline">- Support</Link></li>
                                <li><Link href="#" className="hover:underline">- Community</Link></li>
                                <li><Link href="#" className="hover:underline">- Terms & conditions</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900">Company</h3>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link href="#" className="hover:underline">- About us</Link></li>
                                <li><Link href="#" className="hover:underline">- Careers</Link></li>
                                <li><Link href="#" className="hover:underline">- Partnerships</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
} 