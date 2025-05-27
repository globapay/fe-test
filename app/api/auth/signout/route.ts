import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api-client";

export async function POST() {
  try {
    await apiClient.logout();
    return NextResponse.redirect("/login");
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.redirect("/login");
  }
}
