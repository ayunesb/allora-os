import { useState } from "react";
import { Video, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCommunications } from "@/hooks/useCommunications";
import { toast } from "sonner";
import { useLeads } from "@/hooks/admin/useLeads";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function ZoomScheduler() {
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDuration, setMeetingDuration] = useState(30);
  const [meetingAgenda, setMeetingAgenda] = useState("");
  const { leads, isLoading: leadsLoading } = useLeads();
  const { createZoomMeeting, isLoadingMutation } = useCommunications();
  const handleCreateMeeting = async () => {
    if (!selectedLeadId) {
      toast.error("Please select a lead");
      return;
    }
    if (!meetingTitle.trim()) {
      toast.error("Please enter a meeting title");
      return;
    }
    if (!meetingDate || !meetingTime) {
      toast.error("Please enter a meeting date and time");
      return;
    }
    try {
      const startTime = new Date(`${meetingDate}T${meetingTime}`);
      if (isNaN(startTime.getTime())) {
        toast.error("Invalid date or time");
        return;
      }
      const meetingData = {
        topic: meetingTitle,
        startTime: startTime.toISOString(),
        duration: meetingDuration,
        agenda: meetingAgenda || undefined,
      };
      await createZoomMeeting(selectedLeadId, meetingData);
      // Reset form after successful creation
      setMeetingTitle("");
      setMeetingDate("");
      setMeetingTime("");
      setMeetingAgenda("");
    } catch (error) {
      console.error("Error creating Zoom meeting:", error);
    }
  };
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="lead-select">Select Lead</Label>
        <Select
          value={selectedLeadId}
          onValueChange={setSelectedLeadId}
          disabled={leadsLoading}
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

      <div className="space-y-2">
        <Label htmlFor="meeting-title">Meeting Title</Label>
        <Input
          id="meeting-title"
          placeholder="Enter meeting title"
          value={meetingTitle}
          onChange={(e) => setMeetingTitle(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="meeting-date">Date</Label>
          <Input
            id="meeting-date"
            type="date"
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="meeting-time">Time</Label>
          <Input
            id="meeting-time"
            type="time"
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meeting-duration">Duration (minutes)</Label>
        <Select
          value={meetingDuration.toString()}
          onValueChange={(value) => setMeetingDuration(parseInt(value))}
        >
          <SelectTrigger id="meeting-duration">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">1 hour</SelectItem>
            <SelectItem value="90">1.5 hours</SelectItem>
            <SelectItem value="120">2 hours</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="meeting-agenda">Agenda (optional)</Label>
        <Textarea
          id="meeting-agenda"
          placeholder="Enter meeting agenda"
          value={meetingAgenda}
          onChange={(e) => setMeetingAgenda(e.target.value)}
          rows={3}
        />
      </div>

      <Button
        onClick={handleCreateMeeting}
        disabled={
          isLoadingMutation ||
          !selectedLeadId ||
          !meetingTitle ||
          !meetingDate ||
          !meetingTime
        }
        className="w-full"
      >
        {isLoadingMutation ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Meeting...
          </>
        ) : (
          <>
            <Video className="mr-2 h-4 w-4" />
            Schedule Zoom Meeting
          </>
        )}
      </Button>

      <div className="text-xs text-muted-foreground mt-2">
        <p>A calendar invite will be sent to the lead automatically.</p>
        <p>
          You will receive the meeting link by email and it will appear in your
          timeline.
        </p>
      </div>
    </div>
  );
}
