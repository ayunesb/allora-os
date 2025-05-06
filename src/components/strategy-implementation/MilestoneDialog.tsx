import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  createMilestone,
  updateMilestone,
  deleteMilestone,
} from "@/utils/strategyImplementation/implementationUtils";
const MilestoneDialog = ({
  isOpen,
  onClose,
  strategyId,
  milestone,
  onSave,
  onDelete,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not_started");
  const [dueDate, setDueDate] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const [owner, setOwner] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Set form values when milestone changes
  useEffect(() => {
    if (milestone) {
      setTitle(milestone.title);
      setDescription(milestone.description || "");
      setStatus(milestone.status);
      setDueDate(new Date(milestone.dueDate));
      setProgress(milestone.progress);
      setOwner(milestone.owner || "");
      setNotes(milestone.notes || "");
    } else {
      // Default values for new milestone
      setTitle("");
      setDescription("");
      setStatus("not_started");
      setDueDate(new Date());
      setProgress(0);
      setOwner("");
      setNotes("");
    }
  }, [milestone]);
  const handleSave = async () => {
    if (!title.trim()) return;
    setIsSubmitting(true);
    try {
      const milestoneData = {
        strategyId,
        title,
        description,
        status,
        dueDate: dueDate.toISOString(),
        progress,
        owner,
        notes,
      };
      let savedMilestone;
      if (milestone) {
        // Update existing milestone
        await updateMilestone(milestone.id, milestoneData);
        savedMilestone = {
          ...milestone,
          ...milestoneData,
        };
      } else {
        // Create new milestone
        savedMilestone = await createMilestone(milestoneData);
      }
      if (savedMilestone) {
        onSave(savedMilestone);
      }
    } catch (error) {
      console.error("Error saving milestone:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleDelete = async () => {
    if (!milestone) return;
    setIsSubmitting(true);
    try {
      await deleteMilestone(milestone.id);
      onDelete(milestone.id);
      onClose();
    } catch (error) {
      console.error("Error deleting milestone:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {milestone ? "Edit Milestone" : "Add New Milestone"}
          </DialogTitle>
        </DialogHeader>

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
              placeholder="Describe this milestone..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value)}
              >
                <SelectTrigger>
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
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !dueDate && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Select date"}
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
              onValueChange={(values) => setProgress(values[0])}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="owner">Owner</Label>
            <Input
              id="owner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Responsible person"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional notes..."
              rows={2}
            />
          </div>
        </div>

        <DialogFooter className="flex items-center justify-between">
          {milestone && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSubmitting || !title.trim()}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default MilestoneDialog;
