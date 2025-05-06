import { jsx as _jsx } from "react/jsx-runtime";
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
export function CompanyDetails({ companyDetails, updateCompanyDetails, onNext, }) {
    return (_jsx(CompanyDetailsSurvey, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, onNext: onNext }));
}
