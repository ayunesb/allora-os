import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCommunications } from "@/hooks/communications";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function CommunicationStatusSelector({ communicationId, currentStatus, currentOutcome, }) {
    const [outcome, setOutcome] = useState(currentOutcome);
    const { updateCommunicationStatus } = useCommunications();
    const handleUpdateOutcome = async () => {
        try {
            await updateCommunicationStatus(communicationId, currentStatus, undefined, outcome);
        }
        catch (error) {
            console.error("Error updating outcome:", error);
        }
    };
    return (<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 py-2 border-y">
      <div>
        <span className="text-sm font-medium mr-2">Outcome:</span>
        <Select value={outcome || "null"} onValueChange={(val) => setOutcome(val === "null" ? null : val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select outcome"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="null">No outcome</SelectItem>
            <SelectItem value="follow_up">Follow-up Needed</SelectItem>
            <SelectItem value="opportunity">New Opportunity</SelectItem>
            <SelectItem value="closed_won">Closed (Won)</SelectItem>
            <SelectItem value="closed_lost">Closed (Lost)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm" onClick={handleUpdateOutcome} disabled={outcome === currentOutcome}>
        Update Outcome
      </Button>
    </div>);
}
