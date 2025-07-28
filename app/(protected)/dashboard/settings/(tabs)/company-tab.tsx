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
import {useQuery} from "@tanstack/react-query";
import {getCompany, putCompany} from "@/services/company/companyApi";
import {useAuth} from "@/contexts/auth-context";
import React, {ChangeEvent, useEffect, useState} from "react";
import {ICompany} from "@/types/company";
import { useToast } from "@/hooks/use-toast";

// Currency data
const popularCurrencies = [
    {value: "USD", label: "US Dollar (USD)"},
    {value: "EUR", label: "Euro (EUR)"},
    {value: "GBP", label: "British Pound (GBP)"},
    {value: "JPY", label: "Japanese Yen (JPY)"},
    {value: "CAD", label: "Canadian Dollar (CAD)"},
    {value: "AUD", label: "Australian Dollar (AUD)"},
    {value: "CHF", label: "Swiss Franc (CHF)"},
    {value: "CNY", label: "Chinese Yuan (CNY)"},
    {value: "HKD", label: "Hong Kong Dollar (HKD)"},
    {value: "SGD", label: "Singapore Dollar (SGD)"},
]

const caribbeanCurrencies = [
    {value: "BBD", label: "Barbados Dollar (BBD)"},
    {value: "BSD", label: "Bahamian Dollar (BSD)"},
    {value: "DOP", label: "Dominican Peso (DOP)"},
    {value: "JMD", label: "Jamaican Dollar (JMD)"},
    {value: "TTD", label: "Trinidad and Tobago Dollar (TTD)"},
    {value: "XCD", label: "East Caribbean Dollar (XCD)"},
    {value: "HTG", label: "Haitian Gourde (HTG)"},
    {value: "CUP", label: "Cuban Peso (CUP)"},
]

const otherCurrencies = [
    {value: "AED", label: "UAE Dirham (AED)"},
    {value: "AFN", label: "Afghan Afghani (AFN)"},
    {value: "ALL", label: "Albanian Lek (ALL)"},
    {value: "AMD", label: "Armenian Dram (AMD)"},
    {value: "ANG", label: "Netherlands Antillean Guilder (ANG)"},
    {value: "AOA", label: "Angolan Kwanza (AOA)"},
    {value: "ARS", label: "Argentine Peso (ARS)"},
    {value: "AWG", label: "Aruban Florin (AWG)"},
    {value: "AZN", label: "Azerbaijani Manat (AZN)"},
    {value: "BAM", label: "Bosnia-Herzegovina Convertible Mark (BAM)"},
    {value: "BDT", label: "Bangladeshi Taka (BDT)"},
    {value: "BGN", label: "Bulgarian Lev (BGN)"},
    {value: "BHD", label: "Bahraini Dinar (BHD)"},
    {value: "BIF", label: "Burundian Franc (BIF)"},
    {value: "BMD", label: "Bermudan Dollar (BMD)"},
    {value: "BND", label: "Brunei Dollar (BND)"},
    {value: "BOB", label: "Bolivian Boliviano (BOB)"},
    {value: "BRL", label: "Brazilian Real (BRL)"},
    {value: "BTN", label: "Bhutanese Ngultrum (BTN)"},
    {value: "BWP", label: "Botswanan Pula (BWP)"},
    {value: "BYN", label: "Belarusian Ruble (BYN)"},
    {value: "BZD", label: "Belize Dollar (BZD)"},
    {value: "CDF", label: "Congolese Franc (CDF)"},
    {value: "CLP", label: "Chilean Peso (CLP)"},
    {value: "COP", label: "Colombian Peso (COP)"},
    {value: "CRC", label: "Costa Rican Colón (CRC)"},
    {value: "CVE", label: "Cape Verdean Escudo (CVE)"},
    {value: "CZK", label: "Czech Republic Koruna (CZK)"},
    {value: "DJF", label: "Djiboutian Franc (DJF)"},
    {value: "DKK", label: "Danish Krone (DKK)"},
    {value: "DZD", label: "Algerian Dinar (DZD)"},
    {value: "EGP", label: "Egyptian Pound (EGP)"},
    {value: "ERN", label: "Eritrean Nakfa (ERN)"},
    {value: "ETB", label: "Ethiopian Birr (ETB)"},
    {value: "FJD", label: "Fijian Dollar (FJD)"},
    {value: "GEL", label: "Georgian Lari (GEL)"},
    {value: "GHS", label: "Ghanaian Cedi (GHS)"},
    {value: "GMD", label: "Gambian Dalasi (GMD)"},
    {value: "GNF", label: "Guinean Franc (GNF)"},
    {value: "GTQ", label: "Guatemalan Quetzal (GTQ)"},
    {value: "GYD", label: "Guyanaese Dollar (GYD)"},
    {value: "HNL", label: "Honduran Lempira (HNL)"},
    {value: "HRK", label: "Croatian Kuna (HRK)"},
    {value: "HUF", label: "Hungarian Forint (HUF)"},
    {value: "IDR", label: "Indonesian Rupiah (IDR)"},
    {value: "ILS", label: "Israeli New Shekel (ILS)"},
    {value: "INR", label: "Indian Rupee (INR)"},
    {value: "IQD", label: "Iraqi Dinar (IQD)"},
    {value: "IRR", label: "Iranian Rial (IRR)"},
    {value: "ISK", label: "Icelandic Króna (ISK)"},
    {value: "JOD", label: "Jordanian Dinar (JOD)"},
    {value: "KES", label: "Kenyan Shilling (KES)"},
    {value: "KGS", label: "Kyrgystani Som (KGS)"},
    {value: "KHR", label: "Cambodian Riel (KHR)"},
    {value: "KMF", label: "Comorian Franc (KMF)"},
    {value: "KRW", label: "South Korean Won (KRW)"},
    {value: "KWD", label: "Kuwaiti Dinar (KWD)"},
    {value: "KZT", label: "Kazakhstani Tenge (KZT)"},
    {value: "LAK", label: "Laotian Kip (LAK)"},
    {value: "LBP", label: "Lebanese Pound (LBP)"},
    {value: "LKR", label: "Sri Lankan Rupee (LKR)"},
    {value: "LRD", label: "Liberian Dollar (LRD)"},
    {value: "LSL", label: "Lesotho Loti (LSL)"},
    {value: "LYD", label: "Libyan Dinar (LYD)"},
    {value: "MAD", label: "Moroccan Dirham (MAD)"},
    {value: "MDL", label: "Moldovan Leu (MDL)"},
    {value: "MGA", label: "Malagasy Ariary (MGA)"},
    {value: "MKD", label: "Macedonian Denar (MKD)"},
    {value: "MMK", label: "Myanmar Kyat (MMK)"},
    {value: "MNT", label: "Mongolian Tugrik (MNT)"},
    {value: "MOP", label: "Macanese Pataca (MOP)"},
    {value: "MRU", label: "Mauritanian Ouguiya (MRU)"},
    {value: "MUR", label: "Mauritian Rupee (MUR)"},
    {value: "MVR", label: "Maldivian Rufiyaa (MVR)"},
    {value: "MWK", label: "Malawian Kwacha (MWK)"},
    {value: "MXN", label: "Mexican Peso (MXN)"},
    {value: "MYR", label: "Malaysian Ringgit (MYR)"},
    {value: "MZN", label: "Mozambican Metical (MZN)"},
    {value: "NAD", label: "Namibian Dollar (NAD)"},
    {value: "NGN", label: "Nigerian Naira (NGN)"},
    {value: "NIO", label: "Nicaraguan Córdoba (NIO)"},
    {value: "NOK", label: "Norwegian Krone (NOK)"},
    {value: "NPR", label: "Nepalese Rupee (NPR)"},
    {value: "NZD", label: "New Zealand Dollar (NZD)"},
    {value: "OMR", label: "Omani Rial (OMR)"},
    {value: "PAB", label: "Panamanian Balboa (PAB)"},
    {value: "PEN", label: "Peruvian Nuevo Sol (PEN)"},
    {value: "PGK", label: "Papua New Guinean Kina (PGK)"},
    {value: "PHP", label: "Philippine Peso (PHP)"},
    {value: "PKR", label: "Pakistani Rupee (PKR)"},
    {value: "PLN", label: "Polish Zloty (PLN)"},
    {value: "PYG", label: "Paraguayan Guarani (PYG)"},
    {value: "QAR", label: "Qatari Rial (QAR)"},
    {value: "RON", label: "Romanian Leu (RON)"},
    {value: "RSD", label: "Serbian Dinar (RSD)"},
    {value: "RUB", label: "Russian Ruble (RUB)"},
    {value: "RWF", label: "Rwandan Franc (RWF)"},
    {value: "SAR", label: "Saudi Riyal (SAR)"},
    {value: "SBD", label: "Solomon Islands Dollar (SBD)"},
    {value: "SCR", label: "Seychellois Rupee (SCR)"},
    {value: "SDG", label: "Sudanese Pound (SDG)"},
    {value: "SEK", label: "Swedish Krona (SEK)"},
    {value: "SLL", label: "Sierra Leonean Leone (SLL)"},
    {value: "SOS", label: "Somali Shilling (SOS)"},
    {value: "SRD", label: "Surinamese Dollar (SRD)"},
    {value: "SSP", label: "South Sudanese Pound (SSP)"},
    {value: "STN", label: "São Tomé and Príncipe Dobra (STN)"},
    {value: "SYP", label: "Syrian Pound (SYP)"},
    {value: "SZL", label: "Swazi Lilangeni (SZL)"},
    {value: "THB", label: "Thai Baht (THB)"},
    {value: "TJS", label: "Tajikistani Somoni (TJS)"},
    {value: "TMT", label: "Turkmenistani Manat (TMT)"},
    {value: "TND", label: "Tunisian Dinar (TND)"},
    {value: "TOP", label: "Tongan Pa'anga (TOP)"},
    {value: "TRY", label: "Turkish Lira (TRY)"},
    {value: "TWD", label: "New Taiwan Dollar (TWD)"},
    {value: "TZS", label: "Tanzanian Shilling (TZS)"},
    {value: "UAH", label: "Ukrainian Hryvnia (UAH)"},
    {value: "UGX", label: "Ugandan Shilling (UGX)"},
    {value: "UYU", label: "Uruguayan Peso (UYU)"},
    {value: "UZS", label: "Uzbekistan Som (UZS)"},
    {value: "VES", label: "Venezuelan Bolívar (VES)"},
    {value: "VND", label: "Vietnamese Dong (VND)"},
    {value: "VUV", label: "Vanuatu Vatu (VUV)"},
    {value: "WST", label: "Samoan Tala (WST)"},
    {value: "XAF", label: "CFA Franc BEAC (XAF)"},
    {value: "XOF", label: "CFA Franc BCEAO (XOF)"},
    {value: "XPF", label: "CFP Franc (XPF)"},
    {value: "YER", label: "Yemeni Rial (YER)"},
    {value: "ZAR", label: "South African Rand (ZAR)"},
    {value: "ZMW", label: "Zambian Kwacha (ZMW)"},
    {value: "ZWL", label: "Zimbabwean Dollar (ZWL)"},
]

const countries = [
    { title: "Argentina", code: "AR" },
    { title: "Australia", code: "AU" },
    { title: "Austria", code: "AT" },
    { title: "Belgium", code: "BE" },
    { title: "Brazil", code: "BR" },
    { title: "Bulgaria", code: "BG" },
    { title: "Canada", code: "CA" },
    { title: "Chile", code: "CL" },
    { title: "China", code: "CN" },
    { title: "Croatia", code: "HR" },
    { title: "Cyprus", code: "CY" },
    { title: "Czech Republic", code: "CZ" },
    { title: "Denmark", code: "DK" },
    { title: "Egypt", code: "EG" },
    { title: "Estonia", code: "EE" },
    { title: "Finland", code: "FI" },
    { title: "France", code: "FR" },
    { title: "Germany", code: "DE" },
    { title: "Greece", code: "GR" },
    { title: "Hungary", code: "HU" },
    { title: "Iceland", code: "IS" },
    { title: "India", code: "IN" },
    { title: "Ireland", code: "IE" },
    { title: "Israel", code: "IL" },
    { title: "Italy", code: "IT" },
    { title: "Japan", code: "JP" },
    { title: "Latvia", code: "LV" },
    { title: "Lithuania", code: "LT" },
    { title: "Luxembourg", code: "LU" },
    { title: "Malta", code: "MT" },
    { title: "Mexico", code: "MX" },
    { title: "Netherlands", code: "NL" },
    { title: "New Zealand", code: "NZ" },
    { title: "Norway", code: "NO" },
    { title: "Poland", code: "PL" },
    { title: "Portugal", code: "PT" },
    { title: "Romania", code: "RO" },
    { title: "Russia", code: "RU" },
    { title: "Saudi Arabia", code: "SA" },
    { title: "Singapore", code: "SG" },
    { title: "Slovakia", code: "SK" },
    { title: "Slovenia", code: "SI" },
    { title: "South Africa", code: "ZA" },
    { title: "South Korea", code: "KR" },
    { title: "Spain", code: "ES" },
    { title: "Sweden", code: "SE" },
    { title: "Switzerland", code: "CH" },
    { title: "Turkey", code: "TR" },
    { title: "United Arab Emirates", code: "AE" },
    { title: "United Kingdom", code: "GB" },
    { title: "United States", code: "US" }
].sort((a, b) => a.title.localeCompare(b.title));

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

    const {data, isLoading} = useQuery({
        queryKey: ['company'],
        queryFn: () => getCompany(user?.company_id || ""),
    });

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
            try {
                setIsLoadingInfo(true);
                const updatedData: ICompany = {
                    ...data as ICompany,
                    ...values,
                    number_of_locations: Number(values.number_of_locations),
                    updated_at: new Date().toISOString()
                };

                const response: ICompany = await putCompany(updatedData);

                if (response?.id) {
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
            } catch (e: any) {
                console.log(e);
                toast({
                    title: "Error",
                    description: e?.message || "Something went wrong. Please try again later.",
                });
            } finally {
                setIsLoadingInfo(false);
            }
        }
    }

    async function onSubmitAddress(values: z.infer<typeof formAddressSchema>) {
        if (data) {
            try {
                setIsLoadingAddress(true);
                const updatedData: ICompany = {
                    ...data as ICompany,
                    ...values,
                    updated_at: new Date().toISOString()
                };

                const response: ICompany = await putCompany(updatedData);

                if (response?.id) {
                    toast({
                        title: "Company address updated",
                        description: "Company address updated successfully",
                    });
                } else {
                    toast({
                        title: "Error",
                        description: "Company address not updated",
                    });
                }
            } catch (e: any) {
                console.log(e);
                toast({
                    title: "Error",
                    description: e?.message || "Something went wrong. Please try again later.",
                });
            } finally {
                setIsLoadingAddress(false);
            }
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
                            <Button className="bg-orange-500 hover:bg-orange-600" disabled={isLoadingInfo}>
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
                            <Button className="bg-orange-500 hover:bg-orange-600" disabled={isLoadingAddress}>
                                Save Changes
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </>
    )
}