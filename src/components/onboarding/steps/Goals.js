import { jsx as _jsx } from "react/jsx-runtime";
import GoalsForm from "@/components/onboarding/GoalsForm";
export function Goals({ goals, toggleGoal, companyName, industry, companyDetails, updateCompanyDetails, errorMessage, }) {
    return (_jsx(GoalsForm, { goals: goals, toggleGoal: toggleGoal, companyName: companyName, industry: industry, companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, error: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes("goal")) ? errorMessage : undefined }));
}
