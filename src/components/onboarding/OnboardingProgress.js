"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingProgress = OnboardingProgress;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var progress_1 = require("@/components/ui/progress");
var AccessibilityContext_1 = require("@/context/AccessibilityContext");
function OnboardingProgress(_a) {
  var currentStep = _a.currentStep,
    totalSteps = _a.totalSteps,
    stepDescription = _a.stepDescription,
    onNext = _a.onNext,
    onBack = _a.onBack,
    isNextDisabled = _a.isNextDisabled,
    isBackDisabled = _a.isBackDisabled,
    nextLabel = _a.nextLabel,
    isLastStep = _a.isLastStep;
  var highContrast = (0, AccessibilityContext_1.useAccessibility)()
    .highContrast;
  var progressPercentage = (currentStep / totalSteps) * 100;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-4",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsxs)("span", {
                className: "text-sm font-medium ".concat(
                  highContrast ? "text-primary" : "text-muted-foreground",
                ),
                "aria-live": "polite",
                children: ["Step ", currentStep, " of ", totalSteps],
              }),
              (0, jsx_runtime_1.jsx)("h2", {
                className: "text-base font-semibold mt-1",
                children: stepDescription,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex gap-2 items-center",
            children: [
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                variant: "outline",
                onClick: onBack,
                disabled: isBackDisabled,
                "aria-label": "Go back to previous step",
                children: "Back",
              }),
              (0, jsx_runtime_1.jsx)(button_1.Button, {
                onClick: onNext,
                disabled: isNextDisabled,
                className: isLastStep ? "bg-green-600 hover:bg-green-700" : "",
                "aria-label": nextLabel,
                children: nextLabel,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "relative pt-1",
        children: [
          (0, jsx_runtime_1.jsx)(progress_1.Progress, {
            value: progressPercentage,
            className: "w-full h-2",
            "aria-label": "Onboarding progress: ".concat(
              Math.round(progressPercentage),
              "%",
            ),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex justify-between mt-2",
            children: Array.from({ length: totalSteps }).map(function (_, i) {
              return (0, jsx_runtime_1.jsx)(
                "div",
                {
                  className: "flex flex-col items-center ".concat(
                    i < currentStep
                      ? "text-primary"
                      : i === currentStep
                        ? "text-primary font-medium"
                        : "text-muted-foreground",
                  ),
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "w-3 h-3 rounded-full ".concat(
                      i < currentStep
                        ? "bg-primary"
                        : i === currentStep
                          ? "bg-primary ring-2 ring-primary/30"
                          : "bg-muted",
                    ),
                    "aria-hidden": "true",
                  }),
                },
                i,
              );
            }),
          }),
        ],
      }),
    ],
  });
}
