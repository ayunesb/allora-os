import { jsx as _jsx } from "react/jsx-runtime";
import { CrmIntegrationsForm } from "../CrmIntegrationsForm";
export function CrmIntegrations({ companyDetails, updateCompanyDetails }) {
    return (_jsx(CrmIntegrationsForm, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails }));
}
