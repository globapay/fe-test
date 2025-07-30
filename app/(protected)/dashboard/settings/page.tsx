'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Building, Shield, Palette } from "lucide-react"
import ProfileTab from "@/app/(protected)/dashboard/settings/(tabs)/profile-tab";
import CompanyTab from "@/app/(protected)/dashboard/settings/(tabs)/company-tab";
import BrandingTab from "@/app/(protected)/dashboard/settings/(tabs)/branding-tab";
import SecurityTab from "@/app/(protected)/dashboard/settings/(tabs)/security-tab";

export default function SettingsPage() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account and company settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-16 rounded-xl">
          <TabsTrigger value="profile" className="flex items-center gap-2 text-lg rounded-lg">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="flex items-center gap-2 text-lg rounded-lg">
            <Building className="h-5 w-5" />
            <span className="hidden sm:inline">Company</span>
          </TabsTrigger>
          <TabsTrigger value="branding" className="flex items-center gap-2 text-lg rounded-lg">
            <Palette className="h-5 w-5" />
            <span className="hidden sm:inline">Branding</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 text-lg rounded-lg">
            <Shield className="h-5 w-5" />
            <span className="hidden sm:inline">Security & Privacy</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <ProfileTab/>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="mt-6 space-y-6">
          <CompanyTab/>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding" className="mt-6 space-y-6">
          <BrandingTab/>
        </TabsContent>

        {/* Security & Privacy Settings */}
        <TabsContent value="security" className="mt-6 space-y-6">
         <SecurityTab/>
        </TabsContent>
      </Tabs>
    </div>
  )
}
