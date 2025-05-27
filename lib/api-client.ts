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
  private accessToken: string | null = null
  private refreshToken: string | null = null

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://devapi.globagift.io"

    // Load tokens from localStorage if available
    if (typeof window !== "undefined") {
      this.accessToken = localStorage.getItem("access_token")
      this.refreshToken = localStorage.getItem("refresh_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    // Add authorization header if we have an access token
    if (this.accessToken) {
      headers["Authorization"] = `Bearer ${this.accessToken}`
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      })

      // Handle 401 - try to refresh token
      if (response.status === 401 && this.refreshToken) {
        const refreshed = await this.refreshAccessToken()
        if (refreshed) {
          // Retry the original request with new token
          headers["Authorization"] = `Bearer ${this.accessToken}`
          const retryResponse = await fetch(url, {
            ...options,
            headers,
          })

          if (retryResponse.ok) {
            const data = await retryResponse.json()
            return { data }
          }
        }

        // If refresh failed, clear tokens and redirect to login
        this.clearTokens()
        window.location.href = "/login"
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
    this.accessToken = accessToken
    this.refreshToken = refreshToken

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", accessToken)
      localStorage.setItem("refresh_token", refreshToken)
    }
  }

  private clearTokens() {
    this.accessToken = null
    this.refreshToken = null

    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }
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
    if (!this.refreshToken) return false

    try {
      const response = await this.request<LoginResponse>("/users/refresh", {
        method: "POST",
        headers: {
          "refresh-token": this.refreshToken,
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
    window.location.href = "/login"
  }

  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  getAccessToken(): string | null {
    return this.accessToken
  }
}

export const apiClient = new ApiClient()
export type { UserResponse, LoginResponse, RegisterUserRequest }
