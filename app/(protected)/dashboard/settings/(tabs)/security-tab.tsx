import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Switch} from "@/components/ui/switch";

export default function SecurityTab() {

    return (
        <>
            {/* First row - side by side cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Change Password Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password"/>
                        </div>
                        <div className="rounded-md bg-blue-50 p-3 text-sm text-blue-800">
                            <p className="font-medium">Password requirements:</p>
                            <ul className="mt-1 list-disc pl-5 space-y-1">
                                <li>Minimum 10 characters in length</li>
                                <li>Must include uppercase and lowercase letters</li>
                                <li>Must include at least one number or special character</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-orange-500 hover:bg-orange-600">Update Password</Button>
                    </CardFooter>
                </Card>

                {/* Email Notifications Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>E-mail Notifications</CardTitle>
                        <CardDescription>Manage your e-mail notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Security Alerts</p>
                                <p className="text-sm text-gray-500">Receive notifications about security events</p>
                            </div>
                            <Switch defaultChecked/>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="font-medium">Marketing Updates</p>
                                <p className="text-sm text-gray-500">Receive marketing updates and newsletters</p>
                            </div>
                            <Switch/>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-orange-500 hover:bg-orange-600">Save Preferences</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Two-Factor Authentication Card - Full Width */}
            <Card>
                <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Your account is protected with mandatory two-factor
                        authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">E-mail Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Verification code via e-mail is required for all
                                logins</p>
                        </div>
                        <div
                            className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600">Enabled
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Authenticator App (Optional)</p>
                            <p className="text-sm text-gray-500">Add an authenticator app as an additional security
                                option</p>
                        </div>
                        <Button variant="outline">Set Up</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Sessions Card - Full Width */}
            <Card>
                <CardHeader>
                    <CardTitle>Sessions</CardTitle>
                    <CardDescription>Manage your active sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-md border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-gray-500">{new Date().toLocaleDateString()}</p>
                            </div>
                            <div
                                className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">Active
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="text-red-500 hover:text-red-600">
                        Sign Out All Other Sessions
                    </Button>
                </CardContent>
            </Card>
        </>
    )
}