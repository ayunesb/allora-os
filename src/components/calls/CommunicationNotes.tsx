import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, X, Pencil, Check, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
export default function CommunicationNotes({
  communications,
  isLoading,
  onClose,
  communicationId,
}) {
  const [activeTab, setActiveTab] = useState("summaries");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteContent, setNoteContent] = useState("");
  const [saving, setSaving] = useState(false);
  // If communicationId is provided, filter the communications to show only the selected one
  const filteredCommunications = communicationId
    ? communications.filter((comm) => comm.id === communicationId)
    : communications;
  const handleEditNote = (communication) => {
    setEditingNoteId(communication.id);
    setNoteContent(communication.notes || "");
  };
  const handleSaveNote = async () => {
    if (!editingNoteId) return;
    setSaving(true);
    // Simulate API call to save note
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      // In a real app, this would save to the database
      toast.success("Note saved successfully");
      setEditingNoteId(null);
    } catch (error) {
      toast.error("Failed to save note");
      console.error("Error saving note:", error);
    } finally {
      setSaving(false);
    }
  };
  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setNoteContent("");
  };
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }
  if (communicationId && filteredCommunications.length === 0) {
    return (
      <Dialog open={true} onOpenChange={() => onClose && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Communication Details</DialogTitle>
            <DialogDescription>
              Could not find the communication you're looking for.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  // If we're using this as a modal for a specific communication
  if (communicationId) {
    const communication = filteredCommunications[0];
    return (
      <Dialog open={true} onOpenChange={() => onClose && onClose()}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Communication Notes
            </DialogTitle>
            <DialogDescription>
              {communication.type.charAt(0).toUpperCase() +
                communication.type.slice(1)}{" "}
              on {new Date(communication.created_at).toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="notes">Manual Notes</TabsTrigger>
              <TabsTrigger value="summaries">AI Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="space-y-4">
              {editingNoteId === communication.id ? (
                <div className="space-y-2">
                  <Textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Enter your notes..."
                    className="min-h-[150px]"
                  />
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSaveNote}
                      disabled={saving}
                    >
                      {saving ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  {communication.notes ? (
                    <div className="space-y-2">
                      <div className="border rounded-md p-3 bg-muted/50">
                        <p className="whitespace-pre-wrap">
                          {communication.notes}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditNote(communication)}
                        className="mt-2"
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit Note
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-md border-dashed">
                      <p className="text-muted-foreground mb-4">
                        No notes have been added yet
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => handleEditNote(communication)}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="summaries">
              {communication.ai_summary ? (
                <div className="border rounded-md p-3 bg-muted/50">
                  <p className="whitespace-pre-wrap">
                    {communication.ai_summary}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 border rounded-md border-dashed">
                  <p className="text-muted-foreground mb-4">
                    No AI summary available
                  </p>
                  <Button variant="outline" disabled>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generate Summary
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  // Default display for the main page
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Communication Notes & Summaries
        </CardTitle>
        <CardDescription>
          Manual notes and AI-generated summaries from your calls and meetings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summaries">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="notes">Manual Notes</TabsTrigger>
            <TabsTrigger value="summaries">AI Summaries</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            {filteredCommunications.length === 0 ? (
              <div className="text-center py-8 border rounded-md border-dashed">
                <p className="text-muted-foreground">
                  No communications with notes found
                </p>
              </div>
            ) : (
              filteredCommunications
                .filter((comm) => comm.notes)
                .slice(0, 3)
                .map((comm) => (
                  <div
                    key={comm.id}
                    className="border rounded-md p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium capitalize">
                        {comm.type} with {comm.leads?.name || "Unknown"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comm.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{comm.notes}</p>
                  </div>
                ))
            )}
          </TabsContent>

          <TabsContent value="summaries" className="space-y-4">
            {filteredCommunications.length === 0 ? (
              <div className="text-center py-8 border rounded-md border-dashed">
                <p className="text-muted-foreground">
                  No communications with AI summaries found
                </p>
              </div>
            ) : (
              filteredCommunications
                .filter((comm) => comm.ai_summary)
                .slice(0, 3)
                .map((comm) => (
                  <div
                    key={comm.id}
                    className="border rounded-md p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium capitalize">
                        {comm.type} with {comm.leads?.name || "Unknown"}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comm.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">
                      {comm.ai_summary}
                    </p>
                  </div>
                ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          AI summaries are automatically generated after Zoom calls and WhatsApp
          chats. You can also add your own notes to any communication.
        </p>
      </CardFooter>
    </Card>
  );
}
