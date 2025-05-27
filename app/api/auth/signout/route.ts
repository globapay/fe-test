import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Since we're using client-side token management,
    // we just need to redirect to login
    // The client will handle clearing tokens

    const response = NextResponse.redirect("/login");

    return response;
  } catch (error) {
    console.error("Sign out error:", error);
    return NextResponse.json({ error: "Sign out failed" }, { status: 500 });
  }
}
