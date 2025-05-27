import api from "./axios"
import { setCookie, getCookie, deleteCookie } from "./cookies"

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  company_name?: string
  is_active: boolean
  is_verified: boolean
  created_at: string
  updated_at: string
}

export interface LoginCredentials {
  username: string // FastAPI OAuth2 expects 'username' field
  password: string
}

export interface RegisterData {
  first_name: string
  last_name: string
  email: string
  phone?: string
  company_name: string
  trading_name?: string
  vat_number?: string
  currency: string
  locations?: string
  address: string
  city: string
  state?: string
  postal_code: string
  country: string
  password: string
}

export interface AuthResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: User
}

export interface VerifyCodeData {
  email: string
  verification_code: string
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // FastAPI OAuth2PasswordRequestForm expects form data
    const formData = new FormData()
    formData.append("username", credentials.username)
    formData.append("password", credentials.password)

    const response = await api.post("/users/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    return response.data
  }

  async register(data: RegisterData): Promise<{ message: string }> {
    const response = await api.post("/users", data)
    return response.data
  }

  async verifyEmail(email: string, verificationCode: string): Promise<{ message: string }> {
    const response = await api.post("/users/verify", {
      email,
      verification_code: verificationCode,
    })
    return response.data
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await api.post("/users/forgot-password", { email })
    return response.data
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const response = await api.put("/users/reset-password", {
      token,
      password,
    })
    return response.data
  }

  async refreshToken(): Promise<{ access_token: string; refresh_token: string }> {
    const refreshToken = getCookie("refresh_token")
    const response = await api.post(
      "/users/refresh",
      {},
      {
        headers: {
          "refresh-token": refreshToken,
        },
      },
    )
    return response.data
  }

  async logout(): Promise<void> {
    this.clearTokens()
  }

  async getCurrentUser(): Promise<User> {
    const response = await api.get("/users/me")
    return response.data
  }

  async getUserById(uuid: string): Promise<User> {
    const response = await api.get(`/users/${uuid}`)
    return response.data
  }

  setTokens(accessToken: string, refreshToken: string): void {
    setCookie("access_token", accessToken, 1) // 1 day for access token
    setCookie("refresh_token", refreshToken, 30) // 30 days for refresh token
  }

  clearTokens(): void {
    deleteCookie("access_token")
    deleteCookie("refresh_token")
  }

  getToken(): string | null {
    return getCookie("access_token")
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      return payload.exp > Date.now() / 1000
    } catch {
      return false
    }
  }
}

export const authService = new AuthService()
