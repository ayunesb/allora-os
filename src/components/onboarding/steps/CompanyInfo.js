import { jsx as _jsx } from "react/jsx-runtime";
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
export function CompanyInfo({ companyName, setCompanyName, companyDetails, updateCompanyDetails, errorMessage, }) {
    return (_jsx(CompanyInfoForm, { companyName: companyName, setCompanyName: setCompanyName, companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, error: (errorMessage === null || errorMessage === void 0 ? void 0 : errorMessage.includes("company")) ? errorMessage : undefined }));
}
