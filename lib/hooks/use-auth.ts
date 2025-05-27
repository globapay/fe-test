"use client"

import { useState, useEffect } from "react"
import { apiClient, type UserResponse, type RegisterUserRequest } from "@/lib/api-client"

interface AuthState {
  user: UserResponse | null
  loading: boolean
  isAuthenticated: boolean
}

interface AuthResult {
  success: boolean
  error?: string
  user?: UserResponse
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    if (!apiClient.isAuthenticated()) {
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      })
      return
    }

    try {
      const response = await apiClient.getCurrentUser()
      if (response.data) {
        setAuthState({
          user: response.data,
          loading: false,
          isAuthenticated: true,
        })
      } else {
        // Token might be invalid, clear it
        await apiClient.logout()
        setAuthState({
          user: null,
          loading: false,
          isAuthenticated: false,
        })
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      await apiClient.logout()
      setAuthState({
        user: null,
        loading: false,
        isAuthenticated: false,
      })
    }
  }

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const response = await apiClient.login(email, password)
      if (response.data) {
        setAuthState({
          user: response.data.user,
          loading: false,
          isAuthenticated: true,
        })
        return { success: true, user: response.data.user }
      } else {
        return { success: false, error: response.error || "Login failed" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed" }
    }
  }

  const register = async (data: RegisterUserRequest): Promise<AuthResult> => {
    try {
      const response = await apiClient.register(data)
      if (response.data) {
        return { success: true, user: response.data }
      } else {
        return { success: false, error: response.error || "Registration failed" }
      }
    } catch (error) {
      console.error("Registration error:", error)
      return { success: false, error: "Registration failed" }
    }
  }

  const logout = async () => {
    await apiClient.logout()
    setAuthState({
      user: null,
      loading: false,
      isAuthenticated: false,
    })
  }

  const forgotPassword = async (email: string): Promise<AuthResult> => {
    try {
      const response = await apiClient.forgotPassword(email)
      if (response.error) {
        return { success: false, error: response.error }
      }
      return { success: true }
    } catch (error) {
      console.error("Forgot password error:", error)
      return { success: false, error: "Failed to send reset email" }
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    forgotPassword,
    checkAuthStatus,
  }
}
