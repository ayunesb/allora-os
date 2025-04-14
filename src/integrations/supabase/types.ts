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
      ad_platform_connections: {
        Row: {
          access_token: string
          ad_account_id: string
          company_id: string
          created_at: string
          id: string
          is_active: boolean
          platform: string
          refresh_token: string | null
          scopes: string[] | null
          token_expires_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          ad_account_id: string
          company_id: string
          created_at?: string
          id?: string
          is_active?: boolean
          platform: string
          refresh_token?: string | null
          scopes?: string[] | null
          token_expires_at: string
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          ad_account_id?: string
          company_id?: string
          created_at?: string
          id?: string
          is_active?: boolean
          platform?: string
          refresh_token?: string | null
          scopes?: string[] | null
          token_expires_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ad_platform_connections_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_boardroom_debates: {
        Row: {
          company_id: string
          conclusion: string | null
          created_at: string | null
          discussion: Json | null
          executives: Json | null
          id: string
          rls_enabled: boolean | null
          status: string | null
          summary: string | null
          topic: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          conclusion?: string | null
          created_at?: string | null
          discussion?: Json | null
          executives?: Json | null
          id?: string
          rls_enabled?: boolean | null
          status?: string | null
          summary?: string | null
          topic: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          conclusion?: string | null
          created_at?: string | null
          discussion?: Json | null
          executives?: Json | null
          id?: string
          rls_enabled?: boolean | null
          status?: string | null
          summary?: string | null
          topic?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_boardroom_debates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_campaigns: {
        Row: {
          company_id: string
          created_at: string
          executive_bot: string
          id: string
          objective: string
          platform: string
          script: string
          target_audience: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          executive_bot: string
          id?: string
          objective: string
          platform: string
          script: string
          target_audience: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          executive_bot?: string
          id?: string
          objective?: string
          platform?: string
          script?: string
          target_audience?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_campaigns_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_communication_scripts: {
        Row: {
          company_id: string
          content: string
          created_at: string
          executive_bot: string
          id: string
          script_type: string
          updated_at: string
        }
        Insert: {
          company_id: string
          content: string
          created_at?: string
          executive_bot: string
          id?: string
          script_type: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          content?: string
          created_at?: string
          executive_bot?: string
          id?: string
          script_type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_communication_scripts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_executive_debates: {
        Row: {
          company_id: string
          created_at: string
          debate_content: Json
          id: string
          summary: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          debate_content?: Json
          id?: string
          summary?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          debate_content?: Json
          id?: string
          summary?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_executive_debates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_strategies: {
        Row: {
          company_id: string
          created_at: string
          executive_bot: string
          expected_outcome: string | null
          id: string
          reasoning: string | null
          risk_level: string
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          executive_bot: string
          expected_outcome?: string | null
          id?: string
          reasoning?: string | null
          risk_level: string
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          executive_bot?: string
          expected_outcome?: string | null
          id?: string
          reasoning?: string | null
          risk_level?: string
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ai_strategies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      bot_interactions: {
        Row: {
          bot_name: string
          bot_response: string
          bot_role: string
          created_at: string | null
          embedding: string | null
          id: string
          metadata: Json | null
          user_feedback: string | null
          user_id: string | null
          user_message: string
        }
        Insert: {
          bot_name: string
          bot_response: string
          bot_role: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          user_feedback?: string | null
          user_id?: string | null
          user_message: string
        }
        Update: {
          bot_name?: string
          bot_response?: string
          bot_role?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          metadata?: Json | null
          user_feedback?: string | null
          user_id?: string | null
          user_message?: string
        }
        Relationships: []
      }
      campaign_creatives: {
        Row: {
          call_to_action: string | null
          campaign_id: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          call_to_action?: string | null
          campaign_id: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          call_to_action?: string | null
          campaign_id?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_creatives_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      campaigns: {
        Row: {
          ad_platform: string | null
          budget: number | null
          company_id: string
          created_at: string
          creatives: Json | null
          deployment_status: string | null
          id: string
          last_synced_at: string | null
          management_fee: number | null
          name: string
          payment_status: string | null
          performance_metrics: Json | null
          platform: string | null
          platform_specific_id: string | null
          platform_status: string | null
          stripe_payment_id: string | null
          targeting: Json | null
          total_amount: number | null
        }
        Insert: {
          ad_platform?: string | null
          budget?: number | null
          company_id: string
          created_at?: string
          creatives?: Json | null
          deployment_status?: string | null
          id?: string
          last_synced_at?: string | null
          management_fee?: number | null
          name: string
          payment_status?: string | null
          performance_metrics?: Json | null
          platform?: string | null
          platform_specific_id?: string | null
          platform_status?: string | null
          stripe_payment_id?: string | null
          targeting?: Json | null
          total_amount?: number | null
        }
        Update: {
          ad_platform?: string | null
          budget?: number | null
          company_id?: string
          created_at?: string
          creatives?: Json | null
          deployment_status?: string | null
          id?: string
          last_synced_at?: string | null
          management_fee?: number | null
          name?: string
          payment_status?: string | null
          performance_metrics?: Json | null
          platform?: string | null
          platform_specific_id?: string | null
          platform_status?: string | null
          stripe_payment_id?: string | null
          targeting?: Json | null
          total_amount?: number | null
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
      communications: {
        Row: {
          ai_summary: string | null
          created_at: string
          created_by: string | null
          ended_at: string | null
          id: string
          lead_id: string
          meeting_link: string | null
          metadata: Json | null
          notes: string | null
          outcome: string | null
          scheduled_at: string | null
          status: string
          type: string
        }
        Insert: {
          ai_summary?: string | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          lead_id: string
          meeting_link?: string | null
          metadata?: Json | null
          notes?: string | null
          outcome?: string | null
          scheduled_at?: string | null
          status: string
          type: string
        }
        Update: {
          ai_summary?: string | null
          created_at?: string
          created_by?: string | null
          ended_at?: string | null
          id?: string
          lead_id?: string
          meeting_link?: string | null
          metadata?: Json | null
          notes?: string | null
          outcome?: string | null
          scheduled_at?: string | null
          status?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "communications_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          ai_workflow_data: Json | null
          ai_workflow_generated: boolean | null
          ai_workflow_generated_at: string | null
          created_at: string
          details: Json | null
          id: string
          industry: string | null
          name: string
        }
        Insert: {
          ai_workflow_data?: Json | null
          ai_workflow_generated?: boolean | null
          ai_workflow_generated_at?: string | null
          created_at?: string
          details?: Json | null
          id?: string
          industry?: string | null
          name: string
        }
        Update: {
          ai_workflow_data?: Json | null
          ai_workflow_generated?: boolean | null
          ai_workflow_generated_at?: string | null
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
      company_zoom_integrations: {
        Row: {
          access_token: string
          company_id: string
          created_at: string
          id: string
          is_connected: boolean
          refresh_token: string
          scope: string | null
          token_expires_at: string
          updated_at: string
        }
        Insert: {
          access_token: string
          company_id: string
          created_at?: string
          id?: string
          is_connected?: boolean
          refresh_token: string
          scope?: string | null
          token_expires_at: string
          updated_at?: string
        }
        Update: {
          access_token?: string
          company_id?: string
          created_at?: string
          id?: string
          is_connected?: boolean
          refresh_token?: string
          scope?: string | null
          token_expires_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_zoom_integrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_zoom_meetings: {
        Row: {
          agenda: string | null
          company_id: string
          created_at: string
          duration: number
          id: string
          join_url: string
          password: string | null
          start_time: string
          status: string
          topic: string
          updated_at: string
          zoom_meeting_id: string
        }
        Insert: {
          agenda?: string | null
          company_id: string
          created_at?: string
          duration?: number
          id?: string
          join_url: string
          password?: string | null
          start_time: string
          status?: string
          topic: string
          updated_at?: string
          zoom_meeting_id: string
        }
        Update: {
          agenda?: string | null
          company_id?: string
          created_at?: string
          duration?: number
          id?: string
          join_url?: string
          password?: string | null
          start_time?: string
          status?: string
          topic?: string
          updated_at?: string
          zoom_meeting_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_zoom_meetings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      debate_messages: {
        Row: {
          content: string
          created_at: string | null
          debate_id: string | null
          id: string
          sender: string
          sender_role: string | null
          sequence: number
        }
        Insert: {
          content: string
          created_at?: string | null
          debate_id?: string | null
          id?: string
          sender: string
          sender_role?: string | null
          sequence: number
        }
        Update: {
          content?: string
          created_at?: string | null
          debate_id?: string | null
          id?: string
          sender?: string
          sender_role?: string | null
          sequence?: number
        }
        Relationships: [
          {
            foreignKeyName: "debate_messages_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
        ]
      }
      debate_summaries: {
        Row: {
          content: string
          created_at: string | null
          debate_id: string | null
          id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          debate_id?: string | null
          id?: string
        }
        Update: {
          content?: string
          created_at?: string | null
          debate_id?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "debate_summaries_debate_id_fkey"
            columns: ["debate_id"]
            isOneToOne: false
            referencedRelation: "debates"
            referencedColumns: ["id"]
          },
        ]
      }
      debates: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          participants: Json
          status: string | null
          topic: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          participants: Json
          status?: string | null
          topic: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          participants?: Json
          status?: string | null
          topic?: string
          user_id?: string | null
        }
        Relationships: []
      }
      executive_actions: {
        Row: {
          completed_at: string | null
          created_at: string
          error: string | null
          id: string
          outcome: string | null
          performance_notes: string | null
          result: string | null
          status: string
          task: string
          triggered_by: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          error?: string | null
          id?: string
          outcome?: string | null
          performance_notes?: string | null
          result?: string | null
          status?: string
          task: string
          triggered_by: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          error?: string | null
          id?: string
          outcome?: string | null
          performance_notes?: string | null
          result?: string | null
          status?: string
          task?: string
          triggered_by?: string
        }
        Relationships: []
      }
      executive_debates: {
        Row: {
          created_at: string
          executive_name: string
          id: string
          opinion: string
          role: string
          task: string
          vote: string
        }
        Insert: {
          created_at?: string
          executive_name: string
          id?: string
          opinion: string
          role: string
          task: string
          vote: string
        }
        Update: {
          created_at?: string
          executive_name?: string
          id?: string
          opinion?: string
          role?: string
          task?: string
          vote?: string
        }
        Relationships: []
      }
      executive_decisions: {
        Row: {
          created_at: string
          executive_name: string
          executive_role: string
          id: string
          options: string[]
          priority: string | null
          reasoning: string | null
          risk_assessment: string | null
          selected_option: string
          task: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          executive_name: string
          executive_role: string
          id?: string
          options?: string[]
          priority?: string | null
          reasoning?: string | null
          risk_assessment?: string | null
          selected_option: string
          task: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          executive_name?: string
          executive_role?: string
          id?: string
          options?: string[]
          priority?: string | null
          reasoning?: string | null
          risk_assessment?: string | null
          selected_option?: string
          task?: string
          updated_at?: string
        }
        Relationships: []
      }
      executive_memory: {
        Row: {
          context_embedding: string | null
          decision: string
          executive_name: string
          id: string
          task: string
          timestamp: string
          user_id: string
        }
        Insert: {
          context_embedding?: string | null
          decision: string
          executive_name: string
          id?: string
          task: string
          timestamp?: string
          user_id: string
        }
        Update: {
          context_embedding?: string | null
          decision?: string
          executive_name?: string
          id?: string
          task?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      executive_messages: {
        Row: {
          created_at: string
          from_executive: string
          id: string
          message_content: string
          status: string
          task_link: string | null
          to_executive: string
        }
        Insert: {
          created_at?: string
          from_executive: string
          id?: string
          message_content: string
          status?: string
          task_link?: string | null
          to_executive: string
        }
        Update: {
          created_at?: string
          from_executive?: string
          id?: string
          message_content?: string
          status?: string
          task_link?: string | null
          to_executive?: string
        }
        Relationships: []
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
      learning_models: {
        Row: {
          bot_name: string
          bot_role: string
          created_at: string | null
          id: string
          negative_feedback_count: number | null
          positive_feedback_count: number | null
          topics: Json | null
          updated_at: string | null
        }
        Insert: {
          bot_name: string
          bot_role: string
          created_at?: string | null
          id?: string
          negative_feedback_count?: number | null
          positive_feedback_count?: number | null
          topics?: Json | null
          updated_at?: string | null
        }
        Update: {
          bot_name?: string
          bot_role?: string
          created_at?: string | null
          id?: string
          negative_feedback_count?: number | null
          positive_feedback_count?: number | null
          topics?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          company_id: string | null
          created_at: string
          email: string | null
          id: string
          industry: string | null
          location: string | null
          name: string | null
          onboarding_completed: boolean | null
          onboarding_completed_at: string | null
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
          email?: string | null
          id: string
          industry?: string | null
          location?: string | null
          name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
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
          email?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          name?: string | null
          onboarding_completed?: boolean | null
          onboarding_completed_at?: string | null
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
      social_media_posts: {
        Row: {
          approval_notes: string | null
          author_id: string | null
          campaign_id: string | null
          company_id: string
          content: string
          content_type: string
          created_at: string
          hashtags: string[] | null
          id: string
          is_approved: boolean | null
          link_url: string | null
          location: string | null
          media_urls: string[] | null
          mentions: string[] | null
          platform: string
          publish_time: string | null
          published_date: string | null
          scheduled_date: string
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          approval_notes?: string | null
          author_id?: string | null
          campaign_id?: string | null
          company_id: string
          content: string
          content_type: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          is_approved?: boolean | null
          link_url?: string | null
          location?: string | null
          media_urls?: string[] | null
          mentions?: string[] | null
          platform: string
          publish_time?: string | null
          published_date?: string | null
          scheduled_date: string
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          approval_notes?: string | null
          author_id?: string | null
          campaign_id?: string | null
          company_id?: string
          content?: string
          content_type?: string
          created_at?: string
          hashtags?: string[] | null
          id?: string
          is_approved?: boolean | null
          link_url?: string | null
          location?: string | null
          media_urls?: string[] | null
          mentions?: string[] | null
          platform?: string
          publish_time?: string | null
          published_date?: string | null
          scheduled_date?: string
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_posts_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_media_posts_company_id_fkey"
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
      user_feedback: {
        Row: {
          bot_name: string
          bot_role: string
          comment: string | null
          created_at: string | null
          id: string
          interaction_id: string | null
          is_positive: boolean
          message_id: string | null
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          bot_name: string
          bot_role: string
          comment?: string | null
          created_at?: string | null
          id?: string
          interaction_id?: string | null
          is_positive: boolean
          message_id?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          bot_name?: string
          bot_role?: string
          comment?: string | null
          created_at?: string | null
          id?: string
          interaction_id?: string | null
          is_positive?: boolean
          message_id?: string | null
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_legal_acceptances: {
        Row: {
          accepted_at: string
          consent_version: string
          id: string
          ip_address: string | null
          messaging_consent: boolean
          privacy_policy: boolean
          privacy_version: string
          terms_of_service: boolean
          terms_version: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          accepted_at?: string
          consent_version: string
          id?: string
          ip_address?: string | null
          messaging_consent?: boolean
          privacy_policy?: boolean
          privacy_version: string
          terms_of_service?: boolean
          terms_version: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          accepted_at?: string
          consent_version?: string
          id?: string
          ip_address?: string | null
          messaging_consent?: boolean
          privacy_policy?: boolean
          privacy_version?: string
          terms_of_service?: boolean
          terms_version?: string
          user_agent?: string | null
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
          tone: string | null
          user_id: string
          writing_style: string | null
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
          tone?: string | null
          user_id: string
          writing_style?: string | null
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
          tone?: string | null
          user_id?: string
          writing_style?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      check_function_exists: {
        Args: { function_name: string }
        Returns: {
          function_exists: boolean
          is_secure: boolean
        }[]
      }
      check_rls_enabled: {
        Args: { table_name: string }
        Returns: {
          rls_enabled: boolean
        }[]
      }
      check_table_rls: {
        Args: { table_name: string }
        Returns: boolean
      }
      get_company_integrations: {
        Args: { p_company_id: string }
        Returns: {
          id: string
          company_id: string
          integration_ids: Json
          created_at: string
        }[]
      }
      get_lead_communication_summary: {
        Args: { p_lead_id: string }
        Returns: {
          lead_id: string
          total_communications: number
          last_communication_at: string
          last_communication_type: string
          last_communication_status: string
          scheduled_communications: number
        }[]
      }
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
      get_security_settings: {
        Args: Record<PropertyKey, never>
        Returns: Json
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
          tone: string | null
          user_id: string
          writing_style: string | null
        }
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      insert_company_integrations: {
        Args: { p_company_id: string; p_integration_ids: Json }
        Returns: undefined
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
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_company_integrations: {
        Args: { p_company_id: string; p_integration_ids: Json }
        Returns: undefined
      }
      update_security_settings: {
        Args: { p_settings: Json }
        Returns: boolean
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
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
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
