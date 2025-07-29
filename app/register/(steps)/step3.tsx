"use client";

import type React from "react";
import {useFormContext} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Mail, User, Phone, Building, MapPin} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {countries} from "@/data/countries";

export default function Step3() {
    const form = useFormContext();


    return (
        <div className="rounded-lg bg-white py-8">
            <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>

            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="street_address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Building className="h-5 w-5 text-gray-400" />}
                                    placeholder="123 Business Street"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                        City/Town <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <Input
                            id="city"
                            name="city"
                            type="text"
                            required
                            className=" w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                            placeholder="London"
                        />
                    </div>
                </div>
                <FormField
                    control={form.control}
                    name="state_address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Greater London"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="zip_code"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Postal/ZIP Code</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="SW1A 1AA"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({field}) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Select onValueChange={(value: string) => {
                                    if (value.length) field.onChange(value)
                                }} value={field.value}>
                                    <SelectTrigger id="country">
                                        <SelectValue placeholder="Select country"/>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        {countries.map((country, id) => (
                                            <SelectItem key={id} value={country.code}>
                                                {country.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    )
}