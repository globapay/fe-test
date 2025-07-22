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
import registerLogo from "@/public/globagift-logo.png"

// List of countries
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

export default function RegisterStep3Page() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "GB",
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
            <img alt="Globagift-logo" src={registerLogo.src} className="h-[100px] w-auto" />
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
                      <SelectItem key={country.code} value={country.code}>
                        {country.title}
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
