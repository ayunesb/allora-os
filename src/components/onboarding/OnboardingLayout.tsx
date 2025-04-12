
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
import { RocketIcon, ArrowRight, ArrowLeft, Loader2, HelpCircle, InfoIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { HelpButton } from "@/components/help/HelpButton";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  stepDescription?: string;
};

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: -50,
  }
};

// Animation options
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.3
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
  title = "Allora AI Setup",
  stepDescription,
}: OnboardingLayoutProps) {
  // Use either step or currentStep (for backward compatibility)
  const activeStep = step || currentStep || 1;
  const progressPercentage = (activeStep / totalSteps) * 100;
  
  // Function to render the step dots for visual progress tracking
  const renderStepDots = () => {
    return (
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index}
            className={`rounded-full h-2.5 w-2.5 transition-all duration-300 ${
              index + 1 === activeStep 
                ? 'bg-primary scale-125' 
                : index + 1 < activeStep 
                  ? 'bg-primary/60' 
                  : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    )
  };
  
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <RocketIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center justify-center">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <div className="ml-2">
                <HelpButton contextId="onboarding" size="sm" />
              </div>
            </div>
            <CardDescription>
              <span className="font-medium text-primary">Step {activeStep} of {totalSteps}:</span>
              {stepDescription || "Let's set up your business profile"}
            </CardDescription>
            
            {/* Enhanced Progress Indicator */}
            <div className="mt-6">
              <Progress value={progressPercentage} className="h-2.5" />
              
              {/* Step dots */}
              {renderStepDots()}
              
              <div className="flex justify-between text-xs text-muted-foreground mt-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help flex items-center gap-1">
                      Getting Started
                      <InfoIcon className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Basic company information and industry selection</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help flex items-center gap-1">
                      Company Details
                      <InfoIcon className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Risk profile and business communication preferences</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-help flex items-center gap-1">
                      Complete
                      <InfoIcon className="h-3 w-3" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">Finalize setup and meet your AI executive team</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <motion.div
              key={activeStep}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {children}
            </motion.div>
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
    </TooltipProvider>
  );
}
