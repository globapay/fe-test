import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {isAuthenticated} from "@/services/auth/authApi";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("sAccessToken");

  if (pathname.startsWith("/login")) {
    req.cookies.delete("sAccessToken");
    req.cookies.delete("session");
  }

  if (pathname.startsWith("/dashboard") && !token?.value) {
    return NextResponse.redirect(new URL( "/login", req.url));
  }

  if (pathname.startsWith("/login") && token?.value) {
    return NextResponse.redirect(new URL( "/dashboard/settings", req.url));
  }

  // // Public routes that don't require authentication
  // const publicRoutes = [
  //   "/login",
  //   "/register",
  //   "/forgot-password",
  //   "/reset-password",
  //   "/test-navigation",
  //   "/iframe",
  // ];
  // const isAuth: boolean = await isAuthenticated();
  // // Check if the current path is a public route
  // const isPublicRoute = publicRoutes.some(
  //   (route) => pathname.startsWith(route) || pathname === "/"
  // );
  // // Get token from cookie
  // // const token = req.cookies.get("access_token")?.value;
  // let token = "123";
  // // If accessing a protected route
  // if (!isPublicRoute) {
  //   if (!token) {
  //     const loginUrl = new URL("/login", req.url);
  //     loginUrl.searchParams.set("redirectedFrom", pathname);
  //     return NextResponse.redirect(loginUrl);
  //   }
  //   // Basic token validation (check if it's not expired)
  //   try {
  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     if (payload.exp <= Date.now() / 1000) {
  //       const loginUrl = new URL("/login", req.url);
  //       loginUrl.searchParams.set("redirectedFrom", pathname);
  //       return NextResponse.redirect(loginUrl);
  //     }
  //   } catch {
  //     const loginUrl = new URL("/login", req.url);
  //     loginUrl.searchParams.set("redirectedFrom", pathname);
  //     return NextResponse.redirect(loginUrl);
  //   }
  // }
  // // If accessing auth routes while authenticated
  // if (
  //   token &&
  //   (pathname.startsWith("/login") || pathname.startsWith("/register"))
  // ) {
  //   try {
  //     const payload = JSON.parse(atob(token.split(".")[1]));
  //     if (payload.exp > Date.now() / 1000) {
  //       return NextResponse.redirect(new URL("/dashboard", req.url));
  //     }
  //   } catch {
  //     // Invalid token, allow access to auth routes
  //   }
  // }
  // return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg).*)"],
};
