"use client";

import React, {useState} from "react";
import {useFormContext} from "react-hook-form";
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Mail, User, Phone, Building2, Receipt} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {caribbeanCurrencies, otherCurrencies, popularCurrencies} from "@/data/currency";
import ImageUploadCropped from "@/components/image-upload";

export default function Step2() {
    const form = useFormContext();
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    const handleGetCroppedImage = (croppedImg: string | null) => {
        setCroppedImage(croppedImg);
    }

    return (
        <div className="rounded-lg bg-white py-8">
            <h2 className="text-xl font-semibold text-gray-800">Company Information</h2>

            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Company Name (Legal Entity)</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Building2 className="h-5 w-5 text-gray-400" />}
                                    placeholder="Acme Inc."
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
                    name="trading_name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Trading Name (if different)</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Building2 className="h-5 w-5 text-gray-400" />}
                                    placeholder="Acme Trading Ltd."
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
                    name="vat_number"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Tax/VAT Number</FormLabel>
                            <FormControl>
                                <Input
                                    icon={<Receipt className="h-5 w-5 text-gray-400" />}
                                    placeholder="GB123456789"
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
                    name="currency"
                    render={({field}) => (
                        <FormItem className="space-y-2">
                            <FormLabel>Currency</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} {...field}>
                                    <SelectTrigger id="currency">
                                        <SelectValue placeholder={field.value || "Select currency"}/>
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[300px]">
                                        <SelectGroup>
                                            <SelectLabel className="p-1 text-xs font-medium text-gray-500">
                                                Popular Currencies
                                            </SelectLabel>
                                            {popularCurrencies.map((currency) => (
                                                <SelectItem key={currency.value} value={currency.value}>
                                                    {currency.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel className="p-1 text-xs font-medium text-gray-500">
                                                Caribbean Currencies
                                            </SelectLabel>
                                            {caribbeanCurrencies.map((currency) => (
                                                <SelectItem key={currency.value} value={currency.value}>
                                                    {currency.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                        <SelectGroup>
                                            <SelectLabel className="p-1 text-xs font-medium text-gray-500">
                                                Other Currencies
                                            </SelectLabel>
                                            {otherCurrencies.map((currency) => (
                                                <SelectItem key={currency.value} value={currency.value}>
                                                    {currency.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-6">
                <FormField
                    control={form.control}
                    name="number_of_locations"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Number of Locations</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter number of locations"
                                    type="number"
                                    min={0}
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormDescription>
                                Enter the number of physical locations your business operates
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-6">
                <ImageUploadCropped
                    image={croppedImage}
                    getCroppedImage={(value: string | null) => handleGetCroppedImage(value)}
                />
            </div>
        </div>
    )
}