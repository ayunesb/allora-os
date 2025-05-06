"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Goals = Goals;
var jsx_runtime_1 = require("react/jsx-runtime");
var GoalsForm_1 = require("@/components/onboarding/GoalsForm");
function Goals(_a) {
  var goals = _a.goals,
    toggleGoal = _a.toggleGoal,
    companyName = _a.companyName,
    industry = _a.industry,
    companyDetails = _a.companyDetails,
    updateCompanyDetails = _a.updateCompanyDetails,
    errorMessage = _a.errorMessage;
  return (0, jsx_runtime_1.jsx)(GoalsForm_1.default, {
    goals: goals,
    toggleGoal: toggleGoal,
    companyName: companyName,
    industry: industry,
    companyDetails: companyDetails,
    updateCompanyDetails: updateCompanyDetails,
    error: (
      errorMessage === null || errorMessage === void 0
        ? void 0
        : errorMessage.includes("goal")
    )
      ? errorMessage
      : undefined,
  });
}
