
import { CommunicationPreferencesForm } from "../CommunicationPreferencesForm";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface CommunicationPreferencesProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

export function CommunicationPreferences({ 
  companyDetails, 
  updateCompanyDetails 
}: CommunicationPreferencesProps) {
  return (
    <CommunicationPreferencesForm
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
    />
  );
}
