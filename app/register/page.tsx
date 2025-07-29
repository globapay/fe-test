"use client"

import type React from "react"

import {useState} from "react"
import Link from "next/link"
import {ArrowRight, ArrowLeft} from "lucide-react"

import {Button} from "@/components/ui/button"
import ProgressBar from "@/components/progress-bar"
import logo from "@/public/globagift-logo.png"
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import Step1 from "@/app/register/(steps)/step1";
import {Form} from "@/components/ui/form";
import Step2 from "@/app/register/(steps)/step2";
import Step3 from "@/app/register/(steps)/step3";
import Step4 from "@/app/register/(steps)/step4";
import {authMerchantRegister} from "@/services/auth/authApi";
import {useToast} from "@/hooks/use-toast";
import {useAuth} from "@/contexts/auth-context";
import {useRouter} from "next/navigation";

const form1Schema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string()
        .min(1, "Email is required")
        .email("Invalid email address"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .regex(/^[0-9+\-()\s]+$/, "Invalid phone number format"),
});

const form2Schema = z.object({
    name: z.string().min(1, "Company name is required"),
    trading_name: z.string().min(1, "Trading name is required"),
    vat_number: z.string().min(1, "VAT number is required"),
    currency: z.string().min(1, "Currency is required"),
    number_of_locations: z.string().min(1, "Must have at least one location"),
})

const form3Schema = z.object({
    street_address: z.string().min(1, "Street address is required"),
    state_address: z.string().min(1, "State is required"),
    zip_code: z.string()
        .min(4, "ZIP code must be at least 4 characters")
        .max(10, "ZIP code too long"),
    country: z.string().min(1, "Country is required"),
})

const form4Schema = z
    .object({
        password: z
            .string()
            .min(10, "Password must be at least 10 characters long")
            .regex(/[A-Z]/, "Password must include at least one uppercase letter")
            .regex(/\d/, "Password must include at least one digit"),
        password_confirm: z.string().min(1, "Please confirm your password"),
        agree_terms: z
            .boolean()
            .refine((val) => val, { message: "You must agree to the terms" }),
    })
    .superRefine((data, ctx) => {
        const isPasswordValid =
            data.password.length >= 10 &&
            /[A-Z]/.test(data.password) &&
            /\d/.test(data.password);

        // Якщо пароль валідний і підтвердження заповнене, але не збігаються — помилка
        if (
            isPasswordValid &&
            data.password_confirm.length > 0 &&
            data.password !== data.password_confirm
        ) {
            ctx.addIssue({
                code: "custom",
                message: "Passwords do not match",
                path: ["password_confirm"],
            });
        }
    });

const stepSchemas = [form1Schema, form2Schema, form3Schema, form4Schema];

type FormData = z.infer<typeof form1Schema> &
    z.infer<typeof form2Schema> &
    z.infer<typeof form3Schema> &
    z.infer<typeof form4Schema>;


export default function RegisterPage() {
    const [step, setStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const {toast} = useToast();
    const {login} = useAuth();

    const currentSchema = stepSchemas[step];

    const form = useForm<FormData>({
        resolver: zodResolver(currentSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirm: "",
            phone: "",
            name: "",
            trading_name: "",
            vat_number: "",
            currency: "",
            number_of_locations: "",
            street_address: "",
            state_address: "",
            zip_code: "",
            country: "",
            agree_terms: false,
        },
        mode: "onBlur",
    });


    const steps = [<Step1/>, <Step2/>, <Step3/>, <Step4/>];

    const handleNext = async () => {
        const valid: boolean = await form.trigger();

        if (valid) {
            setStep((prevStep: number) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setStep((prevStep: number) => prevStep - 1);
    };

    const handleSubmit = async (values: FormData) => {
        setIsLoading(true);
        const registrationData = form.getValues();

        const registerPayload = {
            merchant: {
                first_name: registrationData.first_name,
                last_name: registrationData.last_name,
                email: registrationData.email,
                password: registrationData.password,
                phone: registrationData.phone || "",
            },
            company: {
                name: registrationData.name,
                trading_name: registrationData.trading_name,
                vat_number: registrationData.vat_number,
                currency: registrationData.currency,
                number_of_locations: parseInt(registrationData.number_of_locations || "0"),
                street_address: registrationData.street_address,
                state_address: registrationData.state_address,
                zip_code: registrationData.zip_code,
                country: registrationData.country,
            },
        };

        try {
            const response = await authMerchantRegister(registerPayload);

            if (!response?.status) {
                throw new Error(response.detail || "Registration failed");
            }

            if (response?.status === "created") {
                toast({
                    title: "Registration successful",
                    description: "Please check your email to verify your account",
                });

                // Clear registration data from localStorage
                localStorage.removeItem("registrationData");
                await login(registrationData.email, registrationData.password);
                // Redirect to success page
                router.push("/dashboard/settings");
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
            {/* Header */}
            <header className="flex items-center justify-between px-8 py-6">
                <div className="flex items-center">
                    <img alt="Globagift-logo" src={logo.src} className="h-[100px] w-auto"/>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Already have an account?</span>
                    <Link
                        href="/login"
                        className="rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
                    >
                        Log in
                    </Link>
                </div>
            </header>

            {/* Progress Steps */}
            <div className="relative mx-auto mt-8 w-full max-w-3xl px-4">
                <ProgressBar currentStep={step + 1} totalSteps={4}/>
            </div>

            {/* Main Form */}
            <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
                <div className="rounded-lg bg-white p-8 shadow-sm">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
                        <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">
                            Step {step + 1} of 4
                        </div>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)}>
                            {steps[step]}

                            <div className="mt-8 flex justify-between overflow-visible">
                                {step !== 0 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleBack}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 rounded-md border-orange-500 px-6 py-2 text-orange-500 hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    >
                                        <ArrowLeft className="h-4 w-4"/>
                                        Back
                                    </Button>
                                )}
                                {(step === steps.length - 1) ? (
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    >
                                        Register
                                        <ArrowRight className="h-4 w-4"/>
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={handleNext}
                                        disabled={isLoading}
                                        className="flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                    >
                                        Next
                                        <ArrowRight className="h-4 w-4"/>
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    )
}
