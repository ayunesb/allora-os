import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
export function CompanyDetails({
  companyDetails,
  updateCompanyDetails,
  onNext,
}) {
  return (
    <CompanyDetailsSurvey
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
      onNext={onNext}
    />
  );
}
