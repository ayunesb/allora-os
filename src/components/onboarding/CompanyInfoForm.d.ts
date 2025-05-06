type CompanyInfoFormProps = {
  companyName: string;
  setCompanyName: (name: string) => void;
  companyDetails?: Record<string, any>;
  updateCompanyDetails?: (details: Record<string, any>) => void;
  error?: string;
};
export default function CompanyInfoForm({
  companyName,
  setCompanyName,
  companyDetails,
  updateCompanyDetails,
  error,
}: CompanyInfoFormProps): import("react").JSX.Element;
export {};
