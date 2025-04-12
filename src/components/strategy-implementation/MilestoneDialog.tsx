
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { CalendarIcon, AlertCircle } from "lucide-react";
import { createMilestone, updateMilestone, deleteMilestone } from "@/utils/strategyImplementation/implementationUtils";
import { StrategyMilestone, ImplementationStatus } from "@/models/strategyImplementation";

interface MilestoneDialogProps {
  isOpen: boolean;
  onClose: () => void;
  strategyId: string;
  milestone: StrategyMilestone | null;
  onSave: (milestone: StrategyMilestone) => void;
  onDelete: (id: string) => void;
}

const MilestoneDialog: React.FC<MilestoneDialogProps> = ({
  isOpen,
  onClose,
  strategyId,
  milestone,
  onSave,
  onDelete
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<ImplementationStatus>("not_started");
  const [progress, setProgress] = useState(0);
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (milestone) {
      setTitle(milestone.title);
      setDescription(milestone.description || "");
      setStatus(milestone.status);
      setProgress(milestone.progress);
      setDueDate(new Date(milestone.dueDate));
      setOwner(milestone.owner || "");
      setNotes(milestone.notes || "");
    } else {
      // Default values for new milestone
      setTitle("");
      setDescription("");
      setStatus("not_started");
      setProgress(0);
      setDueDate(new Date());
      setOwner("");
      setNotes("");
    }
  }, [milestone]);

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const milestoneData = {
        strategyId,
        title,
        description,
        status,
        progress,
        dueDate: dueDate.toISOString(),
        owner,
        notes,
      };

      let savedMilestone;

      if (milestone) {
        // Update existing milestone
        const success = await updateMilestone(milestone.id, milestoneData);
        if (success) {
          savedMilestone = {
            ...milestone,
            ...milestoneData,
          };
        } else {
          throw new Error("Failed to update milestone");
        }
      } else {
        // Create new milestone
        savedMilestone = await createMilestone(milestoneData);
        if (!savedMilestone) {
          throw new Error("Failed to create milestone");
        }
      }

      onSave(savedMilestone);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteMilestone = async () => {
    if (!milestone) return;
    
    setIsSaving(true);
    const success = await deleteMilestone(milestone.id);
    setIsSaving(false);
    
    if (success) {
      onDelete(milestone.id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{milestone ? "Edit Milestone" : "Add Milestone"}</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 p-3 rounded-md flex items-start gap-2 text-sm text-destructive mb-4">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Milestone title"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this milestone"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as ImplementationStatus)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not_started">Not Started</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="justify-start text-left font-normal"
                    id="dueDate"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(dueDate, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex justify-between">
              <Label htmlFor="progress">Progress ({progress}%)</Label>
            </div>
            <Slider
              id="progress"
              min={0}
              max={100}
              step={5}
              value={[progress]}
              onValueChange={(value) => setProgress(value[0])}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="owner">Owner (Optional)</Label>
            <Input
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Person responsible for this milestone"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes or context"
              rows={2}
            />
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          {milestone && (
            <Button
              variant="destructive"
              onClick={handleDeleteMilestone}
              disabled={isSaving}
            >
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSaving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MilestoneDialog;
