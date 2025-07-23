import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function ProfileTab() {

    const mockUser = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={mockUser.firstName} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={mockUser.lastName} />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="email">E-mail Address</Label>
                        <Input id="email" type="email" defaultValue={mockUser.email} disabled />
                        <p className="text-xs text-gray-500">Your e-mail address is used for login and cannot be changed</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue={mockUser.phone} />
                        <Alert className="mt-2 bg-amber-50 text-amber-800 border-amber-200">
                            <AlertCircle className="h-4 w-4 text-amber-800" />
                            <AlertDescription className="text-amber-800">
                                Changes to phone number require manual approval and may take 1-2 business days.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600">Save Changes</Button>
            </CardFooter>
        </Card>
    )
}