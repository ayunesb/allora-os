import { PartialCompanyDetails } from "@/models/companyDetails";
interface CommunicationPreferencesProps {
    companyDetails: PartialCompanyDetails;
    updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function CommunicationPreferences({ companyDetails, updateCompanyDetails }: CommunicationPreferencesProps): import("react").JSX.Element;
export {};
