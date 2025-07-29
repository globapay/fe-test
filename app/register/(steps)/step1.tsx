"use client";

import type React from "react";
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Mail, User, Phone} from "lucide-react";

export default function Step1() {
    const form = useFormContext();


    return (
        <div className="rounded-lg bg-white py-8">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="first_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<User className="h-5 w-5 text-gray-400"/>}
                                    placeholder="John"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="last_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<User className="h-5 w-5 text-gray-400"/>}
                                    placeholder="Doe"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Mail className="h-5 w-5 text-gray-400"/>}
                                    placeholder="john.doe@company.com"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Phone className="h-5 w-5 text-gray-400"/>}
                                    placeholder="+1 (555) 123-4567"
                                    title="Please enter a valid phone number (only numbers, spaces, +, -, and parentheses are allowed)"
                                    pattern="[0-9+\s$$$$-]+"
                                    type="tel"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}