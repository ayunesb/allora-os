import { PartialCompanyDetails } from "@/models/companyDetails";
interface BrandIdentityFormProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function BrandIdentityForm({
  companyDetails,
  updateCompanyDetails,
}: BrandIdentityFormProps): import("react").JSX.Element;
export {};
