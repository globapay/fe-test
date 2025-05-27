"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { apiClient } from "@/lib/api-client"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // Add artificial delay to prevent timing attacks (consistent response time)
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 1000))

      const response = await apiClient.forgotPassword(email)

      await delayPromise // Ensure minimum processing time

      // Always show success message even if email doesn't exist (prevents user enumeration)
      setSubmitted(true)

      // Only log the error, don't show it to the user
      if (response.error) {
        console.error("Password reset error:", response.error)
        // We don't set the error state to prevent user enumeration
      } else {
        // toast({
        //   title: "Email sent",
        //   description: "Check your email for the password reset link",
        // })
        setSuccess(true) // Replaced toast with success state for now
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
        {success || submitted ? (
          <div className="text-green-500 text-center mb-4">Check your email to reset your password.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Sending..." : "Reset Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
