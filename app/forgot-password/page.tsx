"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import logo from "@/public/globagift-logo.png"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Always show success message (in a real app, this would send an email)
      setSubmitted(true)
    } catch (error) {
      console.error("Unexpected error:", error)
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
          <img alt="Globagift-logo" src={logo.src} className="h-[100px] w-auto" />
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="text-sm font-medium text-orange-600 hover:text-orange-500">
            Back to login
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-16 w-full max-w-md px-4">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          {submitted ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>

              <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">Email sent</h1>
              <p className="mt-2 text-center text-sm text-gray-600">
                We've sent a password reset link to <strong>{email}</strong>. Please check your email.
              </p>

              <div className="mt-8">
                <Link href="/login">
                  <Button className="w-full rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                    Return to login
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">Reset your password</h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter your email address and we'll send you a link to reset your password
              </p>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-400">
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
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </span>
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border border-gray-300 py-2 pl-10 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                      placeholder="you@example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  >
                    {loading ? "Sending..." : "Send reset link"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
