import { jsx as _jsx } from "react/jsx-runtime";
import { CompanyDetailsSurvey as DetailsSurvey } from "./company-details";
// This component is just a wrapper that forwards to the refactored implementation
// to maintain backward compatibility with existing code
export default function CompanyDetailsSurvey({ companyDetails, updateCompanyDetails, error, onNext, }) {
    return (_jsx(DetailsSurvey, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails, error: error, onNext: onNext }));
}
