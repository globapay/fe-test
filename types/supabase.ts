export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          trading_name: string | null
          vat_number: string | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          trading_name?: string | null
          vat_number?: string | null
          currency: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          trading_name?: string | null
          vat_number?: string | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      company_members: {
        Row: {
          id: string
          user_id: string
          company_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_id: string
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string
          role?: string
          created_at?: string
        }
      }
    }
  }
}

