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
            isOneToOne: false;
            referencedRelation: 'profiles';
            referencedColumns: ['github'];
          },
        ];
      };
      answer: {
        Row: {
          answer_id: number | null;
          created_at: string;
          game_id: number | null;
          id: number;
          is_correct: boolean | null;
          question_id: number | null;
          updated_at: string;
        };
        Insert: {
          answer_id?: number | null;
          created_at?: string;
          game_id?: number | null;
          id?: never;
          is_correct?: boolean | null;
          question_id?: number | null;
          updated_at?: string;
        };
        Update: {
          answer_id?: number | null;
          created_at?: string;
          game_id?: number | null;
          id?: never;
          is_correct?: boolean | null;
          question_id?: number | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'answer_game_id_fkey';
            columns: ['game_id'];
            isOneToOne: false;
            referencedRelation: 'game';
            referencedColumns: ['id'];
          },
        ];
      };
      game: {
        Row: {
          created_at: string;
          id: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: never;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: never;
          updated_at?: string;
        };
        Relationships: [];
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
        Relationships: [];
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
            isOneToOne: false;
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
            isOneToOne: true;
            referencedRelation: 'profiles';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: Record<never, never>;
    Functions: {
      get_best_time: {
        Args: { p_user_id: string };
        Returns: {
          duration: number;
          user_id: string;
        }[];
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  'public'
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views']),
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Tables'],
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['Enums'],
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | { schema: keyof DatabaseWithoutInternals }
    | keyof DefaultSchema['CompositeTypes'],
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
