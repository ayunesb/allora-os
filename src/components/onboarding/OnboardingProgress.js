import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAccessibility } from "@/context/AccessibilityContext";
export function OnboardingProgress({ currentStep, totalSteps, stepDescription, onNext, onBack, isNextDisabled, isBackDisabled, nextLabel, isLastStep, }) {
    const { highContrast } = useAccessibility();
    const progressPercentage = (currentStep / totalSteps) * 100;
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("span", { className: `text-sm font-medium ${highContrast ? "text-primary" : "text-muted-foreground"}`, "aria-live": "polite", children: ["Step ", currentStep, " of ", totalSteps] }), _jsx("h2", { className: "text-base font-semibold mt-1", children: stepDescription })] }), _jsxs("div", { className: "flex gap-2 items-center", children: [_jsx(Button, { variant: "outline", onClick: onBack, disabled: isBackDisabled, "aria-label": "Go back to previous step", children: "Back" }), _jsx(Button, { onClick: onNext, disabled: isNextDisabled, className: isLastStep ? "bg-green-600 hover:bg-green-700" : "", "aria-label": nextLabel, children: nextLabel })] })] }), _jsxs("div", { className: "relative pt-1", children: [_jsx(Progress, { value: progressPercentage, className: "w-full h-2", "aria-label": `Onboarding progress: ${Math.round(progressPercentage)}%` }), _jsx("div", { className: "flex justify-between mt-2", children: Array.from({ length: totalSteps }).map((_, i) => (_jsx("div", { className: `flex flex-col items-center ${i < currentStep
                                ? "text-primary"
                                : i === currentStep
                                    ? "text-primary font-medium"
                                    : "text-muted-foreground"}`, children: _jsx("div", { className: `w-3 h-3 rounded-full ${i < currentStep
                                    ? "bg-primary"
                                    : i === currentStep
                                        ? "bg-primary ring-2 ring-primary/30"
                                        : "bg-muted"}`, "aria-hidden": "true" }) }, i))) })] })] }));
}
