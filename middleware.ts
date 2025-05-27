import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getTokenFromRequest, isTokenExpired } from "@/lib/auth-utils"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define paths that should be publicly accessible
  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/reset-password", "/test-navigation"]

  // Define paths that require authentication
  const protectedPaths = ["/dashboard"]

  // Check if the current path is public
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(publicPath + "/"))

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some((protectedPath) => path.startsWith(protectedPath))

  // Allow access to API routes, static files, etc.
  if (path.startsWith("/api") || path.startsWith("/_next") || path.startsWith("/favicon.ico") || path.includes(".")) {
    return NextResponse.next()
  }

  // Get the access token from the request
  const accessToken = getTokenFromRequest(request)

  // If accessing a protected route
  if (isProtectedPath) {
    // No token found
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirectedFrom", path)
      return NextResponse.redirect(loginUrl)
    }

    // Check if token is expired (basic client-side check)
    if (isTokenExpired(accessToken)) {
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirectedFrom", path)
      loginUrl.searchParams.set("reason", "expired")
      return NextResponse.redirect(loginUrl)
    }

    // Token exists and appears valid, allow access
    return NextResponse.next()
  }

  // If accessing auth routes while logged in, redirect to dashboard
  if (isPublicPath && accessToken && !isTokenExpired(accessToken)) {
    const authRoutes = ["/login", "/register", "/forgot-password"]
    const isAuthRoute = authRoutes.some((route) => path.startsWith(route))

    if (isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  // Allow access to public paths
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
