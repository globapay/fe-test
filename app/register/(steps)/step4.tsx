"use client";

import React, {useState} from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Check, X, EyeOff, Eye} from "lucide-react";
import {Checkbox} from "@/components/ui/checkbox";

export default function Step4() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const form = useFormContext();

    const password = useWatch({control: form.control, name: "password"});

    const hasMinLength: boolean = password?.length >= 10;
    const hasUppercase: boolean = /[A-Z]/.test(password || "");
    const hasDigit: boolean = /\d/.test(password || "");

    return (
        <div className="rounded-lg bg-white py-8">
            <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>

            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                    className="pr-10"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>

            <div className="mt-3 space-y-2 text-sm">
                <p className="font-medium text-gray-700">Your password must:</p>

                <div className="flex items-center gap-2">
                    {hasMinLength ? (
                        <Check className="h-4 w-4 text-green-500"/>
                    ) : (
                        <X className="h-4 w-4 text-gray-400"/>
                    )}
                    <span className={hasMinLength ? "text-green-600" : "text-gray-600"}>
                      Be at least 10 characters long
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {hasUppercase ? (
                        <Check className="h-4 w-4 text-green-500"/>
                    ) : (
                        <X className="h-4 w-4 text-gray-400"/>
                    )}
                    <span className={hasUppercase ? "text-green-600" : "text-gray-600"}>
                      Include at least one uppercase letter
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {hasDigit ? (
                        <Check className="h-4 w-4 text-green-500"/>
                    ) : (
                        <X className="h-4 w-4 text-gray-400"/>
                    )}
                    <span className={hasDigit ? "text-green-600" : "text-gray-600"}>
                      Include at least one digit
                    </span>
                </div>
            </div>


            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="password_confirm"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>

            <div className="mt-6 flex items-center">
                <FormField
                    control={form.control}
                    name="agree_terms"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Checkbox
                                    onCheckedChange={() => field.onChange(!field.value)}
                                    className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    {...field}
                                />
                            </FormControl>
                            <span className="pl-2">I agree to the{" "}
                                <a href="#" className="text-orange-600 hover:text-orange-500">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-orange-600 hover:text-orange-500">
                                    Privacy Policy
                                </a></span>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}