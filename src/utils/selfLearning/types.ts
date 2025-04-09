
/**
 * Self-Learning Engine Types
 */
import { Json } from '@/integrations/supabase/types';

// Types for tracking user actions
export type UserAction = {
  action: string;
  category: ActionCategory;
  entityId?: string;
  entityType?: string;
  metadata?: Record<string, any>;
  timestamp: Date;
};

export type ActionCategory = 
  | 'strategy_view' 
  | 'strategy_create' 
  | 'strategy_update'
  | 'call_initiate'
  | 'message_send'
  | 'bot_consultation'
  | 'debate_participation'
  | 'campaign_interaction'
  | 'lead_conversion'
  | 'video_generation'
  | 'page_view'
  | 'automation'; // For Zapier integrations
  
export type UserPreferences = {
  risk_appetite: string;
  preferred_executives: string[];
  favorite_topics: string[];
  communication_style: string;
  activity_peak_times: number[];
  dashboard_preferences: Record<string, any>;
  last_updated: Date;
};

export type RecommendationResult = {
  strategies: Array<{ title: string; description: string }>;
  executives: string[];
  topics: string[];
};

export type InsightResult = Array<{
  title: string;
  value: string;
  description: string;
}>;
