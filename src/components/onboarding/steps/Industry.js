import { jsx as _jsx } from "react/jsx-runtime";
import IndustryForm from "@/components/onboarding/IndustryForm";
export function Industry({ industry, setIndustry, errorMessage }) {
    return (_jsx(IndustryForm, { industry: industry, setIndustry: setIndustry, error: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes("industry")) ? errorMessage : undefined }));
}
