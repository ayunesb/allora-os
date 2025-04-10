
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
