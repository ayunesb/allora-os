
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Communication } from "@/hooks/useCommunications";

interface CommunicationNotesProps {
  communicationId: string;
  communications: Communication[];
  onClose: () => void;
}

export default function CommunicationNotes({
  communicationId,
  communications,
  onClose,
}: CommunicationNotesProps) {
  const communication = communications.find((c) => c.id === communicationId);

  if (!communication) return null;

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Communication Notes</DialogTitle>
          <DialogDescription>
            {communication.leads?.name || "Unknown Lead"} - {communication.type.charAt(0).toUpperCase() + communication.type.slice(1)} on{" "}
            {formatDateTime(communication.ended_at || communication.scheduled_at)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {communication.notes && (
            <div>
              <h3 className="text-sm font-medium mb-2">Notes</h3>
              <div className="p-3 bg-muted rounded-md whitespace-pre-wrap text-sm">
                {communication.notes}
              </div>
            </div>
          )}

          {communication.ai_summary && (
            <div>
              <h3 className="text-sm font-medium mb-2">AI Summary</h3>
              <div className="p-3 border border-primary/10 bg-primary-foreground rounded-md whitespace-pre-wrap text-sm">
                {communication.ai_summary}
              </div>
            </div>
          )}

          {!communication.notes && !communication.ai_summary && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No notes or summaries available for this communication.</p>
            </div>
          )}

          {communication.metadata && Object.keys(communication.metadata).length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Additional Information</h3>
              <div className="p-3 bg-muted rounded-md">
                <pre className="text-xs overflow-auto whitespace-pre-wrap">
                  {JSON.stringify(communication.metadata, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
