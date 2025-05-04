import { PartialCompanyDetails } from "@/models/companyDetails";
type CompanyDetailsSurveyProps = {
    companyDetails: PartialCompanyDetails;
    updateCompanyDetails: (details: PartialCompanyDetails) => void;
    error?: string;
    onNext?: () => void;
};
export default function CompanyDetailsSurvey({ companyDetails, updateCompanyDetails, error, onNext }: CompanyDetailsSurveyProps): import("react").JSX.Element;
export { CompanyDetailsSurvey };
