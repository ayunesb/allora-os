import { PartialCompanyDetails } from "@/models/companyDetails";
interface CompanyInfoProps {
  companyName: string;
  setCompanyName: (name: string) => void;
  companyDetails?: PartialCompanyDetails;
  updateCompanyDetails?: (details: PartialCompanyDetails) => void;
  errorMessage?: string | null;
}
export declare function CompanyInfo({
  companyName,
  setCompanyName,
  companyDetails,
  updateCompanyDetails,
  errorMessage,
}: CompanyInfoProps): import("react").JSX.Element;
export {};
