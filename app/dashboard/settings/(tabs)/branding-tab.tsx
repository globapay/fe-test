import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Palette} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function BrandingTab() {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>
                    Upload your company logo for use on gift cards and customer communications
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div
                        className="flex h-40 w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                        <div className="text-center">
                            <Palette className="mx-auto h-10 w-10 text-gray-400"/>
                            <div className="mt-2">
                                <label
                                    htmlFor="file-upload"
                                    className="cursor-pointer rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
                                >
                                    <span>Upload logo</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        accept=".jpg,.jpeg,.png,.pdf,.gg"
                                    />
                                </label>
                            </div>
                            <p className="mt-2 text-xs text-gray-500">JPG, PNG, PDF, GG up to 1,012 MB</p>
                        </div>
                    </div>
                    <div className="text-sm text-gray-500">
                        <p>Your logo will appear on:</p>
                        <ul className="ml-5 mt-1 list-disc">
                            <li>Digital gift cards</li>
                            <li>Customer receipts</li>
                            <li>E-mail communications</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </CardFooter>
        </Card>
    )
}