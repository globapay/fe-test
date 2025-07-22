import GiftIframe from "@/app/dashboard/gifts/gift-iframe";

export default function GiftsPage() {

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Gifts</h1>
            </div>
            <div className="h-full">
                <GiftIframe/>
            </div>
        </div>
    )
}