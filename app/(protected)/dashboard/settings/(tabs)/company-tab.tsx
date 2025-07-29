"use client"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCompany, putCompany} from "@/services/company/companyApi";
import {useAuth} from "@/contexts/auth-context";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ICompany} from "@/types/company";
import { useToast } from "@/hooks/use-toast";
import {caribbeanCurrencies, otherCurrencies, popularCurrencies} from "@/data/currency";
import {countries} from "@/data/countries";

const formInfoSchema = z.object({
    name: z.string(),
    trading_name: z.string(),
    vat_number: z.string(),
    currency: z.string(),
    number_of_locations: z.number(),
})

const formAddressSchema = z.object({
    street_address: z.string(),
    state_address: z.string(),
    zip_code: z.string(),
    country: z.string(),
})

export default function CompanyTab() {
    const {user} = useAuth();
    const {toast} = useToast();
    const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(false);
    const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompany(user?.company_id || ""),
    });
    const mutation = useMutation({
        mutationFn: putCompany,
        onSuccess: (data: ICompany) => {
            if (data?.id) {
                queryClient.setQueryData(['company'], data);
                toast({
                    title: "Company info updated",
                    description: "Company info updated successfully",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Company info not updated",
                });
            }
        },
        onError: (e: Error) => {
            console.log(e);
            toast({
                title: "Error",
                description: e?.message || "Something went wrong. Please try again later.",
            });
        }
    })

    const formInfo = useForm<z.infer<typeof formInfoSchema>>({
        resolver: zodResolver(formInfoSchema),
        defaultValues: {
            name: data?.name || "",
            trading_name: data?.trading_name || "",
            vat_number: data?.vat_number || "",
            currency: data?.currency || "",
            number_of_locations: data?.number_of_locations || 0
        },
    })
    const formAddress = useForm<z.infer<typeof formAddressSchema>>({
        resolver: zodResolver(formAddressSchema),
        defaultValues: {
            street_address: data?.street_address || "",
            state_address: data?.state_address || "",
            zip_code: data?.zip_code || "",
            country: data?.country || "",
        }
    })

    async function onSubmitInfo(values: z.infer<typeof formInfoSchema>) {
        if (data) {
            setIsLoadingInfo(true);
            const updatedData: ICompany = {
                ...data as ICompany,
                ...values,
                number_of_locations: Number(values.number_of_locations),
                updated_at: new Date().toISOString()
            };

            mutation.mutate(updatedData);

            setIsLoadingInfo(false);
        }
    }

    async function onSubmitAddress(values: z.infer<typeof formAddressSchema>) {
        if (data) {
            setIsLoadingAddress(true);
            const updatedData: ICompany = {
                ...data as ICompany,
                ...values,
                updated_at: new Date().toISOString()
            };

            mutation.mutate(updatedData);

            setIsLoadingAddress(false);
        }
    }

    useEffect(() => {
        if (data) {
            formInfo.reset({
                name: data?.name || "",
                trading_name: data?.trading_name || "",
                vat_number: data?.vat_number || "",
                currency: data?.currency || "",
                number_of_locations: data?.number_of_locations || 0
            })

            formAddress.reset({
                street_address: data?.street_address || "",
                state_address: data?.state_address || "",
                zip_code: data?.zip_code || "",
                country: data?.country || "",
            })
        }
    }, [data]);

    if (isLoading && !data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <>
            <Form {...formInfo}>
                <form onSubmit={formInfo.handleSubmit(onSubmitInfo)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Information</CardTitle>
                            <CardDescription>Update your company details</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={formInfo.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Company Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter company name" {...field} />
                                            </FormControl>
                                            <Alert className="mt-2 bg-amber-50 text-amber-800 border-amber-200">
                                                <AlertCircle className="h-4 w-4 text-amber-800"/>
                                                <AlertDescription className="text-amber-800">
                                                    Changes to company name require manual approval and may take 1-2
                                                    business
                                                    days.
                                                </AlertDescription>
                                            </Alert>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formInfo.control}
                                    name="trading_name"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Trading Name (if different)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter trading name" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={formInfo.control}
                                    name="vat_number"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>VAT Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter VAT number" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formInfo.control}
                                    name="currency"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Currency</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={(value: string) => {
                                                    if (value.length) field.onChange(value)
                                                }} value={field.value}>
                                                    <SelectTrigger id="currency">
                                                        <SelectValue placeholder={field.value || "Select currency"}/>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[300px]">
                                                        <SelectGroup>
                                                            <SelectLabel
                                                                className="p-1 text-xs font-medium text-gray-500">Popular
                                                                Currencies</SelectLabel>
                                                            {popularCurrencies.map((currency) => (
                                                                <SelectItem key={currency.value} value={currency.value}>
                                                                    {currency.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                        <SelectGroup>
                                                            <SelectLabel
                                                                className="p-1 text-xs font-medium text-gray-500">Caribbean
                                                                Currencies</SelectLabel>
                                                            {caribbeanCurrencies.map((currency) => (
                                                                <SelectItem key={currency.value} value={currency.value}>
                                                                    {currency.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                        <SelectGroup>
                                                            <SelectLabel
                                                                className="p-1 text-xs font-medium text-gray-500">Other
                                                                Currencies</SelectLabel>
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
                            <FormField
                                control={formInfo.control}
                                name="number_of_locations"
                                render={({field}) => (
                                    <FormItem className="space-y-2">
                                        <FormLabel>Number of Locations</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter number of locations"
                                                type="number"
                                                min={0}
                                                onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Enter the number of physical locations your business operates
                                        </FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-orange-500 hover:bg-orange-600" disabled={isLoadingInfo || !formInfo.formState.isDirty}>
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>

            <Form {...formAddress}>
                <form onSubmit={formAddress.handleSubmit(onSubmitAddress)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Company Address</CardTitle>
                            <CardDescription>Update your company address</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={formAddress.control}
                                    name="street_address"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Street Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter street address" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formAddress.control}
                                    name="state_address"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>State/Province</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter state/province" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <FormField
                                    control={formAddress.control}
                                    name="zip_code"
                                    render={({field}) => (
                                        <FormItem className="space-y-2">
                                            <FormLabel>Postal/ZIP Code</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter postal/zip code" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formAddress.control}
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
                        </CardContent>
                        <CardFooter>
                            <Button className="bg-orange-500 hover:bg-orange-600" disabled={isLoadingAddress || !formAddress.formState.isDirty}>
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </>
    )
}