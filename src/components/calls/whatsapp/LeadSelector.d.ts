import { Lead } from "@/models/lead";
interface LeadSelectorProps {
  selectedLeadId: string;
  onSelectLead: (leadId: string) => void;
  leads?: Lead[];
  isLoading: boolean;
}
export default function LeadSelector({
  selectedLeadId,
  onSelectLead,
  leads,
  isLoading,
}: LeadSelectorProps): import("react").JSX.Element;
export {};
