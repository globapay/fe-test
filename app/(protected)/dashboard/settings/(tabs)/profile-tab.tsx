"use client";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import {useState} from "react";

const formSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone: z.string(),
})

export default function ProfileTab() {
    const {user, changeInfo} = useAuth();
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            email: user?.email || "",
            phone: user?.phone || ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true);
            const {first_name, last_name, phone} = values;
            const response: boolean = await changeInfo(first_name, last_name, phone);

            if (response) {
                toast({
                    title: "Profile updated",
                    description: "Profile updated successfully",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Profile not updated",
                });
            }
        } catch (e: any) {
            console.log(e)
            toast({
                title: "Error",
                description: e?.message || "Something went wrong. Please try again later.",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="first_name"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your first name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="last_name"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your last name" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="email"
                                disabled={true}
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>E-mail Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your e-mail address" {...field} />
                                        </FormControl>
                                        <FormDescription className="text-xs text-gray-500">
                                            Your e-mail address is used for login and cannot be changed.
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your phone number" {...field} />
                                        </FormControl>
                                        <Alert className="mt-2 bg-amber-50 text-amber-800 border-amber-200">
                                            <AlertCircle className="h-4 w-4 text-amber-800"/>
                                            <AlertDescription className="text-amber-800">
                                                Changes to phone number require manual approval and may take 1-2
                                                business days.
                                            </AlertDescription>
                                        </Alert>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                            Save Changes
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}