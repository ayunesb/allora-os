import { PartialCompanyDetails } from "@/models/companyDetails";
interface BrandIdentityProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function BrandIdentity({
  companyDetails,
  updateCompanyDetails,
}: BrandIdentityProps): import("react").JSX.Element;
export {};
