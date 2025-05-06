import { PartialCompanyDetails } from "@/models/companyDetails";
interface CrmIntegrationsFormProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function CrmIntegrationsForm({
  companyDetails,
  updateCompanyDetails,
}: CrmIntegrationsFormProps): import("react").JSX.Element;
export {};
