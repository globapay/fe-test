"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, RefreshCw } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

export default function RegisterSuccessPage() {
  const [resending, setResending] = useState(false)
  const [email, setEmail] = useState("")
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Try to get the email from localStorage if available
  useState(() => {
    try {
      const registrationData = localStorage.getItem("registrationData")
      if (registrationData) {
        const data = JSON.parse(registrationData)
        if (data.email) {
          setEmail(data.email)
        }
      }
    } catch (error) {
      console.error("Error retrieving email from localStorage:", error)
    }
  })

  const handleResendVerification = async () => {
    if (!email) {
      toast({
        title: "Email not found",
        description: "Please log in to request a new verification email",
        variant: "destructive",
      })
      return
    }

    setResending(true)
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      })

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Verification email sent",
          description: "Please check your inbox and spam folder",
        })
      }
    } catch (error) {
      console.error("Error resending verification:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setResending(false)
    }
  }

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

        <h1 className="mt-6 text-3xl font-bold text-gray-900">Account created!</h1>
        <p className="mt-4 text-base text-gray-600">
          We've sent you an email with a verification link. Please check your inbox and spam folder to verify your
          account.
        </p>

        <Alert className="mt-6 bg-blue-50 border-blue-200">
          <AlertDescription className="text-blue-800">
            <p>
              <strong>Not seeing the email?</strong>
            </p>
            <ul className="list-disc pl-5 mt-2 text-left">
              <li>Check your spam or junk folder</li>
              <li>Add no-reply@mail.app.supabase.io to your contacts</li>
              <li>Use the button below to request a new verification email</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="mt-6 flex flex-col gap-4">
          <Button
            onClick={handleResendVerification}
            disabled={resending}
            variant="outline"
            className="flex items-center justify-center gap-2"
          >
            {resending ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                Resend verification email
              </>
            )}
          </Button>

          <Link href="/login">
            <Button className="w-full rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Go to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
