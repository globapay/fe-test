"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle, Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ProgressBar from "@/components/progress-bar";
import { authMerchantRegister } from "@/services/auth/authApi";
import { useToast } from "@/hooks/use-toast";
import registerLogo from "@/public/globagift-logo.png";
import {useAuth} from "@/contexts/auth-context";

export default function RegisterStep4Page() {
  const router = useRouter();
  const { toast } = useToast();
  const {login} = useAuth();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasDigit: false,
  });

  useEffect(() => {
    // Check if we have data from previous steps
    const savedData = localStorage.getItem("registrationData");
    if (!savedData) {
      // For testing purposes, we'll initialize with empty data instead of redirecting
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
          phone: "",
          companyName: "Test Company",
          tradingName: "",
          vatNumber: "",
          currency: "GBP",
          locations: "1",
          address: "123 Test St",
          city: "Test City",
          state: "Test State",
          postalCode: "12345",
          country: "United Kingdom",
        })
      );

      setRegistrationData({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        phone: "",
        companyName: "Test Company",
        tradingName: "",
        vatNumber: "",
        currency: "GBP",
        locations: "1",
        address: "123 Test St",
        city: "Test City",
        state: "Test State",
        postalCode: "12345",
        country: "United Kingdom",
      });
    } else {
      setRegistrationData(JSON.parse(savedData));
    }
  }, [router]);

  // Validate password as user types
  useEffect(() => {
    const password = formData.password;
    setPasswordValidation({
      minLength: password.length >= 10,
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /[0-9]/.test(password),
    });
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const isPasswordValid = () => {
    return (
      passwordValidation.minLength &&
      passwordValidation.hasUppercase &&
      passwordValidation.hasDigit
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!registrationData) {
      setError("Missing registration data. Please start over.");
      return;
    }

    if (!isPasswordValid()) {
      setError("Please ensure your password meets all the requirements.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match. Please make sure your passwords match.");
      return;
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      // Transform the data into the required API format
      const registerPayload = {
        merchant: {
          first_name: registrationData.firstName || registrationData.first_name,
          last_name: registrationData.lastName || registrationData.last_name,
          email: registrationData.email,
          password: formData.password,
          phone: registrationData.phone || "",
        },
        company: {
          name: registrationData.companyName || registrationData.company_name,
          trading_name:
            registrationData.tradingName || registrationData.trading_name || "",
          vat_number:
            registrationData.vatNumber || registrationData.vat_number || "",
          currency: registrationData.currency,
          number_of_locations: parseInt(
            registrationData.locations ||
              registrationData.number_of_locations ||
              "0"
          ),
          street_address:
            registrationData.address || registrationData.street_address,
          state_address:
            registrationData.state || registrationData.state_address || "",
          zip_code:
            registrationData.postalCode ||
            registrationData.postal_code ||
            registrationData.zip_code,
          country: registrationData.country,
        },
      };

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
        await login(registrationData.email, formData.password);
        // Redirect to success page
        router.push("/dashboard/settings");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(
        error.message || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <img
            alt="Globagift-logo"
            src={registerLogo.src}
            className="h-[100px] w-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Already have an account?
          </span>
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
        <ProgressBar currentStep={4} totalSteps={4} />
      </div>

      {/* Main Form */}
      <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Create password
            </h1>
            <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">
              Step 4 of 4
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Account Security
            </h2>

            <div className="mt-6">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pr-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Password requirements */}
              <div className="mt-3 space-y-2 text-sm">
                <p className="font-medium text-gray-700">Your password must:</p>
                <div className="flex items-center gap-2">
                  {passwordValidation.minLength ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordValidation.minLength
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    Be at least 10 characters long
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasUppercase ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordValidation.hasUppercase
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    Include at least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasDigit ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <span
                    className={
                      passwordValidation.hasDigit
                        ? "text-green-600"
                        : "text-gray-600"
                    }
                  >
                    Include at least one digit
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="confirmPassword"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center">
              <Checkbox
                id="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                disabled={loading}
              />
              <label
                htmlFor="agreeTerms"
                className="ml-2 block text-sm text-gray-700"
              >
                I agree to the{" "}
                <a href="#" className="text-orange-600 hover:text-orange-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-orange-600 hover:text-orange-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                onClick={() => router.push("/register/step3")}
                className="px-6 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                variant="ghost"
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
