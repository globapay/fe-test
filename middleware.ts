import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /dashboard, /login)
  const path = request.nextUrl.pathname

  // Define paths that should be publicly accessible
  const publicPaths = ["/login", "/register", "/forgot-password", "/reset-password", "/api", "/_next", "/favicon.ico"]

  // Check if the path is public
  const isPublicPath = publicPaths.some((publicPath) => path.startsWith(publicPath))

  // Get token from localStorage (this won't work in middleware, so we'll check on client side)
  // For now, we'll let the client-side handle authentication checks

  // If it's a public path, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // For protected paths, we'll let the client-side components handle the auth check
  // since we can't access localStorage in middleware
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
