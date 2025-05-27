import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to settings page which is now our main dashboard
  redirect("/dashboard/settings")
}

