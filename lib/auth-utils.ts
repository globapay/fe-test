import type { NextRequest } from "next/server"

export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from cookie
  const accessToken = request.cookies.get("access_token")?.value

  if (accessToken) {
    return accessToken
  }

  // Fallback: try to get from Authorization header
  const authHeader = request.headers.get("authorization")
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7)
  }

  return null
}

export function isTokenExpired(token: string): boolean {
  try {
    // Decode JWT payload (without verification for client-side check)
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Math.floor(Date.now() / 1000)

    return payload.exp < currentTime
  } catch (error) {
    // If we can't decode the token, consider it expired
    return true
  }
}

export async function validateTokenWithAPI(token: string, apiUrl: string): Promise<boolean> {
  try {
    const response = await fetch(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    return response.ok
  } catch (error) {
    console.error("Token validation failed:", error)
    return false
  }
}
