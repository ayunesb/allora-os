import { PartialCompanyDetails } from "@/models/companyDetails";
interface CrmIntegrationsProps {
    companyDetails: PartialCompanyDetails;
    updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function CrmIntegrations({ companyDetails, updateCompanyDetails }: CrmIntegrationsProps): import("react").JSX.Element;
export {};
