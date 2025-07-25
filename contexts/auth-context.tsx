"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, authService } from "@/lib/auth"
import {checkCookies, getInfo, isAuthenticated, logOut, signIn} from "@/services/auth/authApi";
import {getMerchant} from "@/services/merchant/merchantApi";
import {IMerchant} from "@/types/merchant";
import {useRouter} from "next/navigation";

interface AuthContextType {
  user: IMerchant | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IMerchant | null>(null)
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const isAuth: boolean = await isAuthenticated();
      try {
        if (isAuth) {
          const merchant: IMerchant = await getMerchant();
          setUser(merchant);
          console.log(1)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        router.push("/login");
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signIn({
        email: email,
        password: password,
      })

      if (response.status === "OK") {
        const merchant: IMerchant = await getMerchant();
        setUser(merchant)
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }

  const logout = async () => {
    setLoading(true);
    const response = await logOut();

    if (response.status === "ok") {
      await authService.logout()
      setUser(null);
    }
    setLoading(false);
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
