interface LearningPreferencesProps {
    preferences: any;
    updatePreference: (key: string, value: any) => void;
}
export default function LearningPreferences({ preferences, updatePreference }: LearningPreferencesProps): JSX.Element;
export {};
