
/**
 * AI Settings Types
 */

export type PersonalityTrait = 'conservative' | 'balanced' | 'bold' | 'aggressive';
export type ResponseStyle = 'concise' | 'balanced' | 'detailed';
export type TechnicalLevel = 'basic' | 'intermediate' | 'advanced';
export type FocusArea = 'general' | 'growth' | 'profitability' | 'innovation' | 'risk' | 'operations';

export interface AIModelPreference {
  provider: 'openai' | 'anthropic' | 'google' | 'mistral';
  model: string;
  temperature: number;
}

export interface BotPersonalitySettings {
  botId: string;
  botName: string;
  botRole: string;
  personalityTrait: PersonalityTrait;
  responseStyle: ResponseStyle;
  technicalLevel: TechnicalLevel;
  focusArea: FocusArea;
  showSources: boolean;
  customInstructions?: string;
}

export interface AISettingsState {
  defaultSettings: {
    responseStyle: ResponseStyle;
    technicalLevel: TechnicalLevel;
    focusArea: FocusArea;
    showSources: boolean;
  };
  modelPreferences: AIModelPreference;
  botPersonalities: BotPersonalitySettings[];
  learningEnabled: boolean;
}

export interface AIPersonalityFormValues {
  personalityTrait: PersonalityTrait;
  responseStyle: ResponseStyle;
  technicalLevel: TechnicalLevel;
  focusArea: FocusArea;
  showSources: boolean;
  customInstructions?: string;
}
