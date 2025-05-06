import { CrmIntegrationsForm } from "../CrmIntegrationsForm";
export function CrmIntegrations({ companyDetails, updateCompanyDetails }) {
  return (
    <CrmIntegrationsForm
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
    />
  );
}
