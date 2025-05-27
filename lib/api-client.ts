interface ApiResponse<T = any> {
  data?: T
  message?: string
  error?: string
}

interface LoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: UserResponse
}

interface UserResponse {
  id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

interface RegisterUserRequest {
  email: string
  password: string
  first_name: string
  last_name: string
  phone?: string
}

interface VerifyUserRequest {
  email: string
  verification_code: string
}

interface ResetRequest {
  email: string
  reset_token: string
  new_password: string
}

interface EmailRequest {
  email: string
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://devapi.globagift.io"
  }

  private getCookie(name: string): string | null {
    if (typeof document === "undefined") return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null
    }
    return null
  }

  private setCookie(name: string, value: string, days = 7) {
    if (typeof document === "undefined") return

    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
  }

  private deleteCookie(name: string) {
    if (typeof document === "undefined") return

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;secure;samesite=strict`
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    // Get access token from cookie
    const accessToken = this.getCookie("access_token")
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: "include", // Include cookies in requests
      })

      // Handle 401 - try to refresh token
      if (response.status === 401 && this.getCookie("refresh_token")) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          // Retry the original request with new token
          const newAccessToken = this.getCookie("access_token")
          if (newAccessToken) {
            headers["Authorization"] = `Bearer ${newAccessToken}`
          }

          const retryResponse = await fetch(url, {
            ...options,
            headers,
            credentials: "include",
          })

          if (retryResponse.ok) {
            const data = await retryResponse.json()
            return { data }
          }
        }

        // If refresh failed, clear tokens and redirect to login
        this.clearTokens()
        if (typeof window !== "undefined") {
          window.location.href = "/login"
        }
        return { error: "Authentication failed" }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        return { error: errorData.detail || `HTTP ${response.status}` }
      }

      const data = await response.json()
      return { data }
    } catch (error) {
      console.error("API request failed:", error)
      return { error: "Network error" }
    }
  }

  private setTokens(accessToken: string, refreshToken: string) {
    // Set cookies with appropriate expiration
    this.setCookie("access_token", accessToken, 1) // 1 day for access token
    this.setCookie("refresh_token", refreshToken, 7) // 7 days for refresh token
  }

  private clearTokens() {
    this.deleteCookie("access_token")
    this.deleteCookie("refresh_token")
  }

  async register(data: RegisterUserRequest): Promise<ApiResponse<UserResponse>> {
    return this.request<UserResponse>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async verifyAccount(data: VerifyUserRequest): Promise<ApiResponse> {
    return this.request("/users/verify", {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    const formData = new FormData()
    formData.append("username", email)
    formData.append("password", password)

    const response = await this.request<LoginResponse>("/users/login", {
      method: "POST",
      headers: {}, // Don't set Content-Type for FormData
      body: formData,
    })

    if (response.data) {
      this.setTokens(response.data.access_token, response.data.refresh_token)
    }

    return response
  }

  async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getCookie("refresh_token")
    if (!refreshToken) return false

    try {
      const response = await this.request<LoginResponse>("/users/refresh", {
        method: "POST",
        headers: {
          "refresh-token": refreshToken,
        },
      })

      if (response.data) {
        this.setTokens(response.data.access_token, response.data.refresh_token)
        return true
      }
    } catch (error) {
      console.error("Token refresh failed:", error)
    }

    return false
  }

  async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request("/users/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
  }

  async resetPassword(data: ResetRequest): Promise<ApiResponse> {
    return this.request("/users/reset-password", {
      method: "PUT",
      body: JSON.stringify(data),
    })
  }

  async getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    return this.request<UserResponse>("/users/me")
  }

  async getUserInfo(uuid: string): Promise<ApiResponse<UserResponse>> {
    return this.request<UserResponse>(`/users/${uuid}`)
  }

  async logout() {
    this.clearTokens()
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
  }

  isAuthenticated(): boolean {
    return !!this.getCookie("access_token")
  }

  getAccessToken(): string | null {
    return this.getCookie("access_token")
  }
}

export const apiClient = new ApiClient()
export type { UserResponse, LoginResponse, RegisterUserRequest }
