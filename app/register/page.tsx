"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight, User, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProgressBar from "@/components/progress-bar"
import logo from "@/public/globagift-logo.png"

export default function RegisterPage() {
  const router = useRouter()
  // Update the formData state to include phone
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store form data in localStorage for the next steps
    localStorage.setItem("registrationData", JSON.stringify(formData))
    router.push("/register/step2")
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
            <img alt="Globagift-logo" src={logo.src} className="h-[100px] w-auto" />
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
        <ProgressBar currentStep={1} totalSteps={4} />
      </div>

      {/* Main Form */}
      <div className="mx-auto mt-8 w-full max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <div className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-500">Step 1 of 4</div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="john.doe@company.com"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={handleChange}
                  className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="+1 (555) 123-4567"
                  pattern="[0-9+\s$$$$-]+"
                  title="Please enter a valid phone number (only numbers, spaces, +, -, and parentheses are allowed)"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
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
