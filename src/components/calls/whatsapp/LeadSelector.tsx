
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  isLoading
}: LeadSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="lead-select">Select Lead (Optional)</Label>
      <Select
        value={selectedLeadId}
        onValueChange={onSelectLead}
        disabled={isLoading}
      >
        <SelectTrigger id="lead-select">
          <SelectValue placeholder="Select a lead" />
        </SelectTrigger>
        <SelectContent>
          {leads?.map((lead) => (
            <SelectItem key={lead.id} value={lead.id}>
              {lead.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
