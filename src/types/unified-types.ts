
/**
 * Unified type definitions to ensure consistency across the application
 */

// User type that combines all required properties from different models
export interface UnifiedUser {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'user';
  company_id?: string;
  company?: string;
  industry?: string;
  created_at?: string;
  updated_at?: string;
  avatar_url?: string;
  user_metadata?: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    name?: string;
    role?: string;
  };
  app_metadata?: {
    is_admin?: boolean;
    [key: string]: any;
  };
}

// Extended webhook event type
export interface UnifiedWebhookEvent {
  id: string;
  webhook_id: string;
  eventType: string;
  event_type: string; // For backward compatibility
  status: 'success' | 'failed' | 'pending';
  created_at: string;
  payload: any;
  response?: any;
  targetUrl?: string;
  url?: string;
  webhookType?: string;
  webhook_type?: string;
  type?: string;
  timestamp?: string;
  duration?: number;
  errorMessage?: string;
  responseCode?: number;
  source?: string;
}

// Executive message with all possible properties
export interface UnifiedExecutiveMessage {
  id: string;
  content?: string;
  created_at: string;
  from_executive?: string | boolean;
  to_executive?: string | boolean;
  message_content?: string;
  status?: string;
}

// Bot type with all properties
export interface UnifiedBot {
  id: string;
  name: string;
  title: string;
  expertise: string;
  avatar?: string;
  description?: string;
  industry?: string;
  specialties?: string[];
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

// Extended context types
export interface ExtendedAccessibilityContextType {
  screenReaderFriendly: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  largeText: boolean;
  invertColors: boolean;
  toggleScreenReader: () => void;
  toggleHighContrast: () => void;
  toggleReducedMotion: () => void;
  toggleLargeText: () => void;
  toggleInvertColors: () => void;
  fontSize?: number;
  setFontSize?: (v: number) => void;
  checkForUpdates?: () => void;
  setAutoUpdate?: (value: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string | null;
}

export interface ExtendedComplianceContextType {
  isLoaded: boolean;
  error: string | null;
  updatePreference?: (key: string, value: any) => void;
  checkForUpdates?: () => void;
  setAutoUpdate?: (value: boolean) => void;
  isCheckingUpdates?: boolean;
  lastChecked?: string | null;
}

// Auth context with loading
export interface ExtendedAuthContextProps {
  user: UnifiedUser | null;
  profile?: UnifiedUser;
  isLoading: boolean;
  loading: boolean;
  refreshProfile?: () => Promise<void>;
  refreshSession?: () => Promise<boolean>;
  isEmailVerified?: boolean;
  authError?: Error | string;
  isSessionExpired?: boolean;
  hasInitialized?: boolean;
  login: () => void;
  logout: () => void;
}
