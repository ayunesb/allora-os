import { ReactNode } from "react";
interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  onNext: () => Promise<void>;
  onBack: () => void;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextLabel?: string;
  isLoading?: boolean;
  isLastStep?: boolean;
  title: string;
  stepDescription: string;
}
export default function OnboardingLayout({
  children,
  step,
  totalSteps,
  onNext,
  onBack,
  isNextDisabled,
  isBackDisabled,
  nextLabel,
  isLoading,
  isLastStep,
  title,
  stepDescription,
}: OnboardingLayoutProps): JSX.Element;
export {};
