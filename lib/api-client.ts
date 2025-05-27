import axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { ApiResponse, LoginResponse, RegisterRequest, User } from "./types";

class ApiClient {
  private baseURL: string;
  private accessToken: string | null = null;
  private refreshTokenValue: string | null = null;

  constructor() {
    this.baseURL =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    axios.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken) {
          config.headers.set("Authorization", `Bearer ${this.accessToken}`);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // If error is 401 and we haven't tried to refresh token yet
        if (
          error.response?.status === 401 &&
          originalRequest &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            // Try to refresh the token
            const response = await this.refreshToken();
            if (response.data?.access_token) {
              this.setAccessToken(response.data.access_token);
              originalRequest.headers.set(
                "Authorization",
                `Bearer ${response.data.access_token}`
              );
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, clear tokens and redirect to login
            this.clearTokens();
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem("accessToken", token);
  }

  private setRefreshToken(token: string) {
    this.refreshTokenValue = token;
    localStorage.setItem("refreshToken", token);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshTokenValue = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/register`, data);
      if (response.data.access_token) {
        this.setAccessToken(response.data.access_token);
        this.setRefreshToken(response.data.refresh_token);
      }
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Registration failed",
      };
    }
  }

  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/login`, {
        email,
        password,
      });
      if (response.data.access_token) {
        this.setAccessToken(response.data.access_token);
        this.setRefreshToken(response.data.refresh_token);
      }
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Login failed",
      };
    }
  }

  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/refresh`, {
        refresh_token: this.refreshTokenValue,
      });
      if (response.data.access_token) {
        this.setAccessToken(response.data.access_token);
        this.setRefreshToken(response.data.refresh_token);
      }
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Token refresh failed",
      };
    }
  }

  async getUser(): Promise<ApiResponse<User>> {
    try {
      const response = await axios.get(`${this.baseURL}/user`);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Failed to get user data",
      };
    }
  }

  async updateUser(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await axios.put(`${this.baseURL}/user`, data);
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Failed to update user",
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await axios.post(`${this.baseURL}/auth/logout`);
    } finally {
      this.clearTokens();
    }
  }

  async resendVerification(): Promise<ApiResponse<void>> {
    try {
      const response = await axios.post(
        `${this.baseURL}/auth/resend-verification`
      );
      return response.data;
    } catch (error: any) {
      return {
        error:
          error.response?.data?.message ||
          "Failed to resend verification email",
      };
    }
  }

  async verifyEmail(email: string, code: string): Promise<ApiResponse<void>> {
    try {
      const response = await axios.post(`${this.baseURL}/auth/verify-email`, {
        email,
        code,
      });
      return response.data;
    } catch (error: any) {
      return {
        error: error.response?.data?.message || "Failed to verify email",
      };
    }
  }
}

export const apiClient = new ApiClient();
