import { CommunicationData } from "@/hooks/communications";
interface TemplateTabProps {
    phoneNumber: string;
    selectedLeadId: string;
    templates: any[];
    isLoadingTemplates: boolean;
    onMessageSent: (communicationData: CommunicationData) => Promise<any>;
    isLoadingMutation: boolean;
}
export default function TemplateTab({ phoneNumber, selectedLeadId, templates, isLoadingTemplates, onMessageSent, isLoadingMutation }: TemplateTabProps): import("react").JSX.Element;
export {};
