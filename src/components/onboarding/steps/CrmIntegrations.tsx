
import { CrmIntegrationsForm } from "../CrmIntegrationsForm";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface CrmIntegrationsProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

export function CrmIntegrations({ 
  companyDetails, 
  updateCompanyDetails 
}: CrmIntegrationsProps) {
  return (
    <CrmIntegrationsForm
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
    />
  );
}
