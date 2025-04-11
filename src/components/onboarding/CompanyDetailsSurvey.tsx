
import { PartialCompanyDetails } from "@/models/companyDetails";
import { CompanyDetailsSurvey as DetailsSurvey } from "./company-details";

type CompanyDetailsSurveyProps = {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
  error?: string;
  onNext?: () => void;
}

// This component is just a wrapper that forwards to the refactored implementation
// to maintain backward compatibility with existing code
export default function CompanyDetailsSurvey({ 
  companyDetails, 
  updateCompanyDetails,
  error,
  onNext
}: CompanyDetailsSurveyProps) {
  return (
    <DetailsSurvey
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
      error={error}
      onNext={onNext}
    />
  );
}
