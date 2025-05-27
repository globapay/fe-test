"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RegisterSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-orange-500">GiftFlow</span>
        </div>
      </header>

      <div className="mx-auto mt-16 w-full max-w-md px-4 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          Account created!
        </h1>
        <p className="mt-4 text-base text-gray-600">
          Please check your email for a verification link to complete your
          registration.
        </p>

        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            <p>
              <strong>Not seeing the email?</strong>
            </p>
            <ul className="list-disc pl-5 mt-2 text-left">
              <li>Check your spam or junk folder</li>
              <li>Contact support if you need assistance</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="mt-6">
          <Link href="/login">
            <Button className="w-full rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Go to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
