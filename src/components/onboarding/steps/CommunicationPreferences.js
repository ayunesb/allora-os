import { jsx as _jsx } from "react/jsx-runtime";
import { CommunicationPreferencesForm } from "../CommunicationPreferencesForm";
export function CommunicationPreferences({ companyDetails, updateCompanyDetails, }) {
    return (_jsx(CommunicationPreferencesForm, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails }));
}
