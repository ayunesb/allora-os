interface AIModelPreferencesProps {
    preferences: any;
    updatePreference: (key: string, value: any) => void;
}
export default function AIModelPreferences({ preferences, updatePreference }: AIModelPreferencesProps): JSX.Element;
export {};
