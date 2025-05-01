
import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OnboardingProgress } from './OnboardingProgress';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Toaster } from 'sonner';

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
  isNextDisabled = false,
  isBackDisabled = false,
  nextLabel = "Continue",
  isLoading = false,
  isLastStep = false,
  title,
  stepDescription
}: OnboardingLayoutProps) {
  const { screenReaderFriendly } = useAccessibility();

  return (
    <div className="min-h-screen flex flex-col justify-center py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <Toaster position="top-right" closeButton richColors />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4 text-center">
        <h1 className="text-xl sm:text-2xl font-bold">{title}</h1>
      </div>

      <div className="w-full sm:mx-auto sm:max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">{stepDescription}</CardTitle>
            <OnboardingProgress
              currentStep={step}
              totalSteps={totalSteps}
              stepDescription={stepDescription}
              onNext={onNext}
              onBack={onBack}
              isNextDisabled={isNextDisabled || isLoading}
              isBackDisabled={isBackDisabled || isLoading}
              nextLabel={isLoading ? "Processing..." : nextLabel}
              isLastStep={isLastStep}
            />
          </CardHeader>

          <CardContent className="pt-4">
            <div 
              role={screenReaderFriendly ? "region" : undefined}
              aria-label={screenReaderFriendly ? `Onboarding step ${step}: ${stepDescription}` : undefined}
            >
              {children}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
