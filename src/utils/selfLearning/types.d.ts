/**
 * Types related to user preferences and self-learning
 */
export interface UserPreferences {
    risk_appetite: 'low' | 'medium' | 'high';
    preferred_executives: string[];
    favorite_topics: string[];
    communication_style: 'concise' | 'detailed' | 'balanced';
    activity_peak_times: number[];
    dashboard_preferences: Record<string, any>;
    last_updated: Date;
}
/**
 * Categories for tracking different types of user actions
 */
export type ActionCategory = 'strategy_feedback' | 'campaign_feedback' | 'script_feedback' | 'script_view' | 'script_usage' | 'strategy_view' | 'strategy_create' | 'strategy_update' | 'call_initiate' | 'message_send' | 'bot_consultation' | 'debate_participation' | 'campaign_interaction' | 'lead_conversion' | 'video_generation' | 'page_view' | 'automation';
