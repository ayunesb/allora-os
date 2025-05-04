import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/useCommunications";
import { Loader2 } from "lucide-react";
export default function AddCommunicationNotes({ open, onOpenChange, communicationId, existingNotes = "", }) {
    const [notes, setNotes] = useState(existingNotes);
    const [transcript, setTranscript] = useState("");
    const [generatingAiSummary, setGeneratingAiSummary] = useState(false);
    const { updateCommunicationStatus, generateAISummary } = useCommunications();
    const handleSave = async () => {
        try {
            await updateCommunicationStatus(communicationId, "completed", notes);
            onOpenChange(false);
        }
        catch (error) {
            console.error("Error saving notes:", error);
        }
    };
    const handleGenerateAISummary = async () => {
        if (!transcript.trim())
            return;
        setGeneratingAiSummary(true);
        try {
            const result = await generateAISummary(communicationId, transcript);
            if (result.summary) {
                setNotes((prev) => `${prev ? prev + "\n\n" : ""}AI Summary: ${result.summary}`);
            }
        }
        catch (error) {
            console.error("Error generating AI summary:", error);
        }
        finally {
            setGeneratingAiSummary(false);
        }
    };
    return (<Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Communication Notes</DialogTitle>
          <DialogDescription>
            Add notes from your communication or generate an AI summary from a transcript.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div>
            <label htmlFor="notes" className="text-sm font-medium mb-2 block">
              Notes
            </label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter your notes about this communication..." rows={5}/>
          </div>
          
          <div className="border-t pt-4">
            <label htmlFor="transcript" className="text-sm font-medium mb-2 block">
              Meeting Transcript (optional)
            </label>
            <Textarea id="transcript" value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Paste your call transcript here to generate an AI summary..." rows={5} className="mb-2"/>
            <Button variant="outline" disabled={!transcript.trim() || generatingAiSummary} onClick={handleGenerateAISummary}>
              {generatingAiSummary ? (<>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                  Generating...
                </>) : ("Generate AI Summary")}
            </Button>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Notes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>);
}
