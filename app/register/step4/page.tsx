"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useRegistrationData } from "@/lib/hooks/use-registration-data"
import { usePasswordValidation } from "@/lib/hooks/use-password-validation"
import { useAuth } from "@/lib/hooks/use-auth"

export default function RegisterStep4Page() {
  const router = useRouter()
  const { toast } = useToast()
  const { register } = useAuth()
  const { registrationData } = useRegistrationData()
  const { formData, setFormData, passwordValidation, isPasswordValid } = usePasswordValidation()

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!registrationData) {
      // Initialize with test data for development
      const testData = {
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
      }
      localStorage.setItem("registrationData", JSON.stringify(testData))
    }
  }, [registrationData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
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
      const result = await register({
        email: registrationData.email,
        password: formData.password,
        first_name: registrationData.firstName,
        last_name: registrationData.lastName,
        phone: registrationData.phone,
      })

      if (!result.success) {
        setError(result.error || "Registration failed")
        return
      }

      toast({
        title: "Registration successful",
        description: "Please check your email to verify your account",
      })

      router.push("/register/success")
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl mb-4">Final Step</h2>
        <p className="mb-4">We will send you a magic link to your email address. Click the link to login.</p>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </div>
    </div>
  )
}
