"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, MapPin, Building } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/components/progress-bar"

// List of countries
const countries = [
  "United Kingdom",
  "United States",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Belgium",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Ireland",
  "Switzerland",
  "Austria",
  "Portugal",
  "Greece",
  "Poland",
  "Czech Republic",
  "Hungary",
  "Romania",
  "Bulgaria",
  "Croatia",
  "Slovakia",
  "Slovenia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Cyprus",
  "Malta",
  "Luxembourg",
  "Iceland",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Africa",
  "Russia",
  "Turkey",
  "South Korea",
  "Singapore",
  "New Zealand",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Egypt",
  "Argentina",
  "Chile",
].sort()

export default function RegisterStep3Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United Kingdom",
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
        }),
      )
    }
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in localStorage for the next step
    const previousData = JSON.parse(localStorage.getItem("registrationData") || "{}")
    localStorage.setItem(
      "registrationData",
      JSON.stringify({
        ...previousData,
        ...formData,
      }),
    )
    router.push("/register/step4")
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
        <ProgressBar currentStep={3} totalSteps={4} />
      </div>

      {/* Main Form */}
      <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Company address</h1>
            <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">Step 3 of 4</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Address Information</h2>

            <div className="mt-6">
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="123 Business Street"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                  City/Town <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="London"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-700">
                  State/Province
                </label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  value={formData.state}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Greater London"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="postalCode" className="mb-1 block text-sm font-medium text-gray-700">
                  Postal/ZIP Code <span className="text-red-500">*</span>
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="SW1A 1AA"
                />
              </div>

              <div>
                <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-700">
                  Country <span className="text-red-500">*</span>
                </label>
                <Select value={formData.country} onValueChange={(value) => handleSelectChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <Button
                type="button"
                onClick={() => router.push("/register/step2")}
                className="px-6 py-2 text-sm font-medium text-orange-500 hover:text-orange-600"
                variant="ghost"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-orange-500 px-6 py-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
