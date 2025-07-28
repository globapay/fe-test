"use client";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getCompany, putCompany} from "@/services/company/companyApi";
import {useAuth} from "@/contexts/auth-context";
import React, {useState} from "react";
import ImageUploadCropped from "@/components/image-upload";
import {ICompany} from "@/types/company";
import {useToast} from "@/hooks/use-toast";

export default function BrandingTab() {
    const {user} = useAuth();
    const {toast} = useToast();

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
                    title: "Company logo updated",
                    description: "Company logo updated successfully",
                });
            } else {
                toast({
                    title: "Error",
                    description: "Company logo not updated",
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

    const [croppedImage, setCroppedImage] = useState<string | null>(data?.logo || null);

    const handleGetCroppedImage = (croppedImg: string) => {
        setCroppedImage(croppedImg);
    }

    const onSubmit = async () => {
        const updatedData: ICompany = {
            ...data as ICompany,
            logo: croppedImage
        };
        mutation.mutate(updatedData)
    }

    if (isLoading && !data) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>
                    Upload your company logo for use on gift cards and customer communications
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col gap-4">
                    <ImageUploadCropped image={croppedImage} getCroppedImage={(value: string) => handleGetCroppedImage(value)} />

                    <div className="text-sm text-gray-500">
                        <p>Your logo will appear on:</p>
                        <ul className="ml-5 mt-1 list-disc">
                            <li>Digital gift cards</li>
                            <li>Customer receipts</li>
                            <li>E-mail communications</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="bg-orange-500 hover:bg-orange-600" disabled={data?.logo === croppedImage} onClick={onSubmit}>
                    Save Changes
                </Button>
            </CardFooter>
        </Card>
    )
}