interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  stepDescription: string;
  onNext: () => Promise<void>;
  onBack: () => void;
  isNextDisabled: boolean;
  isBackDisabled: boolean;
  nextLabel: string;
  isLastStep: boolean;
}
export declare function OnboardingProgress({
  currentStep,
  totalSteps,
  stepDescription,
  onNext,
  onBack,
  isNextDisabled,
  isBackDisabled,
  nextLabel,
  isLastStep,
}: OnboardingProgressProps): JSX.Element;
export {};
