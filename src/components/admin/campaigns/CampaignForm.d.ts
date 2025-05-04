interface CampaignFormData {
    name: string;
    platform: string;
    budget: number;
    company_id: string;
}
interface Company {
    id: string;
    name: string;
}
interface CampaignFormProps {
    data: CampaignFormData;
    onChange: (data: Partial<CampaignFormData>) => void;
    onSubmit: () => void;
    companies: Company[];
    isSubmitting: boolean;
}
declare const CampaignForm: ({ data, onChange, onSubmit, companies, isSubmitting }: CampaignFormProps) => JSX.Element;
export default CampaignForm;
