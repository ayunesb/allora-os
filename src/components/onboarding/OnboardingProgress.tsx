import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAccessibility } from '@/context/AccessibilityContext';
export function OnboardingProgress({ currentStep, totalSteps, stepDescription, onNext, onBack, isNextDisabled, isBackDisabled, nextLabel, isLastStep }) {
    const { highContrast } = useAccessibility();
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (<div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className={`text-sm font-medium ${highContrast ? 'text-primary' : 'text-muted-foreground'}`} aria-live="polite">
            Step {currentStep} of {totalSteps}
          </span>
          <h2 className="text-base font-semibold mt-1">{stepDescription}</h2>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" onClick={onBack} disabled={isBackDisabled} aria-label="Go back to previous step">
            Back
          </Button>
          <Button onClick={onNext} disabled={isNextDisabled} className={isLastStep ? 'bg-green-600 hover:bg-green-700' : ''} aria-label={nextLabel}>
            {nextLabel}
          </Button>
        </div>
      </div>
      
      <div className="relative pt-1">
        <Progress value={progressPercentage} className="w-full h-2" aria-label={`Onboarding progress: ${Math.round(progressPercentage)}%`}/>
        
        <div className="flex justify-between mt-2">
          {Array.from({ length: totalSteps }).map((_, i) => (<div key={i} className={`flex flex-col items-center ${i < currentStep
                ? 'text-primary'
                : i === currentStep
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground'}`}>
              <div className={`w-3 h-3 rounded-full ${i < currentStep
                ? 'bg-primary'
                : i === currentStep
                    ? 'bg-primary ring-2 ring-primary/30'
                    : 'bg-muted'}`} aria-hidden="true"/>
            </div>))}
        </div>
      </div>
    </div>);
}
