"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowRight, AlertCircle, Check, X } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ProgressBar from "@/components/progress-bar"

export default function RegisterStep4Page() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [registrationData, setRegistrationData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasDigit: false,
  })

  useEffect(() => {
    // Check if we have data from previous steps
    const savedData = localStorage.getItem("registrationData")
    if (!savedData) {
      // For testing purposes, we'll initialize with empty data instead of redirecting
      localStorage.setItem(
        "registrationData",
        JSON.stringify({
          firstName: "Test",
          lastName: "User",
          email: "test@example.com",
          companyName: "Test Company",
          tradingName: "",
          vatNumber: "",
          currency: "GBP",
          address: "123 Test St",
          city: "Test City",
          state: "Test State",
          postalCode: "12345",
          country: "United Kingdom",
        }),
      )

      setRegistrationData({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        companyName: "Test Company",
        tradingName: "",
        vatNumber: "",
        currency: "GBP",
        address: "123 Test St",
        city: "Test City",
        state: "Test State",
        postalCode: "12345",
        country: "United Kingdom",
      })
    } else {
      setRegistrationData(JSON.parse(savedData))
    }
  }, [router])

  // Validate password as user types
  useEffect(() => {
    const password = formData.password
    setPasswordValidation({
      minLength: password.length >= 10,
      hasUppercase: /[A-Z]/.test(password),
      hasDigit: /[0-9]/.test(password),
    })
  }, [formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const isPasswordValid = () => {
    return passwordValidation.minLength && passwordValidation.hasUppercase && passwordValidation.hasDigit
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!registrationData) {
      setError("Missing registration data. Please start over.")
      return
    }

    if (!isPasswordValid()) {
      setError("Please ensure your password meets all the requirements.")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match. Please make sure your passwords match.")
      return
    }

    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions.")
      return
    }

    setLoading(true)

    try {
      // Add artificial delay to prevent timing attacks
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000))

      // Register the user with Supabase
      const { data, error } = await supabase.auth.signUp({
        email: registrationData.email,
        password: formData.password,
        options: {
          data: {
            first_name: registrationData.firstName,
            last_name: registrationData.lastName,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })

      await delayPromise // Ensure minimum processing time

      if (error) {
        // Show the actual error message for debugging
        console.error("Registration error details:", error)
        setError(`Registration error: ${error.message}`)
        return
      }

      // Keep registration data in localStorage until verification
      // We'll use it on the success page to allow resending verification emails

      // Show success message
      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account",
      })

      // Redirect to success page
      router.push("/register/success")
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-orange-500">GiftFlow</span>
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
        <ProgressBar currentStep={4} totalSteps={4} />
      </div>

      {/* Main Form */}
      <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Create password</h1>
            <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">Step 4 of 4</div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Account Security</h2>

            <div className="mt-6">
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
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
                  <span className={passwordValidation.minLength ? "text-green-600" : "text-gray-600"}>
                    Be at least 10 characters long
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasUppercase ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={passwordValidation.hasUppercase ? "text-green-600" : "text-gray-600"}>
                    Include at least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {passwordValidation.hasDigit ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <X className="h-4 w-4 text-gray-400" />
                  )}
                  <span className={passwordValidation.hasDigit ? "text-green-600" : "text-gray-600"}>
                    Include at least one digit
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700">
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
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700">
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
  )
}

