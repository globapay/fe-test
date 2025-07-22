"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { apiClient } from "@/lib/api-client";
import { signIn, getInfo } from "@/services/auth/authApi";
import { useToast } from "@/hooks/use-toast";

import logo from "@/public/globagift-logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"login" | "verify">("login");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await signIn({
        email: email,
        password: password,
      });

      if (response.status !== "OK") {
        throw new Error(response.message || "Login failed");
      }

      // // Store the token if provided
      // if (response.data) {
      //   // Store in localStorage for client-side access
      //   localStorage.setItem("accessToken", response.data);
      //   // Store in cookie for middleware authentication
      //   document.cookie = `access_token=${response.data}; path=/; max-age=86400; SameSite=Lax`;
      // }

      // Call getInfo endpoint to get user information
      // try {
      //   console.log(
      //     "Calling getInfo with token:",
      //     localStorage.getItem("accessToken")
      //   );
      //   const userInfo = await getInfo();
      //   console.log("userInfo", userInfo);

      //   // Store user info in localStorage for use throughout the app
      //   localStorage.setItem("userInfo", JSON.stringify(userInfo));
      // } catch (error) {
      //   console.error("Error fetching user info:", error);
      //   // Continue with login even if getInfo fails
      // }

      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      });

      router.push("/dashboard/settings");
    } catch (error: any) {
      console.error("Login error:", error);

      // Check if account needs verification
      if (error.message?.includes("not verified")) {
        setStep("verify");
        toast({
          title: "Account verification required",
          description:
            "Please verify your account with the code sent to your email",
        });
      } else {
        setError(
          error.message || "Invalid email or password. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await apiClient.verifyEmail(email, verificationCode);
      if (response.error) {
        throw new Error(response.error);
      }

      toast({
        title: "Account verified successfully",
        description: "You can now log in",
      });

      setStep("login");
      setVerificationCode("");
    } catch (error: any) {
      console.error("Verification error:", error);
      setError(
        error.message ||
          "Invalid or expired verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGetInfo = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await getInfo();
    console.log("response", response);
  };

  const redirectToRefreshSession = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push("/session/refresh");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5fa]">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center">
          <img
            alt="Globagift-logo"
            src={logo.src}
            className="h-[100px] w-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Don't have an account?</span>
          <Link
            href="/register"
            className="rounded-md border border-orange-500 px-4 py-2 text-sm font-medium text-orange-500 hover:bg-orange-50"
          >
            Sign up
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-16 w-full max-w-md px-4">
        <div className="overflow-hidden rounded-lg bg-white p-8 shadow-sm">
          {step === "login" ? (
            <>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account to continue
              </p>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleLogin} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
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
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-sm font-medium text-orange-600 hover:text-orange-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button onClick={handleGetInfo} className="mt-10">
                    Call getInfo
                  </Button>
                  <Button onClick={redirectToRefreshSession} className="mt-10">
                    Redirect to refresh session
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900">
                Verify your account
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Enter the verification code sent to your email
              </p>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleVerify} className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="verification-code"
                    className="mb-1 block text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <Input
                    id="verification-code"
                    name="verification-code"
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    placeholder="123456"
                    disabled={loading}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
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
                        Verifying...
                      </>
                    ) : (
                      <>
                        Verify Account
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep("login")}
                    className="text-sm font-medium text-orange-600 hover:text-orange-500"
                    disabled={loading}
                  >
                    Back to login
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
