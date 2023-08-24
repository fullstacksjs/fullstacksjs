export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      subscription: {
        Row: {
          created_at: string
          id: number
          ts_guild: boolean | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          ts_guild?: boolean | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          ts_guild?: boolean | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
