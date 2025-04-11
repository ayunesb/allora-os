
import CompanyInfoForm from "@/components/onboarding/CompanyInfoForm";

interface CompanyInfoProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  errorMessage?: string | null;
}

export function CompanyInfo({ companyName, setCompanyName, errorMessage }: CompanyInfoProps) {
  return (
    <CompanyInfoForm
      companyName={companyName}
      setCompanyName={setCompanyName}
      error={errorMessage?.includes("company") ? errorMessage : undefined}
    />
  );
}
