
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RocketIcon, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type OnboardingLayoutProps = {
  children: ReactNode;
  step?: number;
  currentStep?: number;
  totalSteps: number;
  onBack?: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
  isBackDisabled?: boolean;
  nextLabel?: string;
  isLoading: boolean;
  isLastStep?: boolean;
  title?: string;
};

export default function OnboardingLayout({
  children,
  step,
  currentStep,
  totalSteps,
  onBack,
  onNext,
  isNextDisabled,
  isBackDisabled,
  nextLabel,
  isLoading,
  isLastStep,
  title = "Allora AI Setup"
}: OnboardingLayoutProps) {
  // Use either step or currentStep (for backward compatibility)
  const activeStep = step || currentStep || 1;
  const progressPercentage = (activeStep / totalSteps) * 100;
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <RocketIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            Let's set up your business profile (Step {activeStep} of {totalSteps})
          </CardDescription>
          <Progress value={progressPercentage} className="mt-4" />
        </CardHeader>

        <CardContent>
          {children}
        </CardContent>

        <CardFooter className="flex justify-between">
          {activeStep > 1 && onBack ? (
            <Button 
              variant="outline" 
              onClick={onBack} 
              disabled={isLoading || isBackDisabled}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button 
            onClick={onNext} 
            disabled={isLoading || isNextDisabled}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isLastStep ? "Processing..." : "Loading..."}
              </>
            ) : (
              <>
                {nextLabel || (isLastStep ? "Complete Setup" : "Next Step")}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
