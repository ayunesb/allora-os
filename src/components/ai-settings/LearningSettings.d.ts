interface LearningSettingsProps {
  learningEnabled: boolean;
  onToggleLearning: (enabled: boolean) => void;
}
export declare function LearningSettings({
  learningEnabled,
  onToggleLearning,
}: LearningSettingsProps): JSX.Element;
export {};
