interface ResponseStylePreferencesProps {
  preferences: any;
  updatePreference: (key: string, value: any) => void;
}
export default function ResponseStylePreferences({
  preferences,
  updatePreference,
}: ResponseStylePreferencesProps): JSX.Element;
export {};
