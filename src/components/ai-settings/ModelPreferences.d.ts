import { AIModelPreference } from "@/types/aiSettings";
interface ModelPreferencesProps {
  modelPreferences: AIModelPreference;
  onUpdateModelPreferences: (preferences: Partial<AIModelPreference>) => void;
}
export declare function ModelPreferences({
  modelPreferences,
  onUpdateModelPreferences,
}: ModelPreferencesProps): JSX.Element;
export {};
