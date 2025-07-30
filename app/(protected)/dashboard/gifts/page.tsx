import GiftIframe from "@/app/(protected)/dashboard/gifts/gift-iframe";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function GiftsPage() {
    return (
        <div className="flex flex-col flex-1 h-full space-y-6">
            <div className="flex items-center gap-4 px-6 pt-6">
                <Link href="/dashboard/settings" className="cursor-pointer">
                    <ArrowLeft />
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Gifts</h1>
            </div>
            <div className="flex-1 min-h-0">
                <GiftIframe />
            </div>
        </div>
    );
}