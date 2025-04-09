export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campaigns: {
        Row: {
          budget: number | null
          company_id: string
          created_at: string
          id: string
          name: string
          platform: string | null
        }
        Insert: {
          budget?: number | null
          company_id: string
          created_at?: string
          id?: string
          name: string
          platform?: string | null
        }
        Update: {
          budget?: number | null
          company_id?: string
          created_at?: string
          id?: string
          name?: string
          platform?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          details: Json | null
          id: string
          industry: string | null
          name: string
        }
        Insert: {
          created_at?: string
          details?: Json | null
          id?: string
          industry?: string | null
          name: string
        }
        Update: {
          created_at?: string
          details?: Json | null
          id?: string
          industry?: string | null
          name?: string
        }
        Relationships: []
      }
      company_integrations: {
        Row: {
          company_id: string
          created_at: string
          id: string
          integration_ids: Json | null
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          integration_ids?: Json | null
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          integration_ids?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "company_integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          campaign_id: string
          created_at: string
          email: string | null
          id: string
          name: string
          phone: string | null
          status: string | null
        }
        Insert: {
          campaign_id: string
          created_at?: string
          email?: string | null
          id?: string
          name: string
          phone?: string | null
          status?: string | null
        }
        Update: {
          campaign_id?: string
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          phone?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          company_id: string | null
          created_at: string
          id: string
          industry: string | null
          location: string | null
          name: string | null
          personal_api_keys: Json | null
          phone: string | null
          role: string | null
          stripe_customer_id: string | null
          subscription_expires_at: string | null
          subscription_plan_id: string | null
          subscription_status: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_id?: string | null
          created_at?: string
          id: string
          industry?: string | null
          location?: string | null
          name?: string | null
          personal_api_keys?: Json | null
          phone?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          subscription_expires_at?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_id?: string | null
          created_at?: string
          id?: string
          industry?: string | null
          location?: string | null
          name?: string | null
          personal_api_keys?: Json | null
          phone?: string | null
          role?: string | null
          stripe_customer_id?: string | null
          subscription_expires_at?: string | null
          subscription_plan_id?: string | null
          subscription_status?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      strategies: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          id: string
          risk_level: string | null
          title: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          risk_level?: string | null
          title: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          risk_level?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "strategies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: Json
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      tasks: {
        Row: {
          created_at: string
          id: string
          status: string | null
          strategy_id: string
          title: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string | null
          strategy_id: string
          title: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string | null
          strategy_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_strategy_id_fkey"
            columns: ["strategy_id"]
            isOneToOne: false
            referencedRelation: "strategies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_actions: {
        Row: {
          action: string
          category: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          timestamp: string
          user_id: string
        }
        Insert: {
          action: string
          category: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string
          user_id: string
        }
        Update: {
          action?: string
          category?: string
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          activity_peak_times: Json | null
          communication_style: string | null
          dashboard_preferences: Json | null
          favorite_topics: Json | null
          id: string
          last_updated: string | null
          preferred_executives: Json | null
          risk_appetite: string | null
          user_id: string
        }
        Insert: {
          activity_peak_times?: Json | null
          communication_style?: string | null
          dashboard_preferences?: Json | null
          favorite_topics?: Json | null
          id?: string
          last_updated?: string | null
          preferred_executives?: Json | null
          risk_appetite?: string | null
          user_id: string
        }
        Update: {
          activity_peak_times?: Json | null
          communication_style?: string | null
          dashboard_preferences?: Json | null
          favorite_topics?: Json | null
          id?: string
          last_updated?: string | null
          preferred_executives?: Json | null
          risk_appetite?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_recent_user_actions: {
        Args: { p_user_id: string; p_days: number }
        Returns: {
          action: string
          category: string
          entity_id: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
          timestamp: string
          user_id: string
        }[]
      }
      get_user_action_categories: {
        Args: { p_user_id: string }
        Returns: {
          category: string
          count: number
        }[]
      }
      get_user_preferences: {
        Args: { p_user_id: string }
        Returns: {
          activity_peak_times: Json | null
          communication_style: string | null
          dashboard_preferences: Json | null
          favorite_topics: Json | null
          id: string
          last_updated: string | null
          preferred_executives: Json | null
          risk_appetite: string | null
          user_id: string
        }
      }
      insert_user_action: {
        Args: {
          p_user_id: string
          p_action: string
          p_category: string
          p_entity_id: string
          p_entity_type: string
          p_metadata: Json
          p_timestamp: string
        }
        Returns: undefined
      }
      update_user_preferences: {
        Args: {
          p_user_id: string
          p_risk_appetite: string
          p_preferred_executives: Json
          p_favorite_topics: Json
          p_communication_style: string
          p_activity_peak_times: Json
          p_dashboard_preferences: Json
          p_last_updated: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
