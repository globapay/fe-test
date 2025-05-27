import { type NextRequest, NextResponse } from "next/server"
import { getTokenFromRequest } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request)

  if (!token) {
    return NextResponse.json({ valid: false, error: "No token provided" }, { status: 401 })
  }

  try {
    // Validate token with FastAPI backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://devapi.globagift.io"
    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const userData = await response.json()
      return NextResponse.json({
        valid: true,
        user: userData,
      })
    } else {
      return NextResponse.json(
        {
          valid: false,
          error: "Invalid token",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("Token validation error:", error)
    return NextResponse.json(
      {
        valid: false,
        error: "Validation failed",
      },
      { status: 500 },
    )
  }
}
