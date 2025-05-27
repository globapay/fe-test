import Link from "next/link"

export default function TestNavigationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-900">Test Navigation</h1>
        <p className="mb-8 text-gray-600">Use the links below to navigate to different pages for testing purposes.</p>

        <div className="space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-semibold text-orange-600">Registration Flow</h2>
            <div className="grid gap-3">
              <Link href="/register" className="rounded-md bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200">
                Step 1: Personal Information
              </Link>
              <Link
                href="/register/step2"
                className="rounded-md bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200"
              >
                Step 2: Company Details
              </Link>
              <Link
                href="/register/step3"
                className="rounded-md bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200"
              >
                Step 3: Address Information
              </Link>
              <Link
                href="/register/step4"
                className="rounded-md bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200"
              >
                Step 4: Create Password
              </Link>
              <Link
                href="/register/success"
                className="rounded-md bg-orange-100 px-4 py-2 text-orange-700 hover:bg-orange-200"
              >
                Registration Success
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-blue-600">Authentication</h2>
            <div className="grid gap-3">
              <Link href="/login" className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200">
                Login
              </Link>
              <Link
                href="/forgot-password"
                className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200"
              >
                Forgot Password
              </Link>
              <Link href="/reset-password" className="rounded-md bg-blue-100 px-4 py-2 text-blue-700 hover:bg-blue-200">
                Reset Password
              </Link>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold text-green-600">Dashboard</h2>
            <div className="grid gap-3">
              <Link href="/dashboard" className="rounded-md bg-green-100 px-4 py-2 text-green-700 hover:bg-green-200">
                Dashboard (Protected Route)
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Note: Some pages may redirect you if you're already logged in or if you haven't completed previous steps.
          </p>
        </div>
      </div>
    </div>
  )
}
