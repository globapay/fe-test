import { NextResponse } from "next/server"

export async function POST() {
  // Create response with redirect
  const response = NextResponse.redirect(
    new URL("/login", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    {
      headers: {
        "Cache-Control": "no-store, max-age=0, must-revalidate",
      },
    },
  )

  // Clear any auth-related cookies if you're using them
  response.cookies.delete("access_token")
  response.cookies.delete("refresh_token")

  return response
}
