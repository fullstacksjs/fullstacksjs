export type Json =
  | boolean
  | number
  | string
  | Json[]
  | { [key: string]: Json | undefined }
  | null;

export interface Database {
  public: {
    Tables: {
      advent: {
        Row: {
          created_at: string;
          id: string;
          name: string | null;
          username: string | null;
          year: number;
        };
        Insert: {
          created_at?: string;
          id: string;
          name?: string | null;
          username?: string | null;
          year: number;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string | null;
          username?: string | null;
          year?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'advent_username_fkey';
            columns: ['username'];
            referencedRelation: 'profiles';
            referencedColumns: ['github'];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          github: string | null;
          id: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          github?: string | null;
          id: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          github?: string | null;
          id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'profiles_id_fkey';
            columns: ['id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
      records: {
        Row: {
          created_at: string;
          duration: number | null;
          id: string;
          mistakes: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          duration?: number | null;
          id?: string;
          mistakes?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          duration?: number | null;
          id?: string;
          mistakes?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'records_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
      subscription: {
        Row: {
          created_at: string;
          ts_guild: boolean | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          ts_guild?: boolean | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          ts_guild?: boolean | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'subscription_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_best_time: {
        Args: {
          p_user_id: string;
        };
        Returns: {
          user_id: string;
          duration: number;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
