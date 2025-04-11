
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface CompanyDetailsProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  onNext: () => void;
}

export function CompanyDetails({ companyDetails, updateCompanyDetails, onNext }: CompanyDetailsProps) {
  return (
    <CompanyDetailsSurvey
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
      onNext={onNext}
    />
  );
}
