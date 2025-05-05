import { CommunicationPreferencesForm } from "../CommunicationPreferencesForm";
export function CommunicationPreferences({ companyDetails, updateCompanyDetails }) {
    return (<CommunicationPreferencesForm companyDetails={companyDetails} updateCompanyDetails={updateCompanyDetails}/>);
}
