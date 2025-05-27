"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { apiClient, type UserResponse } from "@/lib/api-client"

export function useAuth() {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (!apiClient.isAuthenticated()) {
        setLoading(false)
        setIsAuthenticated(false)
        return
      }

      try {
        const response = await apiClient.getCurrentUser()
        if (response.error) {
          setIsAuthenticated(false)
          setUser(null)
        } else {
          setIsAuthenticated(true)
          setUser(response.data || null)
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiClient.login(email, password)
    if (response.data) {
      setIsAuthenticated(true)
      setUser(response.data.user)
      return { success: true }
    }
    return { success: false, error: response.error }
  }

  const logout = async () => {
    await apiClient.logout()
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login")
  }

  const register = async (data: any) => {
    const response = await apiClient.register(data)
    if (response.data) {
      return { success: true, user: response.data }
    }
    return { success: false, error: response.error }
  }

  return {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
  }
}
