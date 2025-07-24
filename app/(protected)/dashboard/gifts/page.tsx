import GiftIframe from "@/app/(protected)/dashboard/gifts/gift-iframe";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

export default function GiftsPage() {

    return (
        <div className="space-y-6 h-full">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/settings" className="cursor-pointer">
                    <ArrowLeft/>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Gifts</h1>
            </div>
            <div className="h-full">
                <GiftIframe/>
            </div>
        </div>
    )
}