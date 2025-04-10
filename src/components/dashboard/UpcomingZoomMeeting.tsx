
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Calendar, ExternalLink, Clock } from "lucide-react";
import { useZoomIntegration } from '@/hooks/useZoomIntegration';
import { formatDistanceToNow, format, isAfter } from 'date-fns';
import { toast } from 'sonner';

export function UpcomingZoomMeeting() {
  const { getUpcomingMeetings } = useZoomIntegration();
  const [upcomingMeeting, setUpcomingMeeting] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchMeetings() {
      setIsLoading(true);
      try {
        const meetings = await getUpcomingMeetings();
        
        if (meetings && meetings.length > 0) {
          // Sort by start time and get the earliest one
          const sortedMeetings = meetings.sort((a, b) => 
            new Date(a.start_time).getTime() - new Date(b.start_time).getTime()
          );
          
          setUpcomingMeeting(sortedMeetings[0]);
        }
      } catch (error) {
        console.error('Error fetching upcoming Zoom meetings:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchMeetings();
  }, [getUpcomingMeetings]);
  
  const copyMeetingLink = () => {
    if (upcomingMeeting?.join_url) {
      navigator.clipboard.writeText(upcomingMeeting.join_url);
      toast.success('Meeting link copied to clipboard');
    }
  };
  
  if (isLoading) {
    return (
      <Card className="border-primary/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Loading Meeting Details...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-20 flex items-center justify-center">
            <div className="animate-pulse h-4 w-3/4 bg-muted rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!upcomingMeeting) {
    return null; // Don't display anything if there's no meeting
  }
  
  const meetingDate = new Date(upcomingMeeting.start_time);
  const isInFuture = isAfter(meetingDate, new Date());
  
  if (!isInFuture) {
    return null; // Don't display past meetings
  }
  
  return (
    <Card className="border-primary/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          Strategy Review Call
        </CardTitle>
        <CardDescription>
          {upcomingMeeting.topic}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(meetingDate, 'EEEE, MMMM d, yyyy')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>{format(meetingDate, 'h:mm a')} ({formatDistanceToNow(meetingDate, { addSuffix: true })})</span>
        </div>
        {upcomingMeeting.agenda && (
          <div className="text-sm text-muted-foreground mt-2">
            <p className="font-medium">Agenda:</p>
            <p>{upcomingMeeting.agenda}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="default"
          className="w-full sm:w-auto"
          onClick={() => window.open(upcomingMeeting.join_url, '_blank')}
        >
          <Video className="mr-2 h-4 w-4" />
          Join Meeting
        </Button>
        <Button 
          variant="outline"
          className="w-full sm:w-auto"
          onClick={copyMeetingLink}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Copy Link
        </Button>
      </CardFooter>
    </Card>
  );
}
