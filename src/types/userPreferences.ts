
/**
 * Interface defining user preferences for AI interactions and UI settings
 */
export interface UserPreferences {
  responseStyle?: 'concise' | 'balanced' | 'detailed';
  technicalLevel?: 'basic' | 'intermediate' | 'advanced';
  focusArea?: 'general' | 'strategy' | 'marketing' | 'operations' | 'technology' | 'finance';
  riskAppetite?: 'low' | 'medium' | 'high';
  modelPreference?: 'auto' | 'smart' | 'powerful' | 'fast';
  enableLearning?: boolean;
  showSources?: boolean;
  darkMode?: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  notificationPreferences?: {
    email?: boolean;
    push?: boolean;
    inApp?: boolean;
    frequency?: 'immediate' | 'daily' | 'weekly';
  };
  [key: string]: any; // Allow any other properties for flexibility
}
