import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
export function CompanyInfo({
  companyName,
  setCompanyName,
  companyDetails,
  updateCompanyDetails,
  errorMessage,
}) {
  return (
    <CompanyInfoForm
      companyName={companyName}
      setCompanyName={setCompanyName}
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
      error={errorMessage?.includes("company") ? errorMessage : undefined}
    />
  );
}
