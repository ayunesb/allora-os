import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Users, ExternalLink, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
export function UpcomingZoomMeeting() {
    const [hasUpcomingMeeting, setHasUpcomingMeeting] = useState(false);
    const [meetingData, setMeetingData] = useState(null);
    const { profile } = useAuth();
    useEffect(() => {
        // Check if we should show a demo meeting
        const checkForMeeting = async () => {
            if (!profile?.company_id)
                return;
            try {
                // Check if there are any upcoming meetings in the database
                const { data: meetings, error } = await supabase
                    .from('zoom_meetings')
                    .select('*')
                    .eq('company_id', profile.company_id)
                    .gt('meeting_time', new Date().toISOString())
                    .order('meeting_time', { ascending: true })
                    .limit(1);
                if (error)
                    throw error;
                if (meetings && meetings.length > 0) {
                    setHasUpcomingMeeting(true);
                    setMeetingData(meetings[0]);
                    return;
                }
                // If no meetings, check feature flags to see if we should create a demo one
                const { data: featureFlags } = await supabase
                    .from('feature_flags')
                    .select('*')
                    .eq('feature_name', 'demo_zoom_meeting')
                    .eq('is_enabled', true)
                    .limit(1);
                if (featureFlags && featureFlags.length > 0) {
                    // Create a demo meeting - 2 days from now
                    const meetingTime = new Date();
                    meetingTime.setDate(meetingTime.getDate() + 2);
                    meetingTime.setHours(10, 0, 0, 0);
                    const demoMeeting = {
                        title: "Strategy Review with AI Executive Team",
                        meeting_time: meetingTime.toISOString(),
                        duration: 45,
                        zoom_url: "https://zoom.us/j/123456789",
                        meeting_id: "123 456 789",
                        password: "allora",
                        host: "AI CEO",
                        company_id: profile.company_id,
                        participants: ["You", "AI CEO", "AI CMO", "AI CTO"]
                    };
                    setHasUpcomingMeeting(true);
                    setMeetingData(demoMeeting);
                }
            }
            catch (error) {
                console.error("Error checking for meetings:", error);
            }
        };
        checkForMeeting();
    }, [profile?.company_id]);
    const handleCopyMeetingId = () => {
        if (meetingData?.meeting_id) {
            navigator.clipboard.writeText(meetingData.meeting_id);
            toast.success("Meeting ID copied to clipboard");
        }
    };
    const handleJoinMeeting = () => {
        if (meetingData?.zoom_url) {
            window.open(meetingData.zoom_url, '_blank');
        }
    };
    if (!hasUpcomingMeeting) {
        return null;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    return (<Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Upcoming Strategy Meeting</CardTitle>
        <CardDescription>Your next meeting with the AI executive team</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <CalendarDays className="h-5 w-5 text-primary mt-0.5"/>
          <div>
            <p className="font-medium">{meetingData?.title || "Strategy Review"}</p>
            <p className="text-sm text-muted-foreground">
              {meetingData ? formatDate(meetingData.meeting_time) : "Loading..."}
              {meetingData?.duration ? ` (${meetingData.duration} mins)` : ""}
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Users className="h-5 w-5 text-primary mt-0.5"/>
          <div>
            <p className="font-medium">Participants</p>
            <p className="text-sm text-muted-foreground">
              {meetingData?.participants?.join(", ") || "AI Executive Team"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-2 pt-2 border-t">
          <div className="text-xs bg-primary/10 p-1.5 rounded flex items-center gap-1.5">
            <span className="font-medium">ID:</span> {meetingData?.meeting_id || "123 456 789"}
            <button onClick={handleCopyMeetingId} className="text-primary hover:text-primary/80">
              <Copy className="h-3.5 w-3.5"/>
            </button>
          </div>
          
          <div className="text-xs bg-primary/10 p-1.5 rounded">
            <span className="font-medium">Password:</span> {meetingData?.password || "allora"}
          </div>
          
          <Button className="ml-auto" size="sm" onClick={handleJoinMeeting}>
            <ExternalLink className="h-4 w-4 mr-1.5"/>
            Join Meeting
          </Button>
        </div>
      </CardContent>
    </Card>);
}
