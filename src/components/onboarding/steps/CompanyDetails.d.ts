import { PartialCompanyDetails } from "@/models/companyDetails";
interface CompanyDetailsProps {
    companyDetails: PartialCompanyDetails;
    updateCompanyDetails: (details: PartialCompanyDetails) => void;
    onNext: () => void;
}
export declare function CompanyDetails({ companyDetails, updateCompanyDetails, onNext }: CompanyDetailsProps): import("react").JSX.Element;
export {};
