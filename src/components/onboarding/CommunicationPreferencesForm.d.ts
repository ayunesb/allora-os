import { PartialCompanyDetails } from "@/models/companyDetails";
interface CommunicationPreferencesFormProps {
    companyDetails: PartialCompanyDetails;
    updateCompanyDetails: (details: PartialCompanyDetails) => void;
}
export declare function CommunicationPreferencesForm({ companyDetails, updateCompanyDetails, }: CommunicationPreferencesFormProps): import("react").JSX.Element;
export {};
