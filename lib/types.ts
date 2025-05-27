export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  company_name: string;
  trading_name: string;
  phone: number;
  vat_number: number;
  currency: string;
  number_of_locations: number;
  company_logo: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  company_name: string;
  trading_name: string;
  phone: number;
  vat_number: number;
  currency: string;
  number_of_locations: number;
  company_logo: string;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
