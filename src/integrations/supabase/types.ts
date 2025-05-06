export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      activity_feed: {
        Row: {
          actor: string;
          created_at: string;
          id: string;
          payload: Json | null;
          type: string;
        };
        Insert: {
          actor: string;
          created_at?: string;
          id?: string;
          payload?: Json | null;
          type: string;
        };
        Update: {
          actor?: string;
          created_at?: string;
          id?: string;
          payload?: Json | null;
          type?: string;
        };
        Relationships: [];
      };
      agent_briefings: {
        Row: {
          agent_name: string;
          audio_url: string | null;
          created_at: string;
          id: string;
          script: string;
          tenant_id: string;
          video_url: string | null;
        };
        Insert: {
          agent_name: string;
          audio_url?: string | null;
          created_at?: string;
          id?: string;
          script: string;
          tenant_id: string;
          video_url?: string | null;
        };
        Update: {
          agent_name?: string;
          audio_url?: string | null;
          created_at?: string;
          id?: string;
          script?: string;
          tenant_id?: string;
          video_url?: string | null;
        };
        Relationships: [];
      };
      agent_conversations: {
        Row: {
          agent_name: string;
          content: string;
          created_at: string;
          id: string;
          role: string;
          tenant_id: string;
        };
        Insert: {
          agent_name: string;
          content: string;
          created_at?: string;
          id?: string;
          role: string;
          tenant_id: string;
        };
        Update: {
          agent_name?: string;
          content?: string;
          created_at?: string;
          id?: string;
          role?: string;
          tenant_id?: string;
        };
        Relationships: [];
      };
      agent_logs: {
        Row: {
          agent_id: string;
          created_at: string | null;
          id: string;
          success: boolean | null;
          task: string | null;
          tenant_id: string;
          xp: number | null;
        };
        Insert: {
          agent_id: string;
          created_at?: string | null;
          id?: string;
          success?: boolean | null;
          task?: string | null;
          tenant_id: string;
          xp?: number | null;
        };
        Update: {
          agent_id?: string;
          created_at?: string | null;
          id?: string;
          success?: boolean | null;
          task?: string | null;
          tenant_id?: string;
          xp?: number | null;
        };
        Relationships: [];
      };
      agent_memory: {
        Row: {
          agent: string;
          created_at: string;
          id: string;
          performance: string;
          strategy_id: string;
          tags: string[] | null;
          tenant_id: string;
        };
        Insert: {
          agent: string;
          created_at?: string;
          id?: string;
          performance: string;
          strategy_id: string;
          tags?: string[] | null;
          tenant_id: string;
        };
        Update: {
          agent?: string;
          created_at?: string;
          id?: string;
          performance?: string;
          strategy_id?: string;
          tags?: string[] | null;
          tenant_id?: string;
        };
        Relationships: [];
      };
      agent_mentorships: {
        Row: {
          created_at: string;
          mentee: string;
          mentor: string;
          shared_tags: string[] | null;
          status: string;
        };
        Insert: {
          created_at?: string;
          mentee: string;
          mentor: string;
          shared_tags?: string[] | null;
          status?: string;
        };
        Update: {
          created_at?: string;
          mentee?: string;
          mentor?: string;
          shared_tags?: string[] | null;
          status?: string;
        };
        Relationships: [];
      };
      agent_win_logs: {
        Row: {
          agent_id: string;
          created_at: string | null;
          description: string | null;
          id: string;
          is_published: boolean | null;
          tenant_id: string;
          xp: number | null;
        };
        Insert: {
          agent_id: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_published?: boolean | null;
          tenant_id: string;
          xp?: number | null;
        };
        Update: {
          agent_id?: string;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_published?: boolean | null;
          tenant_id?: string;
          xp?: number | null;
        };
        Relationships: [];
      };
      agent_win_votes: {
        Row: {
          created_at: string | null;
          id: string;
          upvote: boolean | null;
          user_id: string | null;
          win_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          upvote?: boolean | null;
          user_id?: string | null;
          win_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          upvote?: boolean | null;
          user_id?: string | null;
          win_id?: string | null;
        };
        Relationships: [];
      };
      ai_suggestions: {
        Row: {
          applied: boolean | null;
          category: string | null;
          created_at: string;
          feedback: string | null;
          id: string;
          message: string;
          source: string | null;
          tenant_id: string | null;
        };
        Insert: {
          applied?: boolean | null;
          category?: string | null;
          created_at?: string;
          feedback?: string | null;
          id?: string;
          message: string;
          source?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          applied?: boolean | null;
          category?: string | null;
          created_at?: string;
          feedback?: string | null;
          id?: string;
          message?: string;
          source?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_suggestions_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "ai_suggestions_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "ai_suggestions_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      ai_tasks: {
        Row: {
          assigned_to: string | null;
          completed_at: string | null;
          created_at: string | null;
          deadline: string | null;
          id: string;
          next_recommendation: string | null;
          output: string | null;
          status: string | null;
          strategy_id: string | null;
          task: string | null;
          tenant_id: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          id?: string;
          next_recommendation?: string | null;
          output?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          task?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          completed_at?: string | null;
          created_at?: string | null;
          deadline?: string | null;
          id?: string;
          next_recommendation?: string | null;
          output?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          task?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "ai_tasks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_tasks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "ai_tasks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "ai_tasks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "ai_tasks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "ai_tasks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      api_keys: {
        Row: {
          created_at: string | null;
          id: string;
          key: string | null;
          name: string | null;
          tenant_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          key?: string | null;
          name?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          key?: string | null;
          name?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "api_keys_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "api_keys_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "api_keys_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      approval_logs: {
        Row: {
          approved: boolean | null;
          approved_by: string | null;
          created_at: string | null;
          feedback: string | null;
          id: string;
          strategy_id: string | null;
          tenant_id: string | null;
          video_url: string | null;
        };
        Insert: {
          approved?: boolean | null;
          approved_by?: string | null;
          created_at?: string | null;
          feedback?: string | null;
          id?: string;
          strategy_id?: string | null;
          tenant_id?: string | null;
          video_url?: string | null;
        };
        Update: {
          approved?: boolean | null;
          approved_by?: string | null;
          created_at?: string | null;
          feedback?: string | null;
          id?: string;
          strategy_id?: string | null;
          tenant_id?: string | null;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "approval_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "approval_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "approval_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "approval_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "approval_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "approval_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      audit_logs: {
        Row: {
          action: string;
          details: Json | null;
          export_log_id: string | null;
          id: string;
          resource: string | null;
          result: string | null;
          tenant_id: string | null;
          timestamp: string | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          details?: Json | null;
          export_log_id?: string | null;
          id?: string;
          resource?: string | null;
          result?: string | null;
          tenant_id?: string | null;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          details?: Json | null;
          export_log_id?: string | null;
          id?: string;
          resource?: string | null;
          result?: string | null;
          tenant_id?: string | null;
          timestamp?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "audit_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "audit_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      benchmark_metrics: {
        Row: {
          avg_cpl: number | null;
          avg_strategy_score: number | null;
          created_at: string;
          id: string;
          tenant_id: string;
          top_strategies: number | null;
          total_mrr: number | null;
          updated_at: string;
        };
        Insert: {
          avg_cpl?: number | null;
          avg_strategy_score?: number | null;
          created_at?: string;
          id?: string;
          tenant_id: string;
          top_strategies?: number | null;
          total_mrr?: number | null;
          updated_at?: string;
        };
        Update: {
          avg_cpl?: number | null;
          avg_strategy_score?: number | null;
          created_at?: string;
          id?: string;
          tenant_id?: string;
          top_strategies?: number | null;
          total_mrr?: number | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      benchmarks: {
        Row: {
          comparison: string | null;
          id: string;
          metric: string;
          target: number | null;
          tenant_id: string;
          updated_at: string | null;
          value: number;
        };
        Insert: {
          comparison?: string | null;
          id?: string;
          metric: string;
          target?: number | null;
          tenant_id: string;
          updated_at?: string | null;
          value: number;
        };
        Update: {
          comparison?: string | null;
          id?: string;
          metric?: string;
          target?: number | null;
          tenant_id?: string;
          updated_at?: string | null;
          value?: number;
        };
        Relationships: [];
      };
      billing_profiles: {
        Row: {
          created_at: string | null;
          credits: number | null;
          plan: string | null;
          reset_date: string | null;
          tenant_id: string | null;
          usage_credits: number | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          credits?: number | null;
          plan?: string | null;
          reset_date?: string | null;
          tenant_id?: string | null;
          usage_credits?: number | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          credits?: number | null;
          plan?: string | null;
          reset_date?: string | null;
          tenant_id?: string | null;
          usage_credits?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "billing_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "billing_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "billing_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      campaign_experiments: {
        Row: {
          campaign_id: string | null;
          cost_usd: number | null;
          created_at: string | null;
          id: string;
          implementation_notes: string | null;
          leads_generated: number | null;
          original_name: string;
          promoted: boolean | null;
          revenue_usd: number | null;
          suggestion: string;
          synced: boolean | null;
          synced_at: string | null;
          tenant_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          campaign_id?: string | null;
          cost_usd?: number | null;
          created_at?: string | null;
          id?: string;
          implementation_notes?: string | null;
          leads_generated?: number | null;
          original_name: string;
          promoted?: boolean | null;
          revenue_usd?: number | null;
          suggestion: string;
          synced?: boolean | null;
          synced_at?: string | null;
          tenant_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          campaign_id?: string | null;
          cost_usd?: number | null;
          created_at?: string | null;
          id?: string;
          implementation_notes?: string | null;
          leads_generated?: number | null;
          original_name?: string;
          promoted?: boolean | null;
          revenue_usd?: number | null;
          suggestion?: string;
          synced?: boolean | null;
          synced_at?: string | null;
          tenant_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_experiments_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_experiments_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_experiments_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      campaign_leads: {
        Row: {
          campaign_id: string | null;
          campaign_name: string | null;
          created_at: string | null;
          email: string | null;
          id: string;
          phone: string | null;
          strategy_id: string | null;
          tenant_id: string | null;
        };
        Insert: {
          campaign_id?: string | null;
          campaign_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          phone?: string | null;
          strategy_id?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          campaign_id?: string | null;
          campaign_name?: string | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          phone?: string | null;
          strategy_id?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_leads_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaign_leads_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaign_leads_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      campaign_metrics: {
        Row: {
          campaign_id: string | null;
          cost_usd: number | null;
          created_at: string | null;
          id: string;
          revenue_usd: number | null;
          tenant_id: string;
        };
        Insert: {
          campaign_id?: string | null;
          cost_usd?: number | null;
          created_at?: string | null;
          id?: string;
          revenue_usd?: number | null;
          tenant_id: string;
        };
        Update: {
          campaign_id?: string | null;
          cost_usd?: number | null;
          created_at?: string | null;
          id?: string;
          revenue_usd?: number | null;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_metrics_campaign_id_fkey";
            columns: ["campaign_id"];
            isOneToOne: false;
            referencedRelation: "campaigns";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaign_metrics_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_metrics_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_metrics_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      campaigns: {
        Row: {
          channel: string | null;
          created_at: string | null;
          id: string;
          roi: number | null;
          start_date: string | null;
          status: string | null;
          strategy_id: string | null;
          summary: string | null;
          tags: string[] | null;
          tenant_id: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          channel?: string | null;
          created_at?: string | null;
          id?: string;
          roi?: number | null;
          start_date?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          summary?: string | null;
          tags?: string[] | null;
          tenant_id?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          channel?: string | null;
          created_at?: string | null;
          id?: string;
          roi?: number | null;
          start_date?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          summary?: string | null;
          tags?: string[] | null;
          tenant_id?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaigns_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaigns_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "campaigns_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "campaigns_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaigns_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaigns_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      certification_status: {
        Row: {
          badge_url: string | null;
          id: string;
          score: number | null;
          status: string | null;
          user_id: string | null;
        };
        Insert: {
          badge_url?: string | null;
          id?: string;
          score?: number | null;
          status?: string | null;
          user_id?: string | null;
        };
        Update: {
          badge_url?: string | null;
          id?: string;
          score?: number | null;
          status?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "certification_status_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      coaching_insights: {
        Row: {
          category: string | null;
          content: string;
          created_at: string | null;
          id: string;
          strategy_focus: string | null;
          tenant_id: string | null;
        };
        Insert: {
          category?: string | null;
          content: string;
          created_at?: string | null;
          id?: string;
          strategy_focus?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          category?: string | null;
          content?: string;
          created_at?: string | null;
          id?: string;
          strategy_focus?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "coaching_insights_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "coaching_insights_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "coaching_insights_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      company_profiles: {
        Row: {
          company_name: string;
          created_at: string | null;
          current_mrr: number | null;
          has_active_sales_team: boolean | null;
          id: string;
          industry: string | null;
          offers: string[] | null;
          pricing_model: string | null;
          revenue_goal: number | null;
          sales_channels: string[] | null;
          shopify_connected: boolean | null;
          target_customer: string | null;
          tenant_id: string | null;
          tone_of_voice: string | null;
          updated_at: string | null;
          website_url: string | null;
        };
        Insert: {
          company_name: string;
          created_at?: string | null;
          current_mrr?: number | null;
          has_active_sales_team?: boolean | null;
          id?: string;
          industry?: string | null;
          offers?: string[] | null;
          pricing_model?: string | null;
          revenue_goal?: number | null;
          sales_channels?: string[] | null;
          shopify_connected?: boolean | null;
          target_customer?: string | null;
          tenant_id?: string | null;
          tone_of_voice?: string | null;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Update: {
          company_name?: string;
          created_at?: string | null;
          current_mrr?: number | null;
          has_active_sales_team?: boolean | null;
          id?: string;
          industry?: string | null;
          offers?: string[] | null;
          pricing_model?: string | null;
          revenue_goal?: number | null;
          sales_channels?: string[] | null;
          shopify_connected?: boolean | null;
          target_customer?: string | null;
          tenant_id?: string | null;
          tone_of_voice?: string | null;
          updated_at?: string | null;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      credit_logs: {
        Row: {
          amount: number | null;
          created_at: string | null;
          credits_added: number | null;
          email: string | null;
          id: string;
          session_id: string | null;
          source: string | null;
          tenant_id: string;
        };
        Insert: {
          amount?: number | null;
          created_at?: string | null;
          credits_added?: number | null;
          email?: string | null;
          id?: string;
          session_id?: string | null;
          source?: string | null;
          tenant_id: string;
        };
        Update: {
          amount?: number | null;
          created_at?: string | null;
          credits_added?: number | null;
          email?: string | null;
          id?: string;
          session_id?: string | null;
          source?: string | null;
          tenant_id?: string;
        };
        Relationships: [];
      };
      demo_conversion_logs: {
        Row: {
          id: string;
          sandbox_engaged: boolean | null;
          session_id: string | null;
          signed_up_at: string | null;
          started_at: string | null;
        };
        Insert: {
          id?: string;
          sandbox_engaged?: boolean | null;
          session_id?: string | null;
          signed_up_at?: string | null;
          started_at?: string | null;
        };
        Update: {
          id?: string;
          sandbox_engaged?: boolean | null;
          session_id?: string | null;
          signed_up_at?: string | null;
          started_at?: string | null;
        };
        Relationships: [];
      };
      email_logs: {
        Row: {
          error: string | null;
          id: string;
          recipient: string | null;
          status: string;
          subject: string | null;
          tenant_id: string;
          timestamp: string;
        };
        Insert: {
          error?: string | null;
          id?: string;
          recipient?: string | null;
          status: string;
          subject?: string | null;
          tenant_id: string;
          timestamp?: string;
        };
        Update: {
          error?: string | null;
          id?: string;
          recipient?: string | null;
          status?: string;
          subject?: string | null;
          tenant_id?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
      executive_actions: {
        Row: {
          completed_at: string | null;
          created_at: string | null;
          error: string | null;
          executive_name: string | null;
          executive_role: string | null;
          id: string;
          outcome: string | null;
          performance_notes: string | null;
          result: string | null;
          status: string | null;
          task: string;
          triggered_by: string | null;
        };
        Insert: {
          completed_at?: string | null;
          created_at?: string | null;
          error?: string | null;
          executive_name?: string | null;
          executive_role?: string | null;
          id?: string;
          outcome?: string | null;
          performance_notes?: string | null;
          result?: string | null;
          status?: string | null;
          task: string;
          triggered_by?: string | null;
        };
        Update: {
          completed_at?: string | null;
          created_at?: string | null;
          error?: string | null;
          executive_name?: string | null;
          executive_role?: string | null;
          id?: string;
          outcome?: string | null;
          performance_notes?: string | null;
          result?: string | null;
          status?: string | null;
          task?: string;
          triggered_by?: string | null;
        };
        Relationships: [];
      };
      executive_decisions: {
        Row: {
          created_at: string | null;
          executive_name: string;
          executive_role: string;
          id: string;
          options: string[];
          priority: string | null;
          reasoning: string | null;
          risk_assessment: string | null;
          selected_option: string;
          task: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          executive_name: string;
          executive_role: string;
          id?: string;
          options: string[];
          priority?: string | null;
          reasoning?: string | null;
          risk_assessment?: string | null;
          selected_option: string;
          task: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          executive_name?: string;
          executive_role?: string;
          id?: string;
          options?: string[];
          priority?: string | null;
          reasoning?: string | null;
          risk_assessment?: string | null;
          selected_option?: string;
          task?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      executive_memory: {
        Row: {
          decision: string;
          executive_name: string;
          id: string;
          task: string;
          timestamp: string | null;
          user_id: string;
        };
        Insert: {
          decision: string;
          executive_name: string;
          id?: string;
          task: string;
          timestamp?: string | null;
          user_id: string;
        };
        Update: {
          decision?: string;
          executive_name?: string;
          id?: string;
          task?: string;
          timestamp?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
      executive_messages: {
        Row: {
          created_at: string | null;
          from_executive: string;
          id: string;
          message_content: string;
          status: string | null;
          to_executive: string;
        };
        Insert: {
          created_at?: string | null;
          from_executive: string;
          id?: string;
          message_content: string;
          status?: string | null;
          to_executive: string;
        };
        Update: {
          created_at?: string | null;
          from_executive?: string;
          id?: string;
          message_content?: string;
          status?: string | null;
          to_executive?: string;
        };
        Relationships: [];
      };
      export_logs: {
        Row: {
          crm_status: string | null;
          drive_url: string | null;
          id: string;
          notion_url: string | null;
          slack_status: string | null;
          tenant_id: string;
          timestamp: string | null;
        };
        Insert: {
          crm_status?: string | null;
          drive_url?: string | null;
          id?: string;
          notion_url?: string | null;
          slack_status?: string | null;
          tenant_id: string;
          timestamp?: string | null;
        };
        Update: {
          crm_status?: string | null;
          drive_url?: string | null;
          id?: string;
          notion_url?: string | null;
          slack_status?: string | null;
          tenant_id?: string;
          timestamp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "export_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "export_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "export_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      founder_guilds: {
        Row: {
          access_type: string | null;
          created_at: string | null;
          created_by: string | null;
          id: string;
          industry: string | null;
          name: string | null;
        };
        Insert: {
          access_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          industry?: string | null;
          name?: string | null;
        };
        Update: {
          access_type?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          industry?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "founder_guilds_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      galaxy_playbooks: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description: string | null;
          downloads: number | null;
          id: string;
          industry: string | null;
          strategy_id: string | null;
          title: string;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          downloads?: number | null;
          id?: string;
          industry?: string | null;
          strategy_id?: string | null;
          title: string;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description?: string | null;
          downloads?: number | null;
          id?: string;
          industry?: string | null;
          strategy_id?: string | null;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "galaxy_playbooks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "galaxy_playbooks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "galaxy_playbooks_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      insight_feedback: {
        Row: {
          created_at: string | null;
          feedback: string;
          id: string;
          insight_id: string;
        };
        Insert: {
          created_at?: string | null;
          feedback: string;
          id?: string;
          insight_id: string;
        };
        Update: {
          created_at?: string | null;
          feedback?: string;
          id?: string;
          insight_id?: string;
        };
        Relationships: [];
      };
      kpi_metrics: {
        Row: {
          id: string;
          recorded_at: string | null;
          strategy_id: string | null;
          tenant_id: string;
          type: string;
          value: number;
        };
        Insert: {
          id?: string;
          recorded_at?: string | null;
          strategy_id?: string | null;
          tenant_id: string;
          type: string;
          value: number;
        };
        Update: {
          id?: string;
          recorded_at?: string | null;
          strategy_id?: string | null;
          tenant_id?: string;
          type?: string;
          value?: number;
        };
        Relationships: [];
      };
      kpi_reports: {
        Row: {
          bounce_status: string | null;
          chart_image_urls: string[] | null;
          click_rate: number | null;
          created_at: string;
          id: string;
          open_rate: number | null;
          opens_a: number | null;
          opens_b: number | null;
          pdf_url: string | null;
          subject_a: string | null;
          subject_b: string | null;
          summary: string;
          tenant_id: string;
        };
        Insert: {
          bounce_status?: string | null;
          chart_image_urls?: string[] | null;
          click_rate?: number | null;
          created_at?: string;
          id?: string;
          open_rate?: number | null;
          opens_a?: number | null;
          opens_b?: number | null;
          pdf_url?: string | null;
          subject_a?: string | null;
          subject_b?: string | null;
          summary: string;
          tenant_id: string;
        };
        Update: {
          bounce_status?: string | null;
          chart_image_urls?: string[] | null;
          click_rate?: number | null;
          created_at?: string;
          id?: string;
          open_rate?: number | null;
          opens_a?: number | null;
          opens_b?: number | null;
          pdf_url?: string | null;
          subject_a?: string | null;
          subject_b?: string | null;
          summary?: string;
          tenant_id?: string;
        };
        Relationships: [];
      };
      launch_list: {
        Row: {
          company: string | null;
          created_at: string | null;
          email: string;
          id: string;
          name: string | null;
          referral_code: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string | null;
          email: string;
          id?: string;
          name?: string | null;
          referral_code?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string | null;
          email?: string;
          id?: string;
          name?: string | null;
          referral_code?: string | null;
        };
        Relationships: [];
      };
      lead_auto_replies: {
        Row: {
          created_at: string | null;
          id: string;
          lead_id: string | null;
          response: Json | null;
          status: string;
          tenant_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          lead_id?: string | null;
          response?: Json | null;
          status?: string;
          tenant_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          lead_id?: string | null;
          response?: Json | null;
          status?: string;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "lead_auto_replies_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "campaign_leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_auto_replies_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "lead_engagement_summary";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lead_auto_replies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "lead_auto_replies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "lead_auto_replies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      marketplace_pros: {
        Row: {
          bio: string | null;
          contact_url: string | null;
          created_at: string;
          id: string;
          industry_tags: string[] | null;
          is_verified: boolean | null;
          languages: string[] | null;
          location: string | null;
          name: string;
          profile_image_url: string | null;
          role: string;
          tenant_id: string | null;
        };
        Insert: {
          bio?: string | null;
          contact_url?: string | null;
          created_at?: string;
          id?: string;
          industry_tags?: string[] | null;
          is_verified?: boolean | null;
          languages?: string[] | null;
          location?: string | null;
          name: string;
          profile_image_url?: string | null;
          role: string;
          tenant_id?: string | null;
        };
        Update: {
          bio?: string | null;
          contact_url?: string | null;
          created_at?: string;
          id?: string;
          industry_tags?: string[] | null;
          is_verified?: boolean | null;
          languages?: string[] | null;
          location?: string | null;
          name?: string;
          profile_image_url?: string | null;
          role?: string;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "marketplace_pros_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "marketplace_pros_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "marketplace_pros_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      moderation_queue: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          reason: string;
          status: string;
          type: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          reason: string;
          status?: string;
          type: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          reason?: string;
          status?: string;
          type?: string;
        };
        Relationships: [];
      };
      plugin_config: {
        Row: {
          config: Json | null;
          created_at: string | null;
          id: string;
          plugin_slug: string;
          tenant_id: string;
          updated_at: string | null;
        };
        Insert: {
          config?: Json | null;
          created_at?: string | null;
          id?: string;
          plugin_slug: string;
          tenant_id: string;
          updated_at?: string | null;
        };
        Update: {
          config?: Json | null;
          created_at?: string | null;
          id?: string;
          plugin_slug?: string;
          tenant_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plugin_config_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_config_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_config_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      plugin_logs: {
        Row: {
          created_at: string | null;
          event: string;
          id: string;
          plugin_name: string;
          tenant_id: string | null;
          value: number | null;
        };
        Insert: {
          created_at?: string | null;
          event: string;
          id?: string;
          plugin_name: string;
          tenant_id?: string | null;
          value?: number | null;
        };
        Update: {
          created_at?: string | null;
          event?: string;
          id?: string;
          plugin_name?: string;
          tenant_id?: string | null;
          value?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "plugin_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      plugin_usage_logs: {
        Row: {
          call_type: string | null;
          created_at: string | null;
          id: string;
          plugin_slug: string;
          result: Json | null;
          tenant_id: string | null;
        };
        Insert: {
          call_type?: string | null;
          created_at?: string | null;
          id?: string;
          plugin_slug: string;
          result?: Json | null;
          tenant_id?: string | null;
        };
        Update: {
          call_type?: string | null;
          created_at?: string | null;
          id?: string;
          plugin_slug?: string;
          result?: Json | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "plugin_usage_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_usage_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "plugin_usage_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      plugins: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          integration_url: string | null;
          name: string;
          slug: string;
          tags: string[] | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          integration_url?: string | null;
          name: string;
          slug: string;
          tags?: string[] | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          integration_url?: string | null;
          name?: string;
          slug?: string;
          tags?: string[] | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          ai_consent_timestamp: string | null;
          ai_strategy_consent: boolean | null;
          created_at: string | null;
          email: string | null;
          id: string;
          industry: string | null;
          name: string | null;
          onboarding_complete: boolean | null;
          onboarding_step: string | null;
          role: string | null;
          strategy_focus: string[] | null;
          strategy_preferences: string[] | null;
          tenant_id: string | null;
          updated_at: string | null;
        };
        Insert: {
          ai_consent_timestamp?: string | null;
          ai_strategy_consent?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          id: string;
          industry?: string | null;
          name?: string | null;
          onboarding_complete?: boolean | null;
          onboarding_step?: string | null;
          role?: string | null;
          strategy_focus?: string[] | null;
          strategy_preferences?: string[] | null;
          tenant_id?: string | null;
          updated_at?: string | null;
        };
        Update: {
          ai_consent_timestamp?: string | null;
          ai_strategy_consent?: boolean | null;
          created_at?: string | null;
          email?: string | null;
          id?: string;
          industry?: string | null;
          name?: string | null;
          onboarding_complete?: boolean | null;
          onboarding_step?: string | null;
          role?: string | null;
          strategy_focus?: string[] | null;
          strategy_preferences?: string[] | null;
          tenant_id?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      referral_links: {
        Row: {
          bonus_unlocked: boolean | null;
          code: string | null;
          id: string;
          user_id: string | null;
          uses: number | null;
        };
        Insert: {
          bonus_unlocked?: boolean | null;
          code?: string | null;
          id?: string;
          user_id?: string | null;
          uses?: number | null;
        };
        Update: {
          bonus_unlocked?: boolean | null;
          code?: string | null;
          id?: string;
          user_id?: string | null;
          uses?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "referral_links_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      shopify_stores: {
        Row: {
          access_token: string | null;
          connected_at: string | null;
          id: string;
          scope: string | null;
          shop_domain: string | null;
          tenant_id: string | null;
        };
        Insert: {
          access_token?: string | null;
          connected_at?: string | null;
          id?: string;
          scope?: string | null;
          shop_domain?: string | null;
          tenant_id?: string | null;
        };
        Update: {
          access_token?: string | null;
          connected_at?: string | null;
          id?: string;
          scope?: string | null;
          shop_domain?: string | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "shopify_stores_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "shopify_stores_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "shopify_stores_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      startup_followers: {
        Row: {
          created_at: string | null;
          followed_tenant_id: string | null;
          follower_id: string | null;
          id: string;
        };
        Insert: {
          created_at?: string | null;
          followed_tenant_id?: string | null;
          follower_id?: string | null;
          id?: string;
        };
        Update: {
          created_at?: string | null;
          followed_tenant_id?: string | null;
          follower_id?: string | null;
          id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "startup_followers_followed_tenant_id_fkey";
            columns: ["followed_tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_followers_followed_tenant_id_fkey";
            columns: ["followed_tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_followers_followed_tenant_id_fkey";
            columns: ["followed_tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      startup_kits: {
        Row: {
          created_at: string | null;
          description: string | null;
          id: string;
          is_public: boolean | null;
          items: string[] | null;
          tenant_id: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean | null;
          items?: string[] | null;
          tenant_id?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string | null;
          id?: string;
          is_public?: boolean | null;
          items?: string[] | null;
          tenant_id?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "startup_kits_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_kits_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_kits_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      startup_vault: {
        Row: {
          category: string | null;
          content: string;
          contributor_id: string | null;
          created_at: string | null;
          id: string;
          label: string;
          remix_of: string | null;
          tags: string[] | null;
          tenant_id: string | null;
          type: string;
        };
        Insert: {
          category?: string | null;
          content: string;
          contributor_id?: string | null;
          created_at?: string | null;
          id?: string;
          label: string;
          remix_of?: string | null;
          tags?: string[] | null;
          tenant_id?: string | null;
          type: string;
        };
        Update: {
          category?: string | null;
          content?: string;
          contributor_id?: string | null;
          created_at?: string | null;
          id?: string;
          label?: string;
          remix_of?: string | null;
          tags?: string[] | null;
          tenant_id?: string | null;
          type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "startup_vault_remix_of_fkey";
            columns: ["remix_of"];
            isOneToOne: false;
            referencedRelation: "startup_vault";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "startup_vault_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_vault_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "startup_vault_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategies: {
        Row: {
          created_at: string | null;
          duration: number | null;
          estimated_budget: number | null;
          id: string;
          industry: string | null;
          launch_date: string | null;
          priority: string | null;
          priority_justification: string | null;
          status: string | null;
          summary: string | null;
          tenant_id: string | null;
          title: string | null;
        };
        Insert: {
          created_at?: string | null;
          duration?: number | null;
          estimated_budget?: number | null;
          id?: string;
          industry?: string | null;
          launch_date?: string | null;
          priority?: string | null;
          priority_justification?: string | null;
          status?: string | null;
          summary?: string | null;
          tenant_id?: string | null;
          title?: string | null;
        };
        Update: {
          created_at?: string | null;
          duration?: number | null;
          estimated_budget?: number | null;
          id?: string;
          industry?: string | null;
          launch_date?: string | null;
          priority?: string | null;
          priority_justification?: string | null;
          status?: string | null;
          summary?: string | null;
          tenant_id?: string | null;
          title?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_board: {
        Row: {
          ai_feedback: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          tags: string[] | null;
          tenant_id: string | null;
          title: string;
          updated_at: string | null;
        };
        Insert: {
          ai_feedback?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          tags?: string[] | null;
          tenant_id?: string | null;
          title: string;
          updated_at?: string | null;
        };
        Update: {
          ai_feedback?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          tags?: string[] | null;
          tenant_id?: string | null;
          title?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_board_tenant";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_board_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_board_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_board_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_briefing_videos: {
        Row: {
          created_at: string;
          id: string;
          pdf_url: string | null;
          strategy_id: string | null;
          summary: string;
          tenant_id: string;
          video_url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          pdf_url?: string | null;
          strategy_id?: string | null;
          summary: string;
          tenant_id: string;
          video_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          pdf_url?: string | null;
          strategy_id?: string | null;
          summary?: string;
          tenant_id?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_briefing_strategy_id";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_board";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_briefing_tenant";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_briefing_videos_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_briefing_videos_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_briefing_videos_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      strategy_collaborations: {
        Row: {
          created_at: string | null;
          id: string;
          shared_title: string | null;
          status: string | null;
          strategy_id: string | null;
          with_tenant_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          shared_title?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          with_tenant_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          shared_title?: string | null;
          status?: string | null;
          strategy_id?: string | null;
          with_tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_collaborations_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_collaborations_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_collaborations_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "strategy_collaborations_with_tenant_id_fkey";
            columns: ["with_tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_collaborations_with_tenant_id_fkey";
            columns: ["with_tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_collaborations_with_tenant_id_fkey";
            columns: ["with_tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_decision_logs: {
        Row: {
          action: string;
          created_at: string | null;
          id: string;
          strategy_id: string;
          tenant_id: string;
          timestamp: string;
        };
        Insert: {
          action: string;
          created_at?: string | null;
          id?: string;
          strategy_id: string;
          tenant_id: string;
          timestamp?: string;
        };
        Update: {
          action?: string;
          created_at?: string | null;
          id?: string;
          strategy_id?: string;
          tenant_id?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
      strategy_feedback_log: {
        Row: {
          comment: string | null;
          created_at: string | null;
          id: string;
          rating: number;
          strategy_id: string;
          tenant_id: string;
        };
        Insert: {
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating: number;
          strategy_id: string;
          tenant_id: string;
        };
        Update: {
          comment?: string | null;
          created_at?: string | null;
          id?: string;
          rating?: number;
          strategy_id?: string;
          tenant_id?: string;
        };
        Relationships: [];
      };
      strategy_goals: {
        Row: {
          created_at: string | null;
          due_date: string | null;
          goal: string | null;
          id: string;
          status: string | null;
          strategy_id: string | null;
          target_value: number | null;
          tenant_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          due_date?: string | null;
          goal?: string | null;
          id?: string;
          status?: string | null;
          strategy_id?: string | null;
          target_value?: number | null;
          tenant_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          due_date?: string | null;
          goal?: string | null;
          id?: string;
          status?: string | null;
          strategy_id?: string | null;
          target_value?: number | null;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_goals_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_goals_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_goals_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      strategy_history: {
        Row: {
          approved_at: string | null;
          created_at: string | null;
          id: string;
          mrr_generated: number | null;
          plugin_calls: number | null;
          status: string;
          strategy_id: string | null;
          tenant_id: string;
        };
        Insert: {
          approved_at?: string | null;
          created_at?: string | null;
          id?: string;
          mrr_generated?: number | null;
          plugin_calls?: number | null;
          status?: string;
          strategy_id?: string | null;
          tenant_id: string;
        };
        Update: {
          approved_at?: string | null;
          created_at?: string | null;
          id?: string;
          mrr_generated?: number | null;
          plugin_calls?: number | null;
          status?: string;
          strategy_id?: string | null;
          tenant_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_history_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_history_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_history_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "strategy_history_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_history_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_history_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_marketplace: {
        Row: {
          author_id: string | null;
          created_at: string | null;
          id: string;
          price_usd: number | null;
          strategy_id: string | null;
          stripe_price_id: string | null;
          summary: string | null;
          title: string | null;
          type: string | null;
        };
        Insert: {
          author_id?: string | null;
          created_at?: string | null;
          id?: string;
          price_usd?: number | null;
          strategy_id?: string | null;
          stripe_price_id?: string | null;
          summary?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Update: {
          author_id?: string | null;
          created_at?: string | null;
          id?: string;
          price_usd?: number | null;
          strategy_id?: string | null;
          stripe_price_id?: string | null;
          summary?: string | null;
          title?: string | null;
          type?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_marketplace_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_marketplace_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_marketplace_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_marketplace_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      strategy_meetings: {
        Row: {
          created_at: string | null;
          host_url: string | null;
          id: string;
          join_url: string | null;
          meeting_id: string | null;
          start_time: string | null;
          strategy_id: string | null;
          tenant_id: string | null;
          topic: string | null;
        };
        Insert: {
          created_at?: string | null;
          host_url?: string | null;
          id?: string;
          join_url?: string | null;
          meeting_id?: string | null;
          start_time?: string | null;
          strategy_id?: string | null;
          tenant_id?: string | null;
          topic?: string | null;
        };
        Update: {
          created_at?: string | null;
          host_url?: string | null;
          id?: string;
          join_url?: string | null;
          meeting_id?: string | null;
          start_time?: string | null;
          strategy_id?: string | null;
          tenant_id?: string | null;
          topic?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_meeting_strategy_id";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_board";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_meeting_tenant";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_meetings_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_meetings_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_meetings_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
          {
            foreignKeyName: "strategy_meetings_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_meetings_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_meetings_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_mrr_logs: {
        Row: {
          id: string;
          mrr: number | null;
          roi: number | null;
          strategy_id: string | null;
          timestamp: string | null;
        };
        Insert: {
          id?: string;
          mrr?: number | null;
          roi?: number | null;
          strategy_id?: string | null;
          timestamp?: string | null;
        };
        Update: {
          id?: string;
          mrr?: number | null;
          roi?: number | null;
          strategy_id?: string | null;
          timestamp?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "fk_mrr_strategy_id";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_board";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_mrr_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_mrr_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_mrr_logs_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      strategy_pitches: {
        Row: {
          approved: boolean | null;
          created_at: string | null;
          description: string | null;
          generated_by: string | null;
          id: string;
          status: string | null;
          tenant_id: string | null;
          title: string;
          video_url: string | null;
        };
        Insert: {
          approved?: boolean | null;
          created_at?: string | null;
          description?: string | null;
          generated_by?: string | null;
          id?: string;
          status?: string | null;
          tenant_id?: string | null;
          title: string;
          video_url?: string | null;
        };
        Update: {
          approved?: boolean | null;
          created_at?: string | null;
          description?: string | null;
          generated_by?: string | null;
          id?: string;
          status?: string | null;
          tenant_id?: string | null;
          title?: string;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_pitches_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_pitches_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategy_pitches_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_tags: {
        Row: {
          created_at: string | null;
          id: string;
          strategy_id: string | null;
          tag: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          strategy_id?: string | null;
          tag?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          strategy_id?: string | null;
          tag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategy_tags_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "prioritized_strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_tags_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "strategy_tags_strategy_id_fkey";
            columns: ["strategy_id"];
            isOneToOne: false;
            referencedRelation: "strategy_mrr_ranking";
            referencedColumns: ["strategy_id"];
          },
        ];
      };
      strategy_template_votes: {
        Row: {
          created_at: string | null;
          id: string;
          template_id: string | null;
          upvote: boolean | null;
          user_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          template_id?: string | null;
          upvote?: boolean | null;
          user_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          template_id?: string | null;
          upvote?: boolean | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      strategy_templates: {
        Row: {
          created_at: string | null;
          id: string;
          industry: string | null;
          is_public: boolean | null;
          summary: string | null;
          title: string;
          used_by: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          industry?: string | null;
          is_public?: boolean | null;
          summary?: string | null;
          title: string;
          used_by?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          industry?: string | null;
          is_public?: boolean | null;
          summary?: string | null;
          title?: string;
          used_by?: number | null;
        };
        Relationships: [];
      };
      subject_line_logs: {
        Row: {
          click_rate: number | null;
          created_at: string | null;
          id: string;
          industry: string | null;
          open_rate: number | null;
          subject_line: string | null;
          tenant_id: string | null;
          tone: string | null;
          variant: string | null;
        };
        Insert: {
          click_rate?: number | null;
          created_at?: string | null;
          id?: string;
          industry?: string | null;
          open_rate?: number | null;
          subject_line?: string | null;
          tenant_id?: string | null;
          tone?: string | null;
          variant?: string | null;
        };
        Update: {
          click_rate?: number | null;
          created_at?: string | null;
          id?: string;
          industry?: string | null;
          open_rate?: number | null;
          subject_line?: string | null;
          tenant_id?: string | null;
          tone?: string | null;
          variant?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "subject_line_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "subject_line_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "subject_line_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      subscribers: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          stripe_customer_id: string | null;
          subscribed: boolean;
          subscription_end: string | null;
          subscription_tier: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          stripe_customer_id?: string | null;
          subscribed?: boolean;
          subscription_end?: string | null;
          subscription_tier?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          stripe_customer_id?: string | null;
          subscribed?: boolean;
          subscription_end?: string | null;
          subscription_tier?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      tenant_activity_logs: {
        Row: {
          action: string;
          id: string;
          tenant_id: string;
          timestamp: string;
          username: string;
        };
        Insert: {
          action: string;
          id?: string;
          tenant_id: string;
          timestamp?: string;
          username: string;
        };
        Update: {
          action?: string;
          id?: string;
          tenant_id?: string;
          timestamp?: string;
          username?: string;
        };
        Relationships: [];
      };
      tenant_alerts: {
        Row: {
          created_at: string | null;
          dismissed: boolean | null;
          id: string;
          message: string;
          resolved_at: string | null;
          tenant_id: string;
          type: string;
          username: string | null;
        };
        Insert: {
          created_at?: string | null;
          dismissed?: boolean | null;
          id?: string;
          message: string;
          resolved_at?: string | null;
          tenant_id: string;
          type: string;
          username?: string | null;
        };
        Update: {
          created_at?: string | null;
          dismissed?: boolean | null;
          id?: string;
          message?: string;
          resolved_at?: string | null;
          tenant_id?: string;
          type?: string;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_alerts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_alerts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_alerts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenant_plugins: {
        Row: {
          created_at: string | null;
          id: string;
          plugin_slug: string;
          status: string;
          tenant_id: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          plugin_slug: string;
          status?: string;
          tenant_id: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          plugin_slug?: string;
          status?: string;
          tenant_id?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_plugins_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_plugins_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_plugins_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenant_settings: {
        Row: {
          automation_settings: Json | null;
          created_at: string;
          crm_webhook_url: string | null;
          drive_url: string | null;
          gdrive_webhook_url: string | null;
          id: string;
          last_export_timestamp: string | null;
          milestone_webhook_url: string | null;
          notion_url: string | null;
          notion_webhook_url: string | null;
          slack_webhook_url: string | null;
          tenant_id: string;
          updated_at: string;
          zapier_webhook_url: string | null;
        };
        Insert: {
          automation_settings?: Json | null;
          created_at?: string;
          crm_webhook_url?: string | null;
          drive_url?: string | null;
          gdrive_webhook_url?: string | null;
          id?: string;
          last_export_timestamp?: string | null;
          milestone_webhook_url?: string | null;
          notion_url?: string | null;
          notion_webhook_url?: string | null;
          slack_webhook_url?: string | null;
          tenant_id: string;
          updated_at?: string;
          zapier_webhook_url?: string | null;
        };
        Update: {
          automation_settings?: Json | null;
          created_at?: string;
          crm_webhook_url?: string | null;
          drive_url?: string | null;
          gdrive_webhook_url?: string | null;
          id?: string;
          last_export_timestamp?: string | null;
          milestone_webhook_url?: string | null;
          notion_url?: string | null;
          notion_webhook_url?: string | null;
          slack_webhook_url?: string | null;
          tenant_id?: string;
          updated_at?: string;
          zapier_webhook_url?: string | null;
        };
        Relationships: [];
      };
      tenant_users: {
        Row: {
          created_at: string;
          email: string;
          id: string;
          role: string;
          tenant_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          id?: string;
          role: string;
          tenant_id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: string;
          role?: string;
          tenant_id?: string;
        };
        Relationships: [];
      };
      tenant_webhooks: {
        Row: {
          created_at: string | null;
          tenant_id: string;
          type: string;
          updated_at: string | null;
          url: string;
        };
        Insert: {
          created_at?: string | null;
          tenant_id: string;
          type: string;
          updated_at?: string | null;
          url: string;
        };
        Update: {
          created_at?: string | null;
          tenant_id?: string;
          type?: string;
          updated_at?: string | null;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenant_webhooks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_webhooks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "tenant_webhooks_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenants: {
        Row: {
          ai_autonomy_level: string;
          blaze_enabled: boolean | null;
          created_at: string | null;
          domain: string | null;
          email_recipients: string[] | null;
          heygen_enabled: boolean | null;
          id: string;
          logo_url: string | null;
          name: string | null;
          report_day: string | null;
          report_time: string | null;
          stripe_customer_id: string | null;
        };
        Insert: {
          ai_autonomy_level?: string;
          blaze_enabled?: boolean | null;
          created_at?: string | null;
          domain?: string | null;
          email_recipients?: string[] | null;
          heygen_enabled?: boolean | null;
          id?: string;
          logo_url?: string | null;
          name?: string | null;
          report_day?: string | null;
          report_time?: string | null;
          stripe_customer_id?: string | null;
        };
        Update: {
          ai_autonomy_level?: string;
          blaze_enabled?: boolean | null;
          created_at?: string | null;
          domain?: string | null;
          email_recipients?: string[] | null;
          heygen_enabled?: boolean | null;
          id?: string;
          logo_url?: string | null;
          name?: string | null;
          report_day?: string | null;
          report_time?: string | null;
          stripe_customer_id?: string | null;
        };
        Relationships: [];
      };
      user_achievements: {
        Row: {
          awarded_at: string | null;
          badge: string;
          id: string;
          unlocked_feature: string | null;
          user_id: string | null;
        };
        Insert: {
          awarded_at?: string | null;
          badge: string;
          id?: string;
          unlocked_feature?: string | null;
          user_id?: string | null;
        };
        Update: {
          awarded_at?: string | null;
          badge?: string;
          id?: string;
          unlocked_feature?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      user_tokens: {
        Row: {
          badges: Json | null;
          id: string;
          level: string | null;
          points: number | null;
          user_id: string | null;
        };
        Insert: {
          badges?: Json | null;
          id?: string;
          level?: string | null;
          points?: number | null;
          user_id?: string | null;
        };
        Update: {
          badges?: Json | null;
          id?: string;
          level?: string | null;
          points?: number | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_tokens_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      variant_feedback: {
        Row: {
          campaign_id: string;
          created_at: string;
          feedback: string | null;
          id: string;
          tenant_id: string | null;
        };
        Insert: {
          campaign_id: string;
          created_at?: string;
          feedback?: string | null;
          id?: string;
          tenant_id?: string | null;
        };
        Update: {
          campaign_id?: string;
          created_at?: string;
          feedback?: string | null;
          id?: string;
          tenant_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "variant_feedback_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "variant_feedback_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "variant_feedback_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      webhook_logs: {
        Row: {
          attempt: number | null;
          created_at: string | null;
          id: string;
          message_type: string | null;
          payload: Json | null;
          response: string | null;
          status: string | null;
          tenant_id: string | null;
          url: string;
          webhook_id: string | null;
        };
        Insert: {
          attempt?: number | null;
          created_at?: string | null;
          id?: string;
          message_type?: string | null;
          payload?: Json | null;
          response?: string | null;
          status?: string | null;
          tenant_id?: string | null;
          url: string;
          webhook_id?: string | null;
        };
        Update: {
          attempt?: number | null;
          created_at?: string | null;
          id?: string;
          message_type?: string | null;
          payload?: Json | null;
          response?: string | null;
          status?: string | null;
          tenant_id?: string | null;
          url?: string;
          webhook_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "webhook_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "webhook_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "webhook_logs_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      weekly_snapshots: {
        Row: {
          ai_summary: string | null;
          churn_rate: number | null;
          id: string;
          ltv: number | null;
          mrr: number | null;
          mrr_growth: number | null;
          tenant_id: string;
          timestamp: string;
        };
        Insert: {
          ai_summary?: string | null;
          churn_rate?: number | null;
          id?: string;
          ltv?: number | null;
          mrr?: number | null;
          mrr_growth?: number | null;
          tenant_id: string;
          timestamp?: string;
        };
        Update: {
          ai_summary?: string | null;
          churn_rate?: number | null;
          id?: string;
          ltv?: number | null;
          mrr?: number | null;
          mrr_growth?: number | null;
          tenant_id?: string;
          timestamp?: string;
        };
        Relationships: [];
      };
      wiki_entries: {
        Row: {
          ai_categories: Json | null;
          ai_insights: string | null;
          category: string | null;
          content: string;
          created_at: string;
          created_by: string | null;
          id: string;
          summary: string | null;
          tenant_id: string | null;
          title: string;
          updated_at: string;
          vote_count: number | null;
        };
        Insert: {
          ai_categories?: Json | null;
          ai_insights?: string | null;
          category?: string | null;
          content: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          summary?: string | null;
          tenant_id?: string | null;
          title: string;
          updated_at?: string;
          vote_count?: number | null;
        };
        Update: {
          ai_categories?: Json | null;
          ai_insights?: string | null;
          category?: string | null;
          content?: string;
          created_at?: string;
          created_by?: string | null;
          id?: string;
          summary?: string | null;
          tenant_id?: string | null;
          title?: string;
          updated_at?: string;
          vote_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "wiki_entries_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "wiki_entries_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "wiki_entries_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      wiki_votes: {
        Row: {
          created_at: string;
          entry_id: string | null;
          id: string;
          user_id: string | null;
          vote_type: string;
        };
        Insert: {
          created_at?: string;
          entry_id?: string | null;
          id?: string;
          user_id?: string | null;
          vote_type: string;
        };
        Update: {
          created_at?: string;
          entry_id?: string | null;
          id?: string;
          user_id?: string | null;
          vote_type?: string;
        };
        Relationships: [
          {
            foreignKeyName: "wiki_votes_entry_id_fkey";
            columns: ["entry_id"];
            isOneToOne: false;
            referencedRelation: "wiki_entries";
            referencedColumns: ["id"];
          },
        ];
      };
      workspace_members: {
        Row: {
          created_at: string | null;
          id: string;
          role: string | null;
          user_id: string;
          workspace_id: string | null;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          role?: string | null;
          user_id: string;
          workspace_id?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          role?: string | null;
          user_id?: string;
          workspace_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey";
            columns: ["workspace_id"];
            isOneToOne: false;
            referencedRelation: "workspaces";
            referencedColumns: ["id"];
          },
        ];
      };
      workspaces: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner_id: string;
        };
        Insert: {
          created_at?: string | null;
          id?: string;
          name: string;
          owner_id: string;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
        };
        Relationships: [];
      };
      zoom_accounts: {
        Row: {
          access_token: string | null;
          created_at: string | null;
          expires_at: string | null;
          id: string;
          refresh_token: string | null;
          tenant_id: string | null;
          zoom_user_id: string | null;
        };
        Insert: {
          access_token?: string | null;
          created_at?: string | null;
          expires_at?: string | null;
          id?: string;
          refresh_token?: string | null;
          tenant_id?: string | null;
          zoom_user_id?: string | null;
        };
        Update: {
          access_token?: string | null;
          created_at?: string | null;
          expires_at?: string | null;
          id?: string;
          refresh_token?: string | null;
          tenant_id?: string | null;
          zoom_user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "zoom_accounts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "zoom_accounts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "zoom_accounts_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      agent_task_summary: {
        Row: {
          assigned_to: string | null;
          avg_output_length: number | null;
          completed_tasks: number | null;
          last_task_completed: string | null;
          total_tasks: number | null;
        };
        Relationships: [];
      };
      galaxy_follow_ranking: {
        Row: {
          follower_count: number | null;
          startup_name: string | null;
          tenant_id: string | null;
        };
        Relationships: [];
      };
      galaxy_mrr_leaderboard: {
        Row: {
          active_strategies: number | null;
          startup_name: string | null;
          tenant_id: string | null;
          total_mrr: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      lead_engagement_summary: {
        Row: {
          days_since_contact: unknown | null;
          email: string | null;
          id: string | null;
          last_contact: string | null;
          tenant_id: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "campaign_leads_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      prioritized_strategies: {
        Row: {
          created_at: string | null;
          duration: number | null;
          estimated_budget: number | null;
          id: string | null;
          industry: string | null;
          launch_date: string | null;
          priority: string | null;
          priority_justification: string | null;
          priority_rank: number | null;
          status: string | null;
          summary: string | null;
          tenant_id: string | null;
          title: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      strategy_decision_logs_summary: {
        Row: {
          approved: number | null;
          auto_ready: boolean | null;
          declined: number | null;
          edited: number | null;
          tenant_id: string | null;
          tenant_name: string | null;
          total: number | null;
        };
        Relationships: [];
      };
      strategy_mrr_ranking: {
        Row: {
          avg_roi: number | null;
          strategy_id: string | null;
          tenant_id: string | null;
          title: string | null;
          total_mrr: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "strategies_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
      tenant_vs_industry_kpi_tone: {
        Row: {
          industry: string | null;
          industry_rate: number | null;
          tenant_id: string | null;
          tenant_name: string | null;
          tenant_rate: number | null;
          tenant_uses: number | null;
          tone: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "galaxy_follow_ranking";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "strategy_decision_logs_summary";
            referencedColumns: ["tenant_id"];
          },
          {
            foreignKeyName: "company_profiles_tenant_id_fkey";
            columns: ["tenant_id"];
            isOneToOne: false;
            referencedRelation: "tenants";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      decrement_credits: {
        Args: { p_tenant_id: string; p_amount: number };
        Returns: undefined;
      };
      get_user_role: {
        Args: { user_id: string };
        Returns: string;
      };
      increment_column: {
        Args: { table_name: string; column_name: string; row_id: string };
        Returns: undefined;
      };
      match_vault_by_embedding: {
        Args: {
          query_embedding: string;
          match_threshold?: number;
          match_limit?: number;
        };
        Returns: {
          id: string;
          type: string;
          label: string;
          content: string;
          tenant_id: string;
          contributor_id: string;
          created_at: string;
          similarity: number;
        }[];
      };
    };
    Enums: {
      user_role: "user" | "admin" | "superadmin";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      user_role: ["user", "admin", "superadmin"],
    },
  },
} as const;
