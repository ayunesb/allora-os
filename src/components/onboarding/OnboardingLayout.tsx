
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
  title: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  onNext: () => void;
  isLoading: boolean;
  isLastStep: boolean;
};

export default function OnboardingLayout({
  children,
  title,
  step,
  totalSteps,
  onBack,
  onNext,
  isLoading,
  isLastStep
}: OnboardingLayoutProps) {
  const progressPercentage = (step / totalSteps) * 100;
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <RocketIcon className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>
            Let's set up your business profile (Step {step} of {totalSteps})
          </CardDescription>
          <Progress value={progressPercentage} className="mt-4" />
        </CardHeader>

        <CardContent>
          {children}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 && onBack ? (
            <Button 
              variant="outline" 
              onClick={onBack} 
              disabled={isLoading}
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
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {isLastStep ? "Processing..." : "Loading..."}
              </>
            ) : (
              <>
                {isLastStep ? "Complete Setup" : "Next Step"}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
