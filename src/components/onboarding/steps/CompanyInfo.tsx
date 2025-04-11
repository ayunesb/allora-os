
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface CompanyInfoProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  companyDetails?: PartialCompanyDetails;
  updateCompanyDetails?: (details: PartialCompanyDetails) => void;
  errorMessage?: string | null;
}

export function CompanyInfo({ 
  companyName, 
  setCompanyName, 
  companyDetails,
  updateCompanyDetails,
  errorMessage 
}: CompanyInfoProps) {
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
